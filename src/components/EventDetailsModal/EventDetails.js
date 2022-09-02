import React, { Component } from 'react';
import {
    Linking,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

import styles from './style';
import { translate } from '../../utilities/i18';
import { copyDataToClipboard } from '../../utilities/utils';
import Images from '../../../assets/images';
import QaplaText from '../QaplaText/QaplaText';
import { trackOnSegment } from '../../services/statistics';
import { getStreamerPublicProfile } from '../../services/database';

function BackgroundImageContainer({ isSponsored, children, gradientColors }) {
    const validColorRegExp = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');
    if (isSponsored) {
        let validColors = false;
        if (gradientColors) {
            if (gradientColors.primary.charAt(0) !== '#') {
                gradientColors.primary = `#${gradientColors.primary}`
            }
            if (gradientColors.secondary.charAt(0) !== '#') {
                gradientColors.secondary = `#${gradientColors.secondary}`
            }
            validColors = validColorRegExp.test(gradientColors.primary) && validColorRegExp.test(gradientColors.secondary);
        }

        return (
            <LinearGradient
                useAngle={true}
                angle={150}
                angleCenter={{ x: .5, y: .5 }}
                style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                colors={validColors ? [gradientColors.primary, gradientColors.secondary] : ['#AA16EE', '#07EAfA']}>
                {children}
            </LinearGradient>
        );
    }

    return (
        <View>
            {children}
        </View>
    );
}

class EventDetails extends Component {
    state = {
        twitchURLCopied: false
    }

    goToStreamerProfile = async () => {
        const profile = await getStreamerPublicProfile(this.props.event.idStreamer);
        if (profile.exists()) {
            this.props.navigation.navigate('StreamerProfile', { streamerData: { ...profile.val(), streamerId: this.props.event.idStreamer } });
            trackOnSegment('User open streamr profile from card', {
                StreamerId: this.props.event.idStreamer
            });

            this.props.closeModal();
        } else {
            const streamerName = this.props.event.streamerName;
            Alert.alert(
                translate('TimelineStreams.streamerHasNoProfileTitle'),
                translate('TimelineStreams.streamerHasNoProfileDescription', { streamerName }),
                [
                    {
                        text: translate('TimelineStreams.cancel'),
                        onPress: () => trackOnSegment('User did not want to go to streamer´s Twitch', {
                            StreamerId: this.props.event.idStreamer,
                            StreamerName: streamerName
                        })
                    },
                    {
                        text: translate('TimelineStreams.goToTwitch'),
                        onPress: () => {
                            trackOnSegment('User goes to streamer´s Twitch', {
                                StreamerId: this.props.event.idStreamer,
                                StreamerName: streamerName
                            });
                            Linking.openURL(this.props.event.streamerChannelLink);
                        }
                    }
                ]
            );
        }
    }

    copyStreamerTwitchURL = () => {
        const { streamLink } = this.props.event;
        copyDataToClipboard(streamLink);
        this.setState({ twitchURLCopied: true });
        setTimeout(() => {
            this.setState({ twitchURLCopied: false });
        }, 3000);
    }

    /**
     * Send the user to the discord channel of the event
     */
    goToDiscordLink = async () => {
        const link = (await remoteConf.getDataFromKey('Discord')).QAPLA_DISCORD_CHANNEL;
        Linking.openURL(link);
    }

    render() {
        const {
            backgroundImage,
            streamerName,
            sponsorImage,
            streamerPhoto,
            streamerGameData,
            gradientColors,
            timestamp,
            customRewardsMultipliers
        } = this.props.event;

        let day = '';

        let hour, minute;

        const eventDate = new Date(timestamp);

        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const eventDay = translate(`days.${days[eventDate.getDay()]}`);

        day = eventDate.getDate();
        const hourSuffix = eventDate.getHours() >= 12 ? 'p.m.' : 'a.m.';
        hour = eventDate.getHours() % 12;
        hour = hour ? hour : 12;
        minute = eventDate.getMinutes() > 9 ? eventDate.getMinutes() : `0${eventDate.getMinutes()}`;
        const eventHour = `${hour}:${minute}`;

        return (
            <>
                <BackgroundImageContainer
                    isSponsored={true}
                    gradientColors={gradientColors}>
                    <ImageBackground
                        source={{ uri: backgroundImage }}
                        style={styles.backgroundImageContainer}
                        imageStyle={styles.backgroundImage}>
                        <View style={styles.eventDateContainer}>
                            <View style={styles.eventSubDateContainer}>
                                <Images.svg.calendarWhite />
                                <Text style={[styles.whiteText, styles.eventDateText]}>
                                    {eventDay.slice(0, 3)} {day}
                                </Text>
                            </View>
                            <View style={[styles.eventSubDateContainer, styles.eventSubDateContainerSeparator]}>
                                <Images.svg.clockWhite />
                                <Text style={[styles.whiteText, styles.eventDateText]}>
                                    {`${eventHour} ${hourSuffix}`}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Image
                                style={styles.eventSponsorImage}
                                source={sponsorImage ? { uri: sponsorImage } : null} />
                        </View>
                    </ImageBackground>
                </BackgroundImageContainer>

                <View style={styles.eventDataContainer}>
                    {
                        this.props.existsRequest &&
                        <QaplaText style={styles.waitingAnswerFeedback}>
                            {translate('eventDetailsModal.waitingApproval')}
                        </QaplaText>
                    }

                    {
                        this.props.isParticipant && streamerGameData &&
                        <View style={[styles.eventCard, styles.streamerGameDataCard]}>
                            <QaplaText style={styles.eventCardTitle}>
                                {translate('eventDetailsModal.eventInformation')}
                            </QaplaText>
                            <View style={styles.divider} />
                            {Object.keys(streamerGameData).map((streamerInfoKey) => (
                                <View style={styles.streamerGameInfoContainer}>
                                    <QaplaText style={styles.streamerGameInfoKey}>
                                        {streamerInfoKey}
                                    </QaplaText>
                                    <View style={styles.streamerGameInfoValueContainer}>
                                        <QaplaText style={styles.streamerGameInfoValue}>
                                            {streamerGameData[streamerInfoKey]}
                                        </QaplaText>
                                        <TouchableOpacity
                                            style={styles.copyIconContainer}
                                            onPress={() => copyDataToClipboard(streamerGameData[streamerInfoKey])}>
                                            <Images.svg.copyIcon />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>
                    }

                    <View style={styles.eventStreamerContainer}>
                        <View style={styles.eventStreamerDataContainer}>
                            <Image
                                source={{ uri: streamerPhoto }}
                                style={styles.streamerPhoto} />
                            <Text style={[styles.whiteText, styles.eventStreamerName]}>
                                {streamerName}
                            </Text>
                        </View>
                        {this.props.userSubscriptions[this.props.event.idStreamer] ?
                            <TouchableOpacity style={styles.eventStreamerFollowingButton} onPress={this.goToStreamerProfile}>
                                <Text style={[styles.eventStreamerFollowingButtonText, styles.eventStreamerKnowButtonText]}>
                                    {`${translate('eventDetailsModal.details.following')}`}
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.eventStreamerKnowButton} onPress={this.goToStreamerProfile}>
                                <Text style={[styles.whiteText, styles.eventStreamerKnowButtonText]}>
                                    {`${translate('eventDetailsModal.details.know')}`}
                                </Text>
                            </TouchableOpacity>
                        }

                    </View>
                    <View style={styles.eventFarmDataContainer}>
                        <Text style={[styles.whiteText, styles.eventFarmTitle]}>
                            {`${translate('eventDetailsModal.details.farm')}:`}
                        </Text>
                        <View style={styles.eventFarmMainDataContainer}>
                            <View style={styles.eventFarmContainer}>
                                <Images.svg.qoin />
                                {this.props.qoinsToGive ?
                                    <MaskedView maskElement={<Text style={[styles.whiteText, styles.eventFarmText]}>{this.props.qoinsToGive}</Text>} style={{ alignContent: 'center' }}>
                                        <LinearGradient
                                            colors={['#FFD3FB', '#F5FFCB', '#9FFFDD']}
                                            useAngle
                                            angle={248.41}>
                                            <Text style={[styles.whiteText, styles.eventFarmText, { opacity: 0 }]}>
                                                {this.props.qoinsToGive}
                                            </Text>
                                        </LinearGradient>
                                    </MaskedView>
                                    :
                                    null
                                }
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.shareContainer, styles.detailsShareContainerMarginTop]}
                        onPress={this.copyStreamerTwitchURL}
                        disabled={this.state.twitchURLCopied}
                    >
                        {this.state.twitchURLCopied ?
                            <Images.svg.tickOkTransparent />
                            :
                            <Images.svg.shareArrowTransparent />
                        }
                        <Text style={[styles.detailsShareText, this.state.twitchURLCopied ? { color: '#fff' } : {}]}>
                            {this.state.twitchURLCopied ?
                                <>
                                    {`${translate('eventDetailsModal.linkCopied')}`}
                                </>
                                :
                                <>
                                    {`${translate('eventDetailsModal.shareWithYourFriends')}`}
                                </>
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        userSubscriptions: state.userReducer.user.userToStreamersSubscriptions || {}
    }
}

export default withNavigation(connect(mapStateToProps)(EventDetails));