import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import styles from './style';

class CreateRetasButton extends Component {
    render() {
        return (
            <TouchableWithoutFeedback>
                <View style={styles.buttonContainer}>
                    <Text style={styles.textStyle}>Crear reta</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default CreateRetasButton;
