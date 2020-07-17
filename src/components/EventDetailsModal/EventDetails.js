import React, { Component } from 'react';
import {
    Linking,
    View,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import { translate, getLocaleLanguage } from '../../utilities/i18';
import { getDateElementsAsNumber, getHourElementsAsNumber, copyDataToClipboard } from '../../utilities/utils';
import { userHasRequestToJoinEvent, isUserParticipantOnEvent } from '../../services/database';
import Images from '../../../assets/images';
import QaplaText from '../QaplaText/QaplaText';

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
                angleCenter={{ x: .5, y: .5}}
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
        isParticipant: false,
        existsRequest: false
    };

    componentDidMount() {
        this.checkIfUserIsParticipant();
        this.checkUserRequest();
    }

    /**
     * Check if the user has sent a request for this event
     */
    checkUserRequest = async () => {
        this.setState({ existsRequest: await userHasRequestToJoinEvent(this.props.uid, this.props.eventId) });
    }

    /**
     * Check if the user is a participant of this event
     */
    checkIfUserIsParticipant = async () => {
        this.setState({ isParticipant: await isUserParticipantOnEvent(this.props.uid, this.props.eventId) });
    }

    /**
     * Redirect the user to the streamers channel of the given social network
     * streamerChannelLink field on event node must be a valid URL
     */
    goToStreamerChannel = () => {
        const { streamerChannelLink } = this.props.event;

        if (streamerChannelLink) {
            Linking.openURL(streamerChannelLink);
        }
    }

    /**
     * Send the user to the discord channel of the event
     */
    goToDiscordLink = () => {
        const { discordLink } = this.props.event;

        if (discordLink) {
            Linking.openURL(discordLink);
        }
    }

    render() {
        const {
            title,
            titulo,
            description,
            descriptions,
            descriptionsTitle,
            backgroundImage,
            appStringPrizes,
            instructionsToParticipate,
            streamingPlatformImage,
            streamerName,
            streamerChannelLink,
            sponsorImage,
            streamerPhoto,
            hourUTC,
            dateUTC,
            streamerGameData,
            gradientColors
        } = this.props.event;

        let [day, month, year] = getDateElementsAsNumber(dateUTC);

        let [hour, minute] = getHourElementsAsNumber(hourUTC);

        const eventDate = new Date(Date.UTC(year, month - 1, day, hour, minute));

        const days = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ];
        const eventDay = translate(`days.${days[eventDate.getDay()]}`);

        day = eventDate.getDate();
        const hourSuffix = eventDate.getHours() > 12 ? 'p.m.' : 'a.m.';
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
                        <QaplaText style={styles.eventTitle}>
                            {title && title[userLanguage] ? title[userLanguage] : titulo}
                        </QaplaText>
                        <View>
                            <Image
                                style={styles.eventSponsorImage}
                                source={{ uri: sponsorImage }} />
                        </View>
                    </ImageBackground>
                </BackgroundImageContainer>

                {this.state.existsRequest &&
                    <QaplaText style={styles.waitingAnswerFeedback}>
                        {translate('eventDetailsModal.waitingApproval')}
                    </QaplaText>
                }

                {this.state.isParticipant && streamerGameData &&
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

                <View style={[styles.eventCard, styles.streamerCard]}>
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
                </View>

                <View style={[styles.eventCard, styles.dateCard]}>
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
                </View>

                {(this.state.existsRequest || this.state.isParticipant) &&
                    <View style={[styles.eventCard, styles.eventChatCard]}>
                        <QaplaText style={styles.eventCardTitle}>
                            {translate('eventDetailsModal.eventChat')}
                        </QaplaText>
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
                }

                <View style={[styles.eventCard, styles.descriptionCard]}>
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
                                    {appStringPrizes[userLanguage].map((prize) => (
                                        <QaplaText style={styles.descriptionPrize}>
                                            {`${prize.title} - ${prize.prize}`}
                                        </QaplaText>
                                    ))}
                                </View>
                            </>
                        }
                    </View>
                </View>

                {instructionsToParticipate && instructionsToParticipate[userLanguage] &&
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
                                <QaplaText style={styles.instructionBody}>
                                    {`${index + 1}. ${instruction}`}
                                </QaplaText>
                            ))}
                        </View>
                    </View>
                }

                {(!this.state.existsRequest && !this.state.isParticipant) ?
                    <TouchableOpacity
                        style={styles.participateButtonContainer}
                        onPress={this.props.goToNextStep}>
                        <QaplaText style={styles.participateButtonText}>
                            {translate('eventDetailsModal.participate')}
                        </QaplaText>
                    </TouchableOpacity>
                    :
                    <View style={{ marginBottom: 30 }} />
                }
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    }
}

export default connect(mapStateToProps)(EventDetails);