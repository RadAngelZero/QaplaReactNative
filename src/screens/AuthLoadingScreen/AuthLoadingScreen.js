import React, { Component } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import { auth } from '../../utilities/firebase';
import { retrieveData } from '../../utilities/persistance';
import styles from './style';
import { getUserNode } from '../../actions/userActions';
import { getUserNameWithUID } from '../../services/database';

class AuthLoadingScreen extends Component {
    componentDidMount() {
        auth.onAuthStateChanged(async (user) => {
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
            <View style={styles.container}>
                <ActivityIndicator size='large' color='rgb(61, 249, 223)' />
                <Text style={styles.textColor}>Cargando...</Text>
            </View>
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
        loadUserData: (uid) => getUserNode(uid)(dispatch)
    };
}

export default AuthLoadingScreen = connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
