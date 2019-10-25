// josep.sanahuja    - 26-08-2019 - us90 - loadShowHg1Modal
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
import { getHg1CreateMatch } from '../../actions/highlightsActions';

class AuthLoadingScreen extends Component {
    state = {
        firstLoad: true
    };

    componentDidMount() {
        // Load highlight hg1 Modal
        this.props.loadShowHg1Modal();

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
            if (this.state.firstLoad) {
                const isTutorialDone = await retrieveData('tutorial-done');
                this.setState({ firstLoad: false });
                if (isTutorialDone) {
                    return this.props.navigation.navigate('Publicas', { firstMatchCreated: (await retrieveData('first-match-created')) === 'true' });
                } 
                else {
                    return this.props.navigation.navigate('Welcome');
                }
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
        loadListOfGames: () => getListOfGames()(dispatch),
        loadShowHg1Modal: () => getHg1CreateMatch()(dispatch)
    };
}

export default AuthLoadingScreen = connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
