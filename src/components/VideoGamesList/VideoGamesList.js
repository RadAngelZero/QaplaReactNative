// diego          - 21-08-2019 - us89 - Added behavior to load the games that the user don't have
// diego          - 10-07-2019 - us22 - Update in the way that load the game name

import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './style';
import PlatformGamesList from '../PlatformGamesList/PlatformGamesList';
import { connect } from 'react-redux';

class VideoGamesList extends Component {
    state = {
        gamesToLoad: {}
    };

    componentWillMount() {
        let gamesToLoad = {};
        let userGameList = this.props.gamesListToLoad;

        if (this.props.loadGamesThatUserDontHave) {
            Object.keys(this.props.games).map((gamePlatform) => {
                Object.keys(this.props.games[gamePlatform]).map((gameKey) => {
                    if (userGameList.indexOf(gameKey) === -1) {
                        if(!gamesToLoad[gamePlatform]){
                            gamesToLoad[gamePlatform] = {};
                        }
                        gamesToLoad[gamePlatform][gameKey] = this.props.games[gamePlatform][gameKey];
                    }
                });
            });
        } else {
            //If the user don't have games userGameList is going to be undefined
            //So we check that userGameList instance of array, in this case we
            //can show only their games.

            // NOTE: It seems it only gets the whole list of games from the game ref,ç
            // instead of getting both scenarios (Qapla Games, and )
            // TODO: Extend info on that. (Diego)
            if (userGameList instanceof Array) {
                Object.keys(this.props.games).map((gamePlatform) => {
                    userGameList.sort().map((gameToLoadKey) => {
                        if(this.props.games[gamePlatform].hasOwnProperty(gameToLoadKey)) {
                            if(!gamesToLoad[gamePlatform]){
                                gamesToLoad[gamePlatform] = {};
                            }
                            gamesToLoad[gamePlatform][gameToLoadKey] = this.props.games[gamePlatform][gameToLoadKey];
                        }
                        userGameList.slice(userGameList.indexOf(gameToLoadKey), 1);
                    });
                });
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
                            loadGamesThatUserDontHave={this.props.loadGamesThatUserDontHave}
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
