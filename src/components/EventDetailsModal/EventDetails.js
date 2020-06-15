import React, { Component } from 'react';
import {
    Linking,
    View,
    ImageBackground,
    Text,
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

function BackgroundImageContainer({ isSponsored, children }) {
    if (isSponsored) {
        return (
            <LinearGradient
                useAngle={true}
                angle={150}
                angleCenter={{ x: .5, y: .5}}
                style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                colors={['#AA16EE', '#07EAfA']}>
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
            streamerGameData
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
                <BackgroundImageContainer isSponsored={true}>
                    <ImageBackground
                        source={{ uri: backgroundImage }}
                        style={styles.backgroundImageContainer}
                        imageStyle={styles.backgroundImage}>
                        <Text style={styles.eventTitle}>
                            {title && title[userLanguage] ? title[userLanguage] : titulo}
                        </Text>
                        <View>
                            <Image
                                style={styles.eventSponsorImage}
                                source={{ uri: sponsorImage }} />
                        </View>
                    </ImageBackground>
                </BackgroundImageContainer>

                {this.state.existsRequest &&
                    <Text style={styles.waitingAnswerFeedback}>
                        {translate('eventDetailsModal.waitingApproval')}
                    </Text>
                }

                {this.state.isParticipant && streamerGameData &&
                    <View style={[styles.eventCard, styles.streamerGameDataCard]}>
                        <Text style={styles.eventCardTitle}>
                            {translate('eventDetailsModal.sendFriendRequestTo')}
                        </Text>
                        <View style={styles.divider} />
                        {Object.keys(streamerGameData).map((streamerInfoKey) => (
                            <View style={styles.streamerGameInfoContainer}>
                                <Text style={styles.streamerGameInfoKey}>
                                    {streamerInfoKey}
                                </Text>
                                <View style={styles.streamerGameInfoValueContainer}>
                                    <Text style={styles.streamerGameInfoValue}>
                                        {streamerGameData[streamerInfoKey]}
                                    </Text>
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
                    <Text style={styles.eventCardTitle}>
                        {translate('eventDetailsModal.hostedBy')}
                    </Text>
                    <View style={styles.divider} />
                    <View style={styles.streamerInfoContainer}>
                        <View style={styles.streamerDataContainer}>
                            <Image
                                source={{ uri: streamerPhoto }}
                                style={styles.streamerPhoto} />
                            <View style={styles.streamerDetails}>
                                <Text style={styles.streamerName}>
                                    {streamerName}
                                </Text>
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
                                <Text style={styles.followButtonText}>
                                    {translate('eventDetailsModal.follow')}
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>

                <View style={[styles.eventCard, styles.dateCard]}>
                    <Text style={styles.eventCardTitle}>
                        {translate('eventDetailsModal.dateAndTime')}
                    </Text>
                    <View style={styles.divider} />
                    <View style={styles.dateInfoContainer}>
                        <Text style={styles.dateText}>
                            {`${eventHour} ${hourSuffix}`}
                        </Text>
                        <View style={styles.dayContainer}>
                            <Text style={styles.dateText}>
                                {day}
                            </Text>
                            <Text style={styles.dayText}>
                                {eventDay}
                            </Text>
                        </View>
                    </View>
                </View>

                {(this.state.existsRequest || this.state.isParticipant) &&
                    <View style={[styles.eventCard, styles.eventChatCard]}>
                        <Text style={styles.eventCardTitle}>
                            {translate('eventDetailsModal.eventChat')}
                        </Text>
                        <View style={styles.divider} />
                        <View style={styles.chatInfoContainer}>
                            <Text style={styles.joinDiscordText}>
                                {translate('eventDetailsModal.joinDiscordChannel')}
                            </Text>
                            <View>
                                <TouchableOpacity
                                    style={styles.chatButtonContainer}
                                    onPress={this.goToDiscordLink}>
                                    <Text style={styles.chatButtonText}>
                                        {translate('eventDetailsModal.chat')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }

                <View style={[styles.eventCard, styles.descriptionCard]}>
                    <Text style={styles.eventCardTitle}>
                        {translate('eventDetailsModal.description')}
                    </Text>
                    <View style={styles.divider} />
                    <View style={styles.descriptionContainer}>
                        {descriptionsTitle && descriptionsTitle[userLanguage] &&
                            <Text style={styles.descriptionTitle}>
                                {descriptionsTitle[userLanguage]}
                            </Text>
                        }
                        <Text style={[styles.descriptionBody, { marginTop: descriptionsTitle && descriptionsTitle[userLanguage] ? 8 : 14 }]}>
                            {descriptions && descriptions[userLanguage] ?
                                descriptions[userLanguage]
                                :
                                description
                            }
                        </Text>
                        {appStringPrizes && appStringPrizes[userLanguage] &&
                            <>
                                <Text style={styles.descriptionTitle}>
                                    {translate('eventDetailsModal.prizes')}
                                </Text>
                                <View style={styles.descriptionBody}>
                                    {appStringPrizes[userLanguage].map((prize) => (
                                        <Text style={styles.descriptionPrize}>
                                            {`${prize.title} - ${prize.prize}`}
                                        </Text>
                                    ))}
                                </View>
                            </>
                        }
                    </View>
                </View>

                {instructionsToParticipate && instructionsToParticipate[userLanguage] &&
                    <View style={[styles.eventCard, styles.instructionsCard]}>
                        <Text style={styles.eventCardTitle}>
                            {translate('eventDetailsModal.instructions')}
                        </Text>
                        <View style={styles.divider} />
                        <Text style={styles.instructionTitle}>
                            {translate('eventDetailsModal.howToParticipate')}
                        </Text>
                        <View>
                            {instructionsToParticipate[userLanguage].map((instruction, index) => (
                                <Text style={styles.instructionBody}>
                                    {`${index + 1}. ${instruction}`}
                                </Text>
                            ))}
                        </View>
                    </View>
                }

                {(!this.state.existsRequest && !this.state.isParticipant) ?
                    <TouchableOpacity
                        style={styles.participateButtonContainer}
                        onPress={this.props.goToNextStep}>
                        <Text style={styles.participateButtonText}>
                            {translate('eventDetailsModal.participate')}
                        </Text>
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