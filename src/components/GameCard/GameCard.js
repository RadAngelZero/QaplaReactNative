import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';
import Svg from 'react-native-svg';

class GameCard extends Component {
    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.props.backgroundColor }]}>
                <Image style={this.props.game.fullImage ? styles.fullImageStyle : styles.noFullImageStyle} source={this.props.game.image} />
                <View style={styles.detailsContainer}>
                    <Svg style={styles.iconContainer}>
                        <this.props.game.Icon width={30} height={30} />
                    </Svg>
                    <Text style={styles.gameName}>
                        {this.props.game.name}
                    </Text>
                </View>
            </View>
        );
    }
}

export default GameCard;
