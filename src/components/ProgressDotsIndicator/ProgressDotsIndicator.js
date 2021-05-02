import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './style';

export class ProgressDotsIndicator extends Component {
    render() {
        let steps = [];
        for (let index = 0; index < this.props.steps; index++) {
            steps.push(
                <View
                    key={`Indicator-${index}`}
                    style={[styles.indicator, {
                        backgroundColor: index === this.props.selected ? this.props.activeColor : this.props.color,
                        width: index === this.props.selected ? this.props.activeWidth : this.props.width,
                        marginHorizontal: this.props.marginHorizontal,
                    }]} />
            );
        }
        return (
            <View style={[styles.container, {}]}>
                {steps}
            </View>
        );
    }
}

export default ProgressDotsIndicator;
