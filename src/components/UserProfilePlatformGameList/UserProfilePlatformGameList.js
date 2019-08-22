// diego           - 20-08-2019 - us89 - File creation

import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import Images from './../../../assets/images';
import UserProfileGameCard from '../UserProfileGameCard/UserProfileGameCard';
import { getPlatformNameWithKey } from '../../utilities/utils';

const NECESSARY_EXPERIENCE_TO_UPLOAD_LEVEL = 20;

export class UserProfilePlatformGameList extends Component {

    /**
     * Return the resources of the game
     * @param game Game to get resources
     */
    getGameResources = (game) => gamesResources[game.replace(/ +/g, '')];

    /**
     * Return the win rate of the user in the specified game
     * @param gameKey Key of the game
     */
    getWinRate = (gameKey) => this.props.gamerStatistics[gameKey].gameWins * 100 / (this.props.gamerStatistics[gameKey].gameWins + this.props.gamerStatistics[gameKey].gameLoses);

    /**
     * Return the experience level of the user
     * @param gameKey Key of the game
     */
    getExperience = (gameKey) => 100 / NECESSARY_EXPERIENCE_TO_UPLOAD_LEVEL * (this.props.gamerStatistics[gameKey].gameExp - NECESSARY_EXPERIENCE_TO_UPLOAD_LEVEL * Math.floor(this.props.gamerStatistics[gameKey].gameExp / NECESSARY_EXPERIENCE_TO_UPLOAD_LEVEL));

    render() {
        return (
            <View style={{ marginBottom: this.props.lastChild ? 20 : 0 }}>
                <Text style={styles.title}>{getPlatformNameWithKey(this.props.platform)}</Text>
                <ScrollView horizontal>
                    {Object.keys(this.props.userGames).map((gameKey, index) => {
                        if (this.props.gamerStatistics[gameKey]) {
                            return <UserProfileGameCard key={`${this.props.platform}-${gameKey}`}
                                platform={this.props.platform}
                                game={this.getGameResources(this.props.userGames[gameKey])}
                                winRate={this.getWinRate(gameKey) || 0}
                                experience={this.getExperience(gameKey)}
                                level={this.props.gamerStatistics[gameKey].gameExp / 20}
                                lastChild={index === Object.keys(this.props.userGames).length - 1} />
                        }
                        return null;
                    })}
                </ScrollView>
            </View>
        );
    }
}

const gamesResources = {
    Fifa17: {
        Icon: Images.svg.fifaIcon,
        name: 'FIFA 19'
    },
    ClashRoyale: {
        Icon: Images.svg.clashIcon,
        name: 'Clash Royale'
    },
    GearsofWar: {
        Icon: Images.svg.gowIcon,
        name: 'Gears of War 4'
    },
    Halo: {
        Icon: Images.svg.haloIcon,
        name: 'Halo 5'
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
        name: 'League of legends'
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
