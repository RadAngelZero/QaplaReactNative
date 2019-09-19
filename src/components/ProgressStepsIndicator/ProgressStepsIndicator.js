// diego           - 19-09-2019 - us121 - File creation

import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './style';

export class ProgressStepsIndicator extends Component {
    render() {
        let steps = [];
        for (let index = 0; index < this.props.steps; index++) {
            steps.push(
                <View
                    key={`Indicator-${index}`}
                    style={[styles.indicator, { backgroundColor: index === this.props.selected ? '#3DF9DF' : '#060919'  }]} />
            );
        }
        return (
            <View style={styles.container}>
                {steps}
            </View>
        );
    }
}

export default ProgressStepsIndicator;
