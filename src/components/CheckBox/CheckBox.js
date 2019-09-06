// diego	      - 06-09-2019 - us93 - File creation

import React, { Component } from 'react';
import { Animated, View, TouchableWithoutFeedback, Text, Easing } from 'react-native';

import styles from './style';
import images from '../../../assets/images';

export class CheckBox extends Component {
    state = {
        backgroundOpacity: new Animated.Value(0),
        selected: false
    };

    /**
     * Return true if the functionToCheck param is a function
     * otherwise return false
     * @param {function} functionToCheck The function to verify
     */
    isFunction(functionToCheck) {
        var getType = {};

        /**
         * Check first if the function is different from null
         * Check if the type of the object is [object function]
         */
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    toogleCheckBox = () => {

        /**
         * Create an animation to set the opacity of the selectedContainer
         * (show with opacity animation that the checkbox is selected or unselected)
         */
        Animated.timing(this.state.backgroundOpacity, {
            toValue: !this.state.selected ? 1 : 0,

            /**
             * Based on material design, the speed in this kind of controls
             * (selection controls) must be of 100ms
             */ 
            duration: 100
        }).start();

        /**
         * Check if exist a onPress prop and if it's a function
         */
        if (this.isFunction(this.props.onPress)) {

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
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.toogleCheckBox}>
                    <View style={styles.checkboxContainer}>
                        <Animated.View style={[styles.selectedContainer, { opacity: this.state.backgroundOpacity }]}>
                            <images.svg.okIcon />
                        </Animated.View>                    
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={styles.label}>{this.props.label}</Text>
                </View>
            </View>
        );
    }
}

export default CheckBox;
