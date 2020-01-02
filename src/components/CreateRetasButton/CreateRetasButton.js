// josep.sanahuja - 26-08-2019 - us90 - Removed surrouding Views highlights

import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text, NativeModules, LayoutAnimation, Animated } from 'react-native';
import styles from './style';
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
class CreateRetasButton extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={[styles.buttonContainer, styles.container]}>
                    <Text style={styles.textStyle}>Jugar Ahora</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default CreateRetasButton;
