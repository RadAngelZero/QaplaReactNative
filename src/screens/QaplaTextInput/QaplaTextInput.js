import React, { Component } from 'react';
import { TextInput } from 'react-native';

import styles from './style';

class QaplaTextInput extends Component {
    render() {
        return (
            <TextInput
                style={[styles.textInput, this.props.style]}
                onChangeText={this.props.onChangeText}
                keyboardType={this.props.keyboardType}
                value={this.props.value}
                placeholder={this.props.placeholder}
                secureTextEntry={this.props.secureTextEntry}
                placeholderTextColor='rgba(0, 255, 220, 0.35)' />
        );
    }
}

export default QaplaTextInput;
