import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text, NativeModules, LayoutAnimation, Animated } from 'react-native';
import styles from './style';
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
class CreateRetasButton extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                {this.props.highlighted ?
                    <View style={[styles.highlightedExterior]}>
                        <View style={[styles.highlightedInterior]}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.textStyle}>Crear reta</Text>
                            </View>
                        </View>
                    </View>
                :
                <View style={[styles.buttonContainer, styles.container]}>
                    <Text style={styles.textStyle}>Crear reta</Text>
                </View>
                }
            </TouchableWithoutFeedback>
        );
    }
}

export default CreateRetasButton;
