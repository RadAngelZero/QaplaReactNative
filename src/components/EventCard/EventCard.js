// diego           - 11-12-2019 - us165 - Validate if the user is logged before execute joinEvent
// diego           - 14-11-2019 - us146 - File creation

import React, { Component } from 'react';
import { View, ImageBackground, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';

import { getLocaleLanguage } from '../../utilities/i18';

import EventDetailsModal from '../EventDetailsModal/EventDetailsModal';

function EventCardContainer({ isSponsored, children, onPress }) {
    if (isSponsored) {
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <LinearGradient
                    useAngle={true}
                    angle={150}
                    angleCenter={{ x: .5, y: .5}}
                    colors={['#AA16EE', '#07EAfA']}
                    style={styles.container}>
                    {children}
                </LinearGradient>
            </TouchableWithoutFeedback>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    );
}

class EventCard extends Component {
    state = {
        showEventDetailsModal: false
    };

    /**
     * Select the correct event text content according to the language used by the user
     * in the app.
     *
     * @param {object} textLangObj Object containing in JSON format a text content for each
     *                             language supported by the app
     */
    getTextBasedOnUserLanguage = (textLangObj) => {
        let res = '';
        const userLanguage = getLocaleLanguage();

        if (textLangObj && textLangObj[userLanguage]) {
            res = textLangObj[userLanguage];
        }

        return res;
    }

    toogleEventDetailsModalVisibility = () => this.setState({ showEventDetailsModal: !this.state.showEventDetailsModal });

    render() {
        const {
            title,
            titulo,
            descriptions,
            description,
            backgroundImage,
            streamingPlatformImage,
            streamerName,
            sponsorImage,
            idLogro
        } = this.props;

        let descriptionTranslated = this.getTextBasedOnUserLanguage(descriptions);
        let titleTranslated = this.getTextBasedOnUserLanguage(title);

        // (01-04-2020) Events on 2019 and early 2020 used 'titulos' and 'descripcion' props,
        // as a result of a change on the events structure data in db descriptions and title
        // were added for internationalization. These two if conditions for 'descriptionTranslated'
        // and 'titleTranslated' are to check that the props exists in the db event element,
        // otherwise a fallback is used (not ideal situation, but to prevent app crashes to the
        // user)
        if (descriptionTranslated === '') {
            descriptionTranslated = description;
        }

        if (titleTranslated === '') {
            titleTranslated = titulo;
        }

        return (
            <EventCardContainer
                isSponsored={sponsorImage ? true : false}
                onPress={this.toogleEventDetailsModalVisibility}>
                <ImageBackground
                    style={styles.backgroundImageContainer}
                    imageStyle={styles.backgroundImage}
                    source={{ uri: backgroundImage }}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {titleTranslated}
                        </Text>
                    </View>
                    <View style={styles.body}>
                        <Image
                            style={styles.eventSponsorImage}
                            source={{ uri: sponsorImage }} />
                        <View style={styles.streamerDetails}>
                            <Text style={styles.streamPlatformText}>
                                {streamerName}
                            </Text>
                            <Image
                                style={styles.platformImage}
                                source={{ uri: streamingPlatformImage }} />
                        </View>
                    </View>
                </ImageBackground>
                <EventDetailsModal
                    open={this.state.showEventDetailsModal}
                    onClose={this.toogleEventDetailsModalVisibility}
                    eventId={idLogro} />
            </EventCardContainer>
        );
    }
}

function mapDispatchToProps(state) {
    return {
        uid: state.userReducer.user.id,
        userName: state.userReducer.user.userName,
        gamerTags: state.userReducer.user.gamerTags,
        discordTag: state.userReducer.user.discordTag,
        games: state.gamesReducer.games
    }
}

export default connect(mapDispatchToProps)(withNavigation(EventCard));