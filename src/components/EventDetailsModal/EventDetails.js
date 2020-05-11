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

import styles from './style';
import { translate, getLocaleLanguage } from '../../utilities/i18';
import { getDateElementsAsNumber, getHourElementsAsNumber } from '../../utilities/utils';
import { userHasRequestToJoinEvent } from '../../services/database';

class EventDetails extends Component {
    state = {
        existsRequest: false
    };

    componentDidMount() {
        this.checkUserRequest();
    }

    checkUserRequest = async () => {
        console.log(await userHasRequestToJoinEvent());
        if (await userHasRequestToJoinEvent(this.props.uid, this.props.eventId)) {
            this.setState({ existsRequest: true });
        }
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
            streamingPlatform,
            streamerName,
            streamerChannelLink,
            sponsorImage,
            streamerPhoto,
            hourUTC,
            dateUTC
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
                <View>
                    <ImageBackground
                        source={{ uri: backgroundImage }}
                        style={styles.backgroundImageContainer}
                        imageStyle={styles.backgroundImage}>
                        <Text style={styles.eventTitle}>
                            {title && title[userLanguage] ? title[userLanguage] : titulo}
                        </Text>
                        <View style={styles.eventSponsorContainer}>
                            <Image
                                style={styles.eventSponsorImage}
                                source={{ uri: sponsorImage }} />
                        </View>
                    </ImageBackground>
                </View>

                {this.state.existsRequest &&
                    <Text style={styles.waitingAnswerFeedback}>
                        {translate('eventDetailsModal.waitingApproval')}
                    </Text>
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
                                    <Text style={styles.streamerChannelName}>
                                        {streamingPlatform}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {streamerChannelLink &&
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

                <View style={[styles.eventCard, styles.descriptionCard]}>
                    <Text style={styles.eventCardTitle}>
                        {translate('eventDetailsModal.description')}
                    </Text>
                    <View style={styles.divider} />
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionTitle}>
                            {descriptionsTitle && descriptionsTitle[userLanguage]}
                        </Text>
                        <Text style={styles.descriptionBody}>
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

                {!this.state.existsRequest ?
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