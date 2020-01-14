// josep.sanahuja  - 18-12-2019 - us176 - Changed 48hr text into 24h
// diego           - 24-09-2019 - us128 - File creation

import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import styles from './style';
import Images from '../../../assets/images';
import { translate } from '../../utilities/i18';

const VerificationSuccess = Images.png.verificationProccesSuccess.img;

class VerificationProccessSuccess extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={VerificationSuccess} />
                <View style={styles.greetingContainer}>
                    <Text style={styles.title}>{translate('verificationScreen.verificationProcessSuccess.title')}</Text>
                    <Text style={styles.body}>
                        {translate('verificationScreen.verificationProcessSuccess.body')}
                    </Text>
                </View>
            </View>
        );
    }
}

export default VerificationProccessSuccess;