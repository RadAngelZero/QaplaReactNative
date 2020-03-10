// diego          - 07-01-2019 - NA   - Hide scroll indicators on ScrollView
// diego          - 21-08-2019 - us89 - Added loadGamesUserDontHave prop
// josep.sanahuja - 15-07-2019 - us25 - added 'gameKey' to GameCard comp props
// diego          - 11-07-2019 - Update platform's names for new references on database
// diego          - 10-07-2019 - us22 - Update in the way that load the game name
// diego          - 17-07-2019 - NA   - Remove unnecesary code to make more legible and efficient
// diego          - 17-07-2019 - NA   - remove full image field in gamesResources object

import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import styles from './style';
import GameCard from '../GameCard/GameCard';
import { translate } from '../../utilities/i18';

class PlatformGamesList extends Component {
    render() {
        return (
            <View style={styles.container}>
                {Object.keys(this.props.listOfGames).length > 0 &&
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{platformResources[this.props.platform].platformName}</Text><View style={[styles.circleIcon, { backgroundColor: platformResources[this.props.platform].platformColor }]}></View>
                    </View>
                }
                <ScrollView horizontal style={styles.scrollViewStyle} showsHorizontalScrollIndicator={false}>
                    {Object.keys(this.props.listOfGames).map((gameKey) => (
                        <GameCard
                            key={gameKey}
                            loadGamesUserDontHave={this.props.loadGamesUserDontHave}
                            game={this.props.listOfGames[gameKey]}
                            platform={this.props.platform}
                            backgroundColor={platformResources[this.props.platform].backgroundColor}
                            gameKey={gameKey} />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

// TODO: Is this info in the backend? Ideally it should be retrieved from the server and maybe
// cached after first time downloaded
const platformResources = {
    pc_white: {
        platformColor: '#6D7DDE',
        backgroundColor: {
            primary: '#B670E1',
            secondary: '#7726C6'
        },
        platformName: translate('platforms.mobile')
    },
    xbox_white: {
        platformColor: '#119910',
        backgroundColor: {
            primary: '#3DF9DF',
            secondary: '#42B85E'
        },
        platformName: 'Xbox One'
    },
    ps4_white: {
        platformColor: '#0053CC',
        backgroundColor: {
            primary: '#3DBFF4',
            secondary: '#1A52CF'
        },
        platformName: 'PS4'
    },
    switch_white: {
        platformColor: '#CC003A',
        backgroundColor: {
            primary: '#FF1658',
            secondary: '#1A52CF'
        },
        platformName: 'Switch'
    }
};

export default PlatformGamesList;
