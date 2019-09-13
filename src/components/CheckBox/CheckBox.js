// diego	      - 06-09-2019 - us93 - File creation

import React, { Component } from 'react';
import { Animated, View, TouchableWithoutFeedback, Text } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import { isFunction } from '../../utilities/utils';

const OkIcon = images.svg.okIcon;

export class CheckBox extends Component {
    state = {
        backgroundOpacity: new Animated.Value(0),
        selected: false
    };

    /**
     * @description Toggle the state of the checbox
     */
    toggleCheckBox = () => {

        /**
         * Create an animation to set the opacity of the selectedContainer
         * (show with opacity animation that the checkbox is selected or unselected)
         */
        Animated.timing(this.state.backgroundOpacity, {
            toValue: !this.state.selected ? 1 : 0,

            /**
             * Based on material design, the speed in this kind of controls
             * (selection controls) must be of 100ms
             * https://material.io/design/motion/speed.html#duration
             */ 
            duration: 100
        }).start();

        /**
         * Check if exist a onPress prop and if it's a function
         */
        if (isFunction(this.props.onPress)) {

            /**
             * Execute the onPress sended by the father to perform the necessary actions
             * on the top component (doesn't matter the action)
             */
            this.props.onPress(!this.state.selected);
        }

        this.setState({ selected: !this.state.selected });
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <TouchableWithoutFeedback onPress={this.toggleCheckBox}>
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
