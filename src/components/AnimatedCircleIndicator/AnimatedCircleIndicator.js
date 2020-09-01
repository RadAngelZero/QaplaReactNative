// diego           - 11-09-2019 - us107 - Updated default size and width of AnimatedCircularProgress
// diego           - 20-08-2019 - us89 - File creation

import React, { Component } from 'react';
import { View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import styles from './style';
import QaplaText from '../QaplaText/QaplaText';

export class AnimatedCircleIndicator extends Component {

    /**
     * Determine the content to show inside the circle
     *
     * @param {number} fill Percentage of the circle who is filled
     */
    fillCircleText = (fill) => <QaplaText style={styles.fillText}> {this.props.fillText || Math.floor(fill)}{this.props.percentage ? '%' : ''} </QaplaText>

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
                        {this.props.fillComponent || this.fillCircleText}
                </AnimatedCircularProgress>
                {this.props.description &&
                    <QaplaText style={[styles.description, this.props.descriptionStyle]}>
                        {this.props.description}
                    </QaplaText>
                }
            </View>
        );
    }
}

AnimatedCircleIndicator.defaultProps = {
    size: 50,
    width: 4,
    tintColor: '#6D7DDE',
    duration: 300,
    backgroundColor: '#1A1D34',
    percentage: false
};

export default AnimatedCircleIndicator;
