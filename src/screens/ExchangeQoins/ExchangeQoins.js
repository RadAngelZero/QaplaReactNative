import React, { Component } from 'react';
import {
    View,
    SafeAreaView
} from 'react-native';

import { WebView } from 'react-native-webview';

import { trackOnSegment } from '../../services/statistics';
import styles from './style';

class ExchangeQoins extends Component {
    handleNavigation(title) {
        if (title === 'Success') {
            trackOnSegment('Succesful exchange Qoins request added');
            this.props.navigation.pop();
        } else if(title === 'Cancel') {
            this.props.navigation.pop();
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <WebView
                        source={{
                            uri: this.props.navigation.getParam('exchangeUrl', '')
                        }}
                        onNavigationStateChange={(data) => this.handleNavigation(data.title)}
                        scalesPageToFit={true} />
                </View>
            </SafeAreaView>
        );
    }
}

export default ExchangeQoins;
