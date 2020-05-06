// diego           - 11-12-2019 - us165 - Validate if the user is logged before execute joinEvent
// diego           - 14-11-2019 - us146 - File creation

import React, { Component } from 'react';
import { View, ImageBackground, Text, TouchableWithoutFeedback, Linking, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import styles from './style';
import { joinEvent } from '../../services/database';
import { isUserLogged } from '../../services/auth';
import remoteConf from '../../services/remoteConfig';
import { subscribeUserToTopic } from '../../services/messaging';

import { translate, getLocaleLanguage } from '../../utilities/i18';
import { EVENTS_TOPIC } from '../../utilities/Constants';
import { getGamerTagKeyWithGameAndPlatform, isValidGame } from '../../utilities/utils';

import AddGamerTagModal from '../AddGamerTagModal/AddGamerTagModal';
import EventRequirementsModal from '../EventRequirementsModal/EventRequirementsModal';
import AddDiscordTagModal from '../AddDiscordTagModal/AddDiscordTagModal';


class EventCard extends Component {
    state = {
        showGamerTagModal: false,
        userHasGameAdded: false,
        showRequirementsModal: false,
        showDiscordTagModal: false,
        previousGamerTag: ''
    };

    /**
     * Check if the user has the necessary data to join to the event
     */
    requestUserTags = () => {
        if (isUserLogged()) {
            const gamerTagKey = getGamerTagKeyWithGameAndPlatform(this.props.platform, this.props.game);
            const userHasGameAdded = this.props.gamerTags && this.props.gamerTags.hasOwnProperty(gamerTagKey);

            this.setState({
                userHasGameAdded,
                previousGamerTag: userHasGameAdded ? this.props.gamerTags[gamerTagKey] : '',
            }, () => {
                if (isValidGame(this.props.platform, this.props.game)) {
                    this.setState({ showGamerTagModal: true });
                } else {
                    if (!this.props.discordTag) {
                        this.setState({ showDiscordTagModal: true });
                    } else {
                        this.subscribeUserToEvent(this.props.discordTag);
                    }
                }
            });
        } else {
            this.props.navigation.navigate('SignIn');
        }
    }

    /**
     * If the user cancels the process of adding gamer/discord tag we show a modal
     * saying that he/she can not join to the event without that data
     */
    onRequestTagsFail = () => this.setState({ showRequirementsModal: true });

    /**
     * Add the user to the list of participants of the selected event and
     * subscribe him/her to the FCM topic of the event
     */
    subscribeUserToEvent = (gamerTag) => {
        joinEvent(this.props.uid, this.props.id, gamerTag);
        subscribeUserToTopic(this.props.id, this.props.uid, EVENTS_TOPIC);
    }

    /**
     * Sends the user to the event (a discord channel)
     */
    goToEvent = async () => {
        Linking.openURL(this.props.discordLink ?
            this.props.discordLink :
            (await remoteConf.getDataFromKey('Discord')).QAPLA_DISCORD_CHANNEL);
    }

    /**
     * Close the gamer tag moddal and opens the event requirements modal
     */
    closeGamerTagModal = () => this.setState({ showGamerTagModal: false, showRequirementsModal: true });

    /**
     * Closes the requirements modal
     */
    closeRequirementsModal = () => this.setState({ showRequirementsModal: false });

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

    render() {
        const {
            title,
            titulo,
            descriptions,
            description,
            verified,
            game,
            platform,
            backgroundImage,
            streamingPlatformImage,
            streamerName
        } = this.props;

        let selectedGame = {
            gameKey: game,
            platform: platform,
            name: ''
        };

        /**
         * Before the app load the games (on redux) if we do not add this validation
         * try to call to this.props.games[platform] can throw an error
         */
        if (this.props.games[platform] && this.props.games[platform][game]) {
            selectedGame.name = this.props.games[platform][game].name;
        }

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
            <View style={verified ? styles.container : styles.disabledContainer}>
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
                        <Text style={styles.brandText}>
                            Tu marca
                        </Text>
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
            </View>
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