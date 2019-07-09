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
        var gamesToLoad = {};
        var userGameList = this.props.gamesListToLoad;
        Object.keys(this.props.games).map((gamePlatform) => {
            userGameList.sort().map((gameToLoadKey) => {
                if(this.props.games[gamePlatform].hasOwnProperty(gameToLoadKey)) {
                    if(!gamesToLoad[gamePlatform]){
                        gamesToLoad[gamePlatform] = {};
                    }
                    gamesToLoad[gamePlatform][gameToLoadKey] = { name: this.props.games[gamePlatform][gameToLoadKey] };
                }
                userGameList.slice(userGameList.indexOf(gameToLoadKey), 1);
            });
        });
        this.setState({ gamesToLoad });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Elige tu juego</Text>
                <ScrollView style={styles.scrollViewMargin}>
                    {Object.keys(this.state.gamesToLoad).map((platform) => (
                        <PlatformGamesList key={platform}
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
