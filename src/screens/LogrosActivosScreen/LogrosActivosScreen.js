// diego           - 18-09-2019 - us110 - File creation

import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';

import styles from './style';
import LogrosList from '../../components/LogroCard/LogrosList';

export class LogrosActivosScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LogrosList />
            </SafeAreaView>
        );
    }
}

export default LogrosActivosScreen;
