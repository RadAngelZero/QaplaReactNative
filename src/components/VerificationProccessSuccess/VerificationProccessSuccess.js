// josep.sanahuja  - 18-12-2019 - us176 - Changed 48hr text into 24h
// diego           - 24-09-2019 - us128 - File creation

import React, { Component } from 'react';
import { View, Image } from 'react-native';

import styles from './style';
import Images from '../../../assets/images';
import { translate } from '../../utilities/i18';
import QaplaText from '../QaplaText/QaplaText';

const VerificationSuccess = Images.png.verificationProccesSuccess.img;

class VerificationProccessSuccess extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={VerificationSuccess} />
                <View style={styles.greetingContainer}>
                    <QaplaText style={styles.title}>{translate('verificationScreen.verificationProcessSuccess.title')}</QaplaText>
                    <QaplaText style={styles.body}>
                        {translate('verificationScreen.verificationProcessSuccess.body')}
                    </QaplaText>
                </View>
            </View>
        );
    }
}

export default VerificationProccessSuccess;