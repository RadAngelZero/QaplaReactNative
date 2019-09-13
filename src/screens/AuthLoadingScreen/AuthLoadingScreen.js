// diego             - 02-09-2019 - us91 - Initialize segment
// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView

import React, { Component } from 'react';
import { View, ActivityIndicator, Text, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { auth } from '../../utilities/firebase';
import { retrieveData } from '../../utilities/persistance';
import styles from './style';
import { getUserNode } from '../../actions/userActions';
import { getUserNameWithUID } from '../../services/database';
import { getListOfGames } from '../../actions/gamesActions';
import { initializeSegment } from '../../services/statistics';

class AuthLoadingScreen extends Component {
    componentDidMount() {

        // Initialize the segment SDK to collect user statistics
        initializeSegment();

        auth.onAuthStateChanged(async (user) => {
            this.props.loadListOfGames();
            if (user) {
                this.props.loadUserData(user.uid);
                
                const userName = await getUserNameWithUID(user.uid).then((userName) => userName);
                
                if(userName === ''){
                    return this.props.navigation.navigate('ChooseUserNameScreen');
                }
            }
            const isTutorialDone = await retrieveData('tutorial-done');
            if (isTutorialDone) {
                return this.props.navigation.navigate('Publicas', { firstMatchCreated: (await retrieveData('first-match-created')) === 'true' });
            } 
            else {
                return this.props.navigation.navigate('Welcome');
            }
        });
    }
    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <ActivityIndicator size='large' color='rgb(61, 249, 223)' />
                    <Text style={styles.textColor}>Cargando...</Text>
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadUserData: (uid) => getUserNode(uid)(dispatch),
        loadListOfGames: () => getListOfGames()(dispatch)
    };
}

export default AuthLoadingScreen = connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
