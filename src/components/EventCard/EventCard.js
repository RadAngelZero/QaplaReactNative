// diego           - 11-12-2019 - us165 - Validate if the user is logged before execute joinEvent
// diego           - 14-11-2019 - us146 - File creation

import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback, Linking } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import styles from './style';
import { joinEvent } from '../../services/database';
import { isUserLogged } from '../../services/auth';

import LogroLifeTimeBadge from '../LogroCard/LogroLifeTimeBadge/LogroLifeTimeBadge';
import { translate, getLocaleLanguage } from '../../utilities/i18';
import { QAPLA_DISCORD_CHANNEL, EVENTS_TOPIC } from '../../utilities/Constants';
import { subscribeUserToTopic } from '../../services/messaging';
import AddGamerTagModal from '../AddGamerTagModal/AddGamerTagModal';
import EventRequirementsModal from '../EventRequirementsModal/EventRequirementsModal';
import { getGamerTagKeyWithGameAndPlatform } from '../../utilities/utils';

class EventCard extends Component {
    state = {
        showGamerTagModal: false,
        userHasGameAdded: false,
        showRequirementsModal: false,
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
                this.setState({ showGamerTagModal: true });
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
        subscribeUserToTopic(`${this.props.id}_${getLocaleLanguage()}`, this.props.uid, EVENTS_TOPIC);
    }

    /**
     * Sends the user to the event (a discord channel)
     */
    goToEvent = () => Linking.openURL(QAPLA_DISCORD_CHANNEL);

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

        if (textLangObj[userLanguage]) {
            res = textLangObj[userLanguage];
        }

        return res;
    }

    render() {
        const {
            photoUrl,
            title,
            descriptions,
            tiempoLimite,
            verified,
            priceQaploins,
            game,
            platform
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
            selectedGame.name =this.props.games[platform][game].name;
        }

        const descriptionTranslated = this.getTextBasedOnUserLanguage(descriptions);
        const titleTranslated = this.getTextBasedOnUserLanguage(title);

        return (
            <View style={verified ? styles.container : styles.disabledContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.colASocialContainer}>
                        <Image style={styles.picture} source={{ uri: photoUrl }} />
                    </View>
                    <View style={styles.colBSocialContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{titleTranslated}</Text>
                        </View>
                        <Text style={styles.description}>{descriptionTranslated}</Text>
                    </View>
                    <View style={styles.colBContainer}>
                        <LogroLifeTimeBadge limitDate={tiempoLimite} />
                        {(priceQaploins === null || priceQaploins === undefined) &&
                            <TouchableWithoutFeedback onPress={this.requestUserTags}>
                                <View style={styles.participateButton}>
                                    <Text style={styles.participateTextButton}>{translate('activeAchievementsScreen.eventAchievement.participate')}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                </View>
                <AddGamerTagModal
                    open={this.state.showGamerTagModal}
                    onClose={() => this.setState({ showGamerTagModal: false })}
                    onSuccess={this.subscribeUserToEvent}
                    onCancel={this.onRequestTagsFail}
                    selectedGame={selectedGame}
                    uid={this.props.uid}
                    userName={this.props.userName}
                    newGame={!this.state.userHasGameAdded}
                    previousGamerTag={this.state.previousGamerTag} />
                <EventRequirementsModal
                    open={this.state.showRequirementsModal}
                    closeModal={this.closeRequirementsModal}
                    reTry={this.requestUserTags} />
                {(priceQaploins !== null && priceQaploins !== undefined) &&
                    <View style={styles.eventInfoContainer}>
                        <TouchableWithoutFeedback onPress={this.goToEvent}>
                            <Text style={styles.goToEvent}>
                                {translate('activeAchievementsScreen.eventAchievement.goToEvent')}
                            </Text>
                        </TouchableWithoutFeedback>
                        <View style={styles.participatingTextContainer}>
                            <Text style={styles.participatingText}>{translate('activeAchievementsScreen.eventAchievement.alreadyParticipating')}</Text>
                        </View>
                    </View>
                }
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