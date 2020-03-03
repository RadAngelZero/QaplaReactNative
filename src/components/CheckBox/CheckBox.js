// diego	      - 06-09-2019 - us93 - File creation

import React, { Component } from 'react';
import { Animated, View, TouchableWithoutFeedback, Text } from 'react-native';

import styles from './style';
import images from '../../../assets/images';

const OkIcon = images.svg.okIcon;

export class CheckBox extends Component {
    state = {
        backgroundOpacity: new Animated.Value(0),
        selected: false
    };

    static getDerivedStateFromProps(props, state) {
        if (props.selected !== state.selected) {

            /**
             * Create an animation to set the opacity of the selectedContainer
             * (show with opacity animation that the checkbox is selected or unselected)
             */
            Animated.timing(state.backgroundOpacity, {
                toValue: props.selected ? 1 : 0,

                /**
                 * Based on material design, the speed in this kind of controls
                 * (selection controls) must be of 100ms
                 * https://material.io/design/motion/speed.html#duration
                 */
                duration: 100
            }).start();

            return { selected: props.selected };
        }

        return null;
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <TouchableWithoutFeedback disabled={this.props.disabled} onPress={this.props.onPress}>
                    <View style={styles.selectionArea}>
                        <View style={styles.checkboxContainer}>
                            <Animated.View style={[styles.selectedContainer, { opacity: this.state.backgroundOpacity }]}>
                                <OkIcon />
                            </Animated.View>
                        </View>
                        <Text style={styles.label}>{this.props.label}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default CheckBox;
