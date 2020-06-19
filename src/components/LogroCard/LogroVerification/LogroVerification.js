// diego           - 18-09-2019 - us133 - File creation

import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './style';
import Images from './../../../../assets/images';
import { isUserLogged } from '../../../services/auth';
import QaplaText from '../../QaplaText/QaplaText';

const VerifyIcon = Images.svg.verifyIcon

export class LogroVerification extends Component {

    /**
     * Redirecto to VerificationScreen
     */
    redirectToVerifyScreen = () => {
        this.props.navigation.navigate(isUserLogged() ? 'Verification' : 'SignIn');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.titleContainer}>
                        <QaplaText style={styles.title}>¡Verifica tu identidad! y desbloquea los eventos.</QaplaText>
                        <VerifyIcon />
                    </View>
                    <QaplaText style={styles.description}>
                        La información compartida es completamente confidencial y será utilizada para incrementar la seguridad de tu cuenta.
                    </QaplaText>
                    <TouchableWithoutFeedback onPress={this.redirectToVerifyScreen}>
                        <View style={styles.verifyButton}>
                            <QaplaText style={styles.verifyTextButton}>Verificar</QaplaText>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

export default withNavigation(LogroVerification);
