// josep.sanahuja - 26-08-2019 - us90 - Removed surrouding Views highlights

import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import styles from './style';
import { translate } from '../../utilities/i18';
import QaplaText from '../QaplaText/QaplaText';

class CreateRetasButton extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={[styles.buttonContainer, styles.container]}>
                    <QaplaText style={styles.textStyle}>{translate('publicMatchesFeedScreen.createMatchesButton')}</QaplaText>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default CreateRetasButton;
