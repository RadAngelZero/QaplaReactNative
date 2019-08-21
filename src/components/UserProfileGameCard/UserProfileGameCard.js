// diego           - 20-08-2019 - us89 - File creation

import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './style';
import AnimatedCircleIndicator from '../AnimatedCircleIndicator/AnimatedCircleIndicator';

export class UserProfileGameCard extends Component {
    render() {
        return (
            <View style={[styles.container, { marginRight: this.props.lastChild ? 20 : 0 }]}>
                <View style={styles.gameData}>
                    <this.props.game.Icon width={60} height={60} />
                    <Text style={styles.descriptionText}>{this.props.game.name}</Text>
                </View>
                <View style={styles.gamerInfo}>
                    <View style={styles.indicatorContainer}>
                        <AnimatedCircleIndicator fill={this.props.winRate} description='Win Rate' percentage />
                    </View>
                    <View style={styles.indicatorContainer}>
                        <AnimatedCircleIndicator fill={this.props.experience} description='Exp' />
                    </View>
                    <View style={styles.indicatorContainer}>
                        <AnimatedCircleIndicator fill={this.props.level} description='Nivel' />
                    </View>
                </View>
            </View>
        );
    }
}

export default UserProfileGameCard;
