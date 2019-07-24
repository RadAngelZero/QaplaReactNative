// diego -              24-07-2019 - us31 - update headers in WebView and componentWillMount
import React, { Component } from 'react';
import {
    View,
    WebView,
    BackHandler
} from 'react-native';
import { getIdTokenFromUser } from '../../services/auth';
import { withNavigation } from 'react-navigation';
import styles from './style';

class CheckOutPaymentScreen extends Component {
    state = {
        idToken: ''
    };

    componentDidMount() {
        //Listener on Back button for android devices
        BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
    }

    componentWillUnmount() {
        //Listener on Back button for android devices
        BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
    }

    async componentWillMount() {
        try {
            this.setState({ idToken: await getIdTokenFromUser() });
        }
        catch(error) {
            console.log(error);
        };
    }

    handleNavigation(title) {
        if (title === 'Cancel' || title === 'Success') {
            this.props.navigation.navigate('SetBet');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.idToken !== '' &&
                    <WebView
                        source={{
                            uri: `https://us-central1-reactnativeprueba-8f6f8.cloudfunctions.net/checkOutWithPaypal`,
                            headers: { 'Authorization': `Bearer ${this.state.idToken}` }
                        }}
                        onNavigationStateChange={(data) => this.handleNavigation(data.title)}
                        scalesPageToFit={true} />
                }
            </View>
        );
    }
}

export default withNavigation(CheckOutPaymentScreen);
