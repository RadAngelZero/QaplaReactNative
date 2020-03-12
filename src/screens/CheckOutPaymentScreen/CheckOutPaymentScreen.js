// diego             - 12-12-2019 - us166 - Updated cloud function reference for checkout
// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView
// diego             - 24-07-2019 - us31 - update headers in WebView and componentWillMount

import React, { Component } from 'react';
import {
    View,
    SafeAreaView
} from 'react-native';

import { WebView } from 'react-native-webview';

import { trackOnSegment } from '../../services/statistics';
import { getIdTokenFromUser } from '../../services/auth';
import { withNavigation } from 'react-navigation';
import styles from './style';

class CheckOutPaymentScreen extends Component {
    state = {
        idToken: ''
    };

    componentWillMount() {
        this.setIdToken();
    }

    async setIdToken() {
        try {
            this.setState({ idToken: await getIdTokenFromUser() });
        }
        catch(error) {
            console.log(error);
        };
    }

    handleNavigation(title) {
        if (title === 'Success') {
            trackOnSegment('Add Qaploins To User');
            this.props.navigation.pop();
        } else if(title === 'Cancel') {
            this.props.navigation.pop();
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    {this.state.idToken !== '' &&
                        <WebView
                            source={{
                                uri: `https://us-central1-qapplaapp.cloudfunctions.net/checkOutWithPaypal`,
                                headers: { 'Authorization': `Bearer ${this.state.idToken}` }
                            }}
                            onNavigationStateChange={(data) => this.handleNavigation(data.title)}
                            scalesPageToFit={true} />
                    }
                </View>
            </SafeAreaView>
        );
    }
}

export default withNavigation(CheckOutPaymentScreen);
