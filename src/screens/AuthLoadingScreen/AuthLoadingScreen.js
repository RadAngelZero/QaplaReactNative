import React, { Component } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import { auth } from '../../utilities/firebase';
import { retrieveData } from '../../utilities/persistance';
import styles from './style';
import { getUserNode } from '../../actions/userActions';

class AuthLoadingScreen extends Component {
    componentDidMount() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                this.props.loadUserData(user.uid);
            }
            const isTutorialDone = await retrieveData('tutorial-done');
            if (isTutorialDone) {
                this.props.navigation.navigate('App');
            } else {
                this.props.navigation.navigate('Welcome');
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color='rgba(61,249,223,1)' />
                <Text style={styles.textColor}>Cargando...</Text>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadUserData: (uid) => getUserNode(uid)(dispatch)
    };
}

export default AuthLoadingScreen = connect(null, mapDispatchToProps)(AuthLoadingScreen);
