// diego           - 20-08-2019 - us89 - File creation

import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import Images from './../../../assets/images';
import UserProfileGameCard from '../UserProfileGameCard/UserProfileGameCard';
import { getPlatformNameWithKey } from '../../utilities/utils';

const EXPERIENCE_REQUIRED_TO_LEVEL_UP = 20;

export class UserProfilePlatformGameList extends Component {

    /**
     * Return resources (Icon and name) of the game
     * 
     * @param {string} game Game to get resources
     */
    getGameResources = (game) => gamesResources[game.replace(/ +/g, '')];

    /**
     * Return the win rate of the user from game with gameKey
     * 
     * @param {string} gameKey Key of the game
     */
    getWinRate = (gameKey) => {
        const gameWins = this.props.gamerStatistics[gameKey].gameWins * 100;
        const matchesPlayed = (this.props.gamerStatistics[gameKey].gameWins + this.props.gamerStatistics[gameKey].gameLoses);

        return gameWins / matchesPlayed || 0;
    }

    /**
     * Return the experience level of the user
     * 
     * @param {string} gameKey Key of the game
     */
    getExperience = (gameKey) => {
        const userLevel = Math.floor(this.props.gamerStatistics[gameKey].gameExp / EXPERIENCE_REQUIRED_TO_LEVEL_UP);
        const experienceRequiredForCurrentLevel = EXPERIENCE_REQUIRED_TO_LEVEL_UP * userLevel;
        const experienceOnTheCurrentLevel = this.props.gamerStatistics[gameKey].gameExp - experienceRequiredForCurrentLevel;

        return 100 / EXPERIENCE_REQUIRED_TO_LEVEL_UP * experienceOnTheCurrentLevel;
    };

    /**
     * Determine the user level of a game based on the experience of the user
     * in that game
     * 
     * @param {string} gameKey Identifier of the game
     */
    determineUserLevel = (gameKey) => this.props.gamerStatistics[gameKey].gameExp / 20;

    /**
     * Check if the given index is the last from a list of size quantityOfElements
     * 
     * @param {number} currentIndex Index to evaluate
     * @param {number} quantityOfElements Quantity of elements from the list to evaluate
     */
    lastChild = (currentIndex, quantityOfElements) => (currentIndex === quantityOfElements - 1);

    render() {
        return (
            <View style={{ marginBottom: this.props.lastChild ? 20 : 0 }}>
                <Text style={styles.title}>{getPlatformNameWithKey(this.props.platform)}</Text>
                <ScrollView horizontal>
                    {Object.keys(this.props.userGames).map((gameKey, index) => {
                        let gamerStatistics = null;
                        if (this.props.gamerStatistics[gameKey]) {
                            gamerStatistics = <UserProfileGameCard
                                /**
                                 * key is builded with the name of the platform and the index of the game
                                 * e.g. pc_white-1
                                 */
                                key={`${this.props.platform}-${gameKey}`}
                                platform={this.props.platform}
                                game={this.getGameResources(this.props.userGames[gameKey])}
                                winRate={this.getWinRate(gameKey)}
                                experience={this.getExperience(gameKey)}
                                level={this.determineUserLevel(gameKey)}
                                lastChild={this.lastChild(index, Object.keys(this.props.userGames).length)} />
                        }
                        return gamerStatistics;
                    })}
                </ScrollView>
            </View>
        );
    }
}

const gamesResources = {
    Fifa17: {
        Icon: Images.svg.fifaIcon,
        name: 'FIFA'
    },
    ClashRoyale: {
        Icon: Images.svg.clashIcon,
        name: 'Clash'
    },
    GearsofWar: {
        Icon: Images.svg.gowIcon,
        name: 'GOW'
    },
    Halo: {
        Icon: Images.svg.haloIcon,
        name: 'Halo'
    },
    Hearthstone: {
        Icon: Images.svg.heartstoneIcon,
        name: 'Hearthstone'
    },
    Overwatch: {
        Icon: Images.svg.overwatchIcon,
        name: 'Overwatch'
    },
    LOL: {
        Icon: Images.svg.lolIcon,
        name: 'LOL'
    },
    Smashbrothers: {
        Icon: Images.svg.smashIcon,
        name: 'Smash'
    }
};

function mapDispatchToProps(state) {
    return {
        gamerStatistics: state.userReducer.user
    }
}

export default connect(mapDispatchToProps)(UserProfilePlatformGameList);
