// josep.sanahuja - 26-08-2019 - us90 - Removed surrouding Views highlights

import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import i18n from 'i18n-js';

import styles from './style';

class CreateRetasButton extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={[styles.buttonContainer, styles.container]}>
                    <Text style={styles.textStyle}>{i18n.t('publicMatchesFeedScreen.createMatchesButton')}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default CreateRetasButton;
