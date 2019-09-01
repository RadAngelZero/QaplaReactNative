// diego           - 20-08-2019 - us89 - File creation

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import styles from './style';

export class AnimatedCircleIndicator extends Component {

    /**
     * Determine the content to show inside the circle
     * 
     * @param {number} fill Percentage of the circle who is filled
     */
    fillCircleText = (fill) => <Text style={styles.fillText}> {Math.floor(fill)}{this.props.percentage ? '%' : ''} </Text>

    render() {
        return (
            <View style={styles.container}>
                <AnimatedCircularProgress
                    size={this.props.size}
                    rotation={0}
                    lineCap='round'
                    width={this.props.width}
                    fill={this.props.fill}
                    tintColor={this.props.tintColor}
                    duration={this.props.duration}
                    backgroundColor={this.props.backgroundColor}>
                        {this.fillCircleText}
                </AnimatedCircularProgress>
                {this.props.description &&
                    <Text style={styles.description}>{this.props.description}</Text>
                }
            </View>
        );
    }
}

AnimatedCircleIndicator.defaultProps = {
    size: 60,
    width: 6,
    tintColor: '#6D7DDE',
    duration: 300,
    backgroundColor: '#1A1D34',
    percentage: false
};

export default AnimatedCircleIndicator;
