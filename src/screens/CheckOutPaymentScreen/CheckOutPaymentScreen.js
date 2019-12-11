// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView
// diego             - 24-07-2019 - us31 - update headers in WebView and componentWillMount

import React, { Component } from 'react';
import {
    View,
    WebView,
    SafeAreaView
} from 'react-native';

import { getIdTokenFromUser } from '../../services/auth';
import { withNavigation } from 'react-navigation';
import styles from './style';

import TopNavOptions from '../../components/TopNavOptions/TopNavOptions';

class CheckOutPaymentScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: () => (
            <TopNavOptions
                navigation={navigation}
                close
                onCloseGoTo={navigation.getParam('previousScreen', '')} />)
    });

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
