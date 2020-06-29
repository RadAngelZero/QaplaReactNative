// diego             - 17-12-2019 - us171 - TopNavOptions added
// diego             - 17-12-2019 - us172 - Refs added to continue/end the process from text field with the keyboard
// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView
// Diego             - 11-07-2019 - Qapla logo added to the top and Controllers image background created

import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback, TextInput, SafeAreaView } from 'react-native';

import { signInWithEmailAndPassword } from '../../services/auth';
import Images from './../../../assets/images';
import styles from './style';
import { translate } from '../../utilities/i18';
import { updateUserLoggedStatus } from '../../services/database';
import { subscribeUserToAllRegistredTopics } from '../../services/messaging';
import QaplaText from '../../components/QaplaText/QaplaText';

const SignUpControllersBackgroundImage = Images.png.signUpControllers.img;
const QaplaSignUpLogo = Images.png.qaplaSignupLogo.img;

class LoginWithEmailScreen extends Component {
    state = {
        email: '',
        password: ''
    };

    /**
     * Try SignIn the user using the email and password values from the state
     */
    logInUser = async () => {
        try {
            const user = await signInWithEmailAndPassword(this.state.email, this.state.password);
            updateUserLoggedStatus(true, user.user.uid);
            subscribeUserToAllRegistredTopics(user.user.uid);
            const originScreen = this.props.navigation.getParam('originScreen', 'Achievements');
            if (originScreen !== 'Public') {
                this.props.navigation.dismiss();
            } else {
                this.props.navigation.navigate('MatchWizard');
            }
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <Image style={styles.backgroundImage}
                        source={SignUpControllersBackgroundImage} />
                <View style={styles.container}>
                    <View>
                        <Image source={QaplaSignUpLogo} />
                    </View>
                    <View style={{ width: '100%' }}>
                        <TextInput style={styles.inputText}
                            placeholder={translate('loginWithEmailScreen.emailPlaceholder')}
                            autoCapitalize='none'
                            textContentType='emailAddress'
                            onChangeText={(text) => this.setState({ email: text })}
                            onSubmitEditing={() => this.passwordInput.focus()}
                            returnKeyType='next' />
                        <TextInput style={styles.inputText}
                            placeholder={translate('loginWithEmailScreen.passwordPlaceholder')}
                            autoCapitalize='none'
                            onChangeText={(text) => this.setState({ password: text })}
                            secureTextEntry
                            ref={(passwordInput) => this.passwordInput = passwordInput}
                            onSubmitEditing={this.logInUser} />
                        <QaplaText style={styles.forgotPasswordText}>{translate('loginWithEmailScreen.forgotPassword')}</QaplaText>
                    </View>
                    <View>
                        <TouchableWithoutFeedback onPress={this.logInUser}>
                            <View style={styles.buttonContainer}>
                                <QaplaText style={styles.buttonText}>{translate('loginWithEmailScreen.login')}</QaplaText>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default LoginWithEmailScreen;
