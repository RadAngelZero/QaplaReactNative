import React, { Component } from 'react';
import { View, WebView, BackHandler } from 'react-native';
import { getIdTokenFromUser } from '../../services/auth';
import { withNavigation } from 'react-navigation';

class CheckOutPaymentScreen extends Component {
    state = {
        idToken: ''
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
    }

    componentWillMount() {
        getIdTokenFromUser().then((idToken) => {
            this.setState({ idToken });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleNavigation(title) {
        if (title === 'Cancel' || title === 'Success') {
            this.props.navigation.navigate('SetBet');
        }
    }

    render() {
        return (
            <View style={{ flex: 1, overflow: 'hidden' }}>
                {this.state.idToken !== '' &&
                    <WebView
                        source={{ uri: `https://us-central1-reactnativeprueba-8f6f8.cloudfunctions.net/checkOutWithPaypal?idToken=${this.state.idToken}` }}
                        onNavigationStateChange={(data) => this.handleNavigation(data.title)}
                        scalesPageToFit={true} />
                }
            </View>
        );
    }
}

export default withNavigation(CheckOutPaymentScreen);
