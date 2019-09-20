// diego           - 18-09-2019 - us110 - File creation

import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';

import styles from './style';
import LogroVerification from '../../components/LogroVerification/LogroVerification';

export class LogrosActivosScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LogroVerification />
            </SafeAreaView>
        );
    }
}

export default LogrosActivosScreen;
