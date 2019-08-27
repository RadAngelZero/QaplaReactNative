// diego          - 21-08-2019 - us89 - Add logic to load the games that the user don't have
// diego          - 10-07-2019 - us22 - Update in the way that load the game name

import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './style';
import PlatformGamesList from '../PlatformGamesList/PlatformGamesList';
import { connect } from 'react-redux';
import { getUserGamesOrderedByPlatform } from '../../utilities/utils';

class VideoGamesList extends Component {
    state = {
        gamesToLoad: {}
    };

    componentWillMount() {
        let gamesToLoad = {};
        let userGameList = this.props.gamesListToLoad;

        /**
         * If the user is adding games (loading only games that don't have)
         */
        if (this.props.loadGamesUserDontHave) {

            /**
             * Based on the qapla structure we need to get (from database) all the games, that games are in the following form:
             * Games: {
             *     PlatformName1: {
             *         GameKey1: GameName1,
             *         GameKey2: GameName2,
             *     }
             *     PlatformName2: {
             *         GameKey1: GameName1,
             *         GameKey2: GameName2,
             *     }
             * }
             * So we get the Games node, then we make a forEach (the first one) of that, this forEach iterate over the platforms,
             * based on that we need to iterate over every platform to get the games of that platform
             */
            Object.keys(this.props.games).forEach((gamePlatform) => {
                Object.keys(this.props.games[gamePlatform]).forEach((gameKey) => {

                    // If the user don't have that game
                    if (userGameList.indexOf(gameKey) === -1) {

                        // Create a child of the platform on the object
                        if(!gamesToLoad[gamePlatform]){
                            gamesToLoad[gamePlatform] = {};
                        }

                        // Add the game to the list of games to load
                        gamesToLoad[gamePlatform][gameKey] = this.props.games[gamePlatform][gameKey];
                    }
                });
            });
        } else {

            /**
             * If the user don't have games userGameList is going to be undefined
             * so we check that userGameList instance of array, in this case we
             * can show only their games.
             */
            if (userGameList instanceof Array) {
                gamesToLoad = getUserGamesOrderedByPlatform(userGameList, this.props.games);
                /*Object.keys(this.props.games).forEach((gamePlatform) => {
                    userGameList.sort().forEach((gameToLoadKey) => {
                        // If the platform on the current iteration have a child with key of the current user game
                        if(this.props.games[gamePlatform].hasOwnProperty(gameToLoadKey)) {

                            // Check if the user don't have games on that platform
                            if(!gamesToLoad[gamePlatform]){

                                // Create a child on the object for that platform
                                gamesToLoad[gamePlatform] = {};
                            }

                            // Add the game to the list of games to load
                            gamesToLoad[gamePlatform][gameToLoadKey] = this.props.games[gamePlatform][gameToLoadKey];
                        }
                        
                        // Remove the game from the list of the user games
                        userGameList.slice(userGameList.indexOf(gameToLoadKey), 1);
                    });
                });*/

            //If the user don't have games then we send all the games to be loaded
            } else {
                gamesToLoad = this.props.games;
            }
        }

        this.setState({ gamesToLoad });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Elige tu juego</Text>
                <ScrollView style={styles.scrollViewMargin}>
                    {Object.keys(this.state.gamesToLoad).map((platform) => (
                        <PlatformGamesList key={platform}
                            loadGamesUserDontHave={this.props.loadGamesUserDontHave}
                            listOfGames={this.state.gamesToLoad[platform]}
                            platform={platform} />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        games: state.gamesReducer.games
    }
}

export default VideoGamesList = connect(mapStateToProps)(VideoGamesList);
