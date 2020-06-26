import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './style'
import { SvgUri } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

import {
    setSelectedGame
} from '../../actions/gamesActions';

import { connect } from 'react-redux';

import { getGamerTagWithUID, addGameToUser } from '../../services/database';
import { withNavigation } from 'react-navigation';
import { subscribeUserToTopic } from '../../services/messaging';
import { trackOnSegment } from '../../services/statistics';
import { widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim';
import AddDiscordTagModal from '../AddDiscordTagModal/AddDiscordTagModal';
import Colors from '../../utilities/Colors';
import { GAMES_TOPICS } from '../../utilities/Constants';
import QaplaText from '../QaplaText/QaplaText';

class GameCard extends Component {
    state = {
        openDiscordTagModal: false,
        discordTagAdded: false,
        existingGamerTag: ''
    };

    openModal = async() => {
        trackOnSegment('Game Added', {
            Platform: this.props.platform,
            Game: this.props.gameKey
        });

        // Create a new game object which is extended with the platform member
        // so that it can be used in LoadGamesScreen inside the modal.
        let newGame = this.props.game;
        newGame.platform = this.props.platform;
        newGame.gameKey = this.props.gameKey;
        const gtag = await getGamerTagWithUID(this.props.user.id, newGame.gameKey, newGame.platform);

        // If the game selected has a gamertag then we don't open the modal
        if (gtag.gamerTag) {
            this.setState({ existingGamerTag: gtag.gamerTag }, async () => {
                if (this.props.user.discordTag) {
                    await this.handleGameSelectionLogic();
                } else {
                    this.setState({ openDiscordTagModal: true });
                }
            });
        } else {
            // Update Redux State with the current game selected so we can use it in the
            // modal from the screen where all games are listed.
            this.props.setSelectedGame(newGame);
        }
    }

    handleGameSelectionLogic = async () => {
        let newGame = this.props.game;
        newGame.platform = this.props.platform;
        newGame.gameKey = this.props.gameKey;

        /**
         * If receive a flag to load the games that the user doesn't have, but have a gamerTag for this game
         * (as happens on xbox or ps4) add the game to the user with ask no question and redirect to profile
         * because the user is adding games on their profile, no creating a match
         */
        if (this.props.loadGamesUserDontHave) {

            /**
             * Set the selected game to null should avoid that the modal shows up to the user, in this case it's not
             * necessary because already have a valid gamerTag for the selected game
             */
            this.props.setSelectedGame(null);
            try {
                await addGameToUser(this.props.user.id, this.props.user.userName, newGame.platform, newGame.gameKey, this.state.existingGamerTag);

                /**
                 * Every game is a topic, so we can send push notifications to the user
                 * about specific games
                 */
                subscribeUserToTopic(newGame.gameKey, this.props.user.id, GAMES_TOPICS);

                this.props.navigation.pop();
            } catch (error) {
                console.error(error);
            }
        } else {
            this.props.setSelectedGame(newGame);
            this.props.navigation.navigate('SetBet', {game: newGame});
        }
    }

    closeDiscordTagModal = () => {
        this.setState({ openDiscordTagModal: false });
    }

    render() {
        const { game, backgroundColor } = this.props;
        return (
            <>
                <TouchableWithoutFeedback onPress={this.openModal}>
                    <LinearGradient useAngle={true}
                        angle={150}
                        angleCenter={{ x: .5, y: .5}}
                        colors={[backgroundColor.primary, backgroundColor.secondary]}
                        style={styles.container}>
                        <Image
                            style={styles.imageStyle}
                            source={game.local ? game.image : { uri: game.image }}/>
                        <View style={styles.detailsContainer}>
                            {game.local ?
                                <game.icon
                                    style={styles.iconContainer}
                                    width={widthPercentageToPx(5)}
                                    height={heightPercentageToPx(5)} />
                                :
                                <SvgUri
                                    style={styles.iconContainer}
                                    width={widthPercentageToPx(5)}
                                    height={heightPercentageToPx(5)}
                                    uri={game.icon}
                                    fill={Colors.greenQapla} />
                            }
                            <QaplaText style={styles.gameName}>
                                {game.name}
                            </QaplaText>
                        </View>
                    </LinearGradient>
                </TouchableWithoutFeedback>
                <AddDiscordTagModal
                open={this.state.openDiscordTagModal}
                onClose={this.closeDiscordTagModal}
                onSuccess={this.handleGameSelectionLogic} />
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedGame: (game) => setSelectedGame(game)(dispatch)
    };
}

// NOTE: when calling redux connect with only mapDispatchToProps, it will complain about
// dispatch not being found as a function. Fix to that is to use null as the first parameter.
export default GameCard = withNavigation(connect(mapStateToProps, mapDispatchToProps)(GameCard));
