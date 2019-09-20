// diego           - 18-09-2019 - us133 - File creation

import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './style';
import Images from './../../../assets/images';

const VerifyIcon = Images.svg.verifyIcon

export class LogroVerification extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>¡Verifica tu identidad! y desbloquea los logros.</Text>
                        <VerifyIcon />
                    </View>
                    <Text style={styles.description}>
                        La información compartida es completamente confidencial y será utilizada para incrementar la seguridad de tu cuenta.
                    </Text>
                    <TouchableWithoutFeedback>
                        <View style={styles.verifyButton}>
                            <Text style={styles.verifyTextButton}>Verificar</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

export default LogroVerification;
