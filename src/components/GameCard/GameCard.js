// diego          - 30-12-2019 - us189 - Reordered code (functions at the top, render function at the bottom)
// josep.sanahuja - 12-12-2019 - us160 - Add 'Game Added' event in openModal
// diego          - 21-08-2019 - us89 - Add game on the user if they don't have it but have a valid gamer tag
//                                      (e.g.: in all the xbox games you use the xboxLive,
//                                      so don't need to add a new gamer tag every time)
// josep.sanahuja - 17-07-2019 - us25 - + openModal
// diego          - 16-07-2019 - us30 - update navigation when GamerTag is added
// diego          - 17-07-2019 - NA   - update images styles and remove unnecesary code

import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './style'
import Svg from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

import {
    setSelectedGame
} from '../../actions/gamesActions';

import { connect } from 'react-redux';

import { getGamerTagWithUID, addGameToUser } from '../../services/database';
import { withNavigation } from 'react-navigation';
import { subscribeUserToTopic } from '../../services/messaging';
import { trackOnSegment } from '../../services/statistics';

class GameCard extends Component {

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
            /**
             * If receive a flag to load the games that the user don't have, but have a gamerTag for this game
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
                    await addGameToUser(this.props.user.id, this.props.user.userName, newGame.platform, newGame.gameKey, gtag.gamerTag);

                    /**
                     * Every game is a topic, so we can send push notifications to the user
                     * about specific games
                     */
                    subscribeUserToTopic(newGame.gameKey);
                    this.props.navigation.navigate('Perfil');
                } catch (error) {
                    console.error(error);
                }
            } else {
                this.props.setSelectedGame(newGame);
                this.props.navigation.navigate('SetBet', {game: newGame});
            }
        } else {
            // Update Redux State with the current game selected so we can use it in the
            // modal from the screen where all games are listed.
            this.props.setSelectedGame(newGame);
        }
    }

    render() {
        const { game, backgroundColor } = this.props;
        return (
            <TouchableWithoutFeedback onPress={this.openModal}>
                <LinearGradient useAngle={true}
                    angle={150}
                    angleCenter={{ x: .5, y: .5}}
                    colors={[backgroundColor.primary, backgroundColor.secondary]}
                    style={styles.container}>
                    <Image
                        style={styles.imageStyle}
                        source={game.image[this.props.platform]}/>
                    <View style={styles.detailsContainer}>
                        <Svg style={styles.iconContainer}>
                            <game.Icon width={30} height={30} />
                        </Svg>
                        <Text style={styles.gameName}>
                            {game.name}
                        </Text>
                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
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
