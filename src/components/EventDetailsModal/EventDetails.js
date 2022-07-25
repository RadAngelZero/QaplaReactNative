import React, { Component } from 'react';
import {
    Linking,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import { translate, getLocaleLanguage } from '../../utilities/i18';
import { copyDataToClipboard } from '../../utilities/utils';
import Images from '../../../assets/images';
import QaplaText from '../QaplaText/QaplaText';
import { trackOnSegment } from '../../services/statistics';

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
        isFollower: false,
        twitchURLCopied: false,
        xq: 150,
        qoins: 20,
    }

    componentDidMount() {
        console.log(this.props.userSubscriptions[this.props.event.idStreamer]);
    }

    goToStreamerChannel = () => {
        const { streamerChannelLink } = this.props.event;

        if (streamerChannelLink) {
            Linking.openURL(streamerChannelLink);
            trackOnSegment('User follow streamer', { EventStreamer: this.props.event.streamerName });
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
            timestamp
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

        const userLanguage = getLocaleLanguage();

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
                        {this.state.isFollower ?
                            <TouchableOpacity style={styles.eventStreamerFollowingButton} onPress={this.goToStreamerChannel}>
                                <Text style={[styles.eventStreamerFollowingButtonText, styles.eventStreamerKnowButtonText]}>
                                    {`${translate('eventDetailsModal.details.following')}`}
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.eventStreamerKnowButton} onPress={this.goToStreamerChannel}>
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
                                <Images.svg.xq />
                                <Text style={[styles.whiteText, styles.eventFarmText]}>
                                    {this.state.xq}
                                </Text>
                            </View>
                            <View style={[styles.eventFarmContainer, styles.eventFarmContainerSeparator]}>
                                <Images.svg.qoin />
                                <Text style={[styles.whiteText, styles.eventFarmText]}>
                                    {this.state.qoins}
                                </Text>
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


                {/* <View style={[styles.eventCard, styles.streamerCard]}>
                    <QaplaText style={styles.eventCardTitle}>
                        {translate('eventDetailsModal.hostedBy')}
                    </QaplaText>
                    <View style={styles.divider} />
                    <View style={styles.streamerInfoContainer}>
                        <View style={styles.streamerDataContainer}>
                            <Image
                                source={{ uri: streamerPhoto }}
                                style={styles.streamerPhoto} />
                            <View style={styles.streamerDetails}>
                                <QaplaText style={styles.streamerName}>
                                    {streamerName}
                                </QaplaText>
                                <View style={styles.streamerChannelContainer}>
                                    <Image
                                        source={{ uri: streamingPlatformImage }}
                                        style={styles.streamingPlatformImage} />
                                </View>
                            </View>
                        </View>
                        {streamerChannelLink !== '' && streamerChannelLink &&
                            <TouchableOpacity
                                style={styles.followButtonContainer}
                                onPress={this.goToStreamerChannel}>
                                <QaplaText style={styles.followButtonText}>
                                    {translate('eventDetailsModal.follow')}
                                </QaplaText>
                            </TouchableOpacity>
                        }
                    </View>
                </View> */}

                {/* <View style={[styles.eventCard, styles.dateCard]}>
                    <QaplaText style={styles.eventCardTitle}>
                        {translate('eventDetailsModal.dateAndTime')}
                    </QaplaText>
                    <View style={styles.divider} />
                    <View style={styles.dateInfoContainer}>
                        <QaplaText style={styles.dateText}>
                            {`${eventHour} ${hourSuffix}`}
                        </QaplaText>
                        <View style={styles.dayContainer}>
                            <QaplaText style={styles.dateText}>
                                {day}
                            </QaplaText>
                            <QaplaText style={styles.dayText}>
                                {eventDay}
                            </QaplaText>
                        </View>
                    </View>
                </View> */}

                {/* {
                    (this.props.existsRequest || this.props.isParticipant) &&
                    <View style={[styles.eventCard, styles.eventChatCard]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <QaplaText style={styles.eventCardTitle}>
                                {translate('eventDetailsModal.eventChat')}
                            </QaplaText>
                            {eventChatUrl &&
                                <Images.svg.betaLabelIcon
                                    height={24}
                                    style={{ marginRight: 24 }} />
                            }
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.chatInfoContainer}>
                            <QaplaText style={styles.joinDiscordText}>
                                {translate('eventDetailsModal.joinDiscordChannel')}
                            </QaplaText>
                            <View>
                                <TouchableOpacity
                                    style={styles.chatButtonContainer}
                                    onPress={this.goToDiscordLink}>
                                    <QaplaText style={styles.chatButtonText}>
                                        {translate('eventDetailsModal.chat')}
                                    </QaplaText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                } */}

                {/* <View style={[styles.eventCard, styles.descriptionCard]}>
                    <QaplaText style={styles.eventCardTitle}>
                        {translate('eventDetailsModal.description')}
                    </QaplaText>
                    <View style={styles.divider} />
                    <View style={styles.descriptionContainer}>
                        {descriptionsTitle && descriptionsTitle[userLanguage] &&
                            <QaplaText style={styles.descriptionTitle}>
                                {descriptionsTitle[userLanguage]}
                            </QaplaText>
                        }
                        <QaplaText style={[styles.descriptionBody, { marginTop: descriptionsTitle && descriptionsTitle[userLanguage] ? 8 : 14 }]}>
                            {descriptions && descriptions[userLanguage] ?
                                descriptions[userLanguage]
                                :
                                description
                            }
                        </QaplaText>
                        {appStringPrizes && appStringPrizes[userLanguage] &&
                            <>
                                <QaplaText style={styles.descriptionTitle}>
                                    {translate('eventDetailsModal.prizes')}
                                </QaplaText>
                                <View style={styles.descriptionBody}>
                                    {appStringPrizes[userLanguage].map((prize, index) => (
                                        <QaplaText key={`Prize-${index}`} style={styles.descriptionPrize}>
                                            {`${prize.title} - ${prize.prize}`}
                                        </QaplaText>
                                    ))}
                                </View>
                            </>
                        }
                    </View>
                </View> */}

                {/* {instructionsToParticipate && instructionsToParticipate[userLanguage] &&
                    <View style={[styles.eventCard, styles.instructionsCard]}>
                        <QaplaText style={styles.eventCardTitle}>
                            {translate('eventDetailsModal.instructions')}
                        </QaplaText>
                        <View style={styles.divider} />
                        <QaplaText style={styles.instructionTitle}>
                            {translate('eventDetailsModal.howToParticipate')}
                        </QaplaText>
                        <View>
                            {instructionsToParticipate[userLanguage].map((instruction, index) => (
                                <QaplaText key={`Instruction-${index}`} style={styles.instructionBody}>
                                    {`${index + 1}. ${instruction}`}
                                </QaplaText>
                            ))}
                        </View>
                    </View>
                } */}
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