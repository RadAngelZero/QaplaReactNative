// diego             - 17-12-2019 - us171 - TopNavOptions added
// diego             - 17-12-2019 - us172 - Refs added to continue/end the process from text field with the keyboard
// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView
// Diego             - 11-07-2019 - Qapla logo added to the top and Controllers image background created

import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback, TextInput, SafeAreaView } from 'react-native';

import { signInWithEmailAndPassword } from '../../services/auth';
import Images from './../../../assets/images';
import styles from './style';
import TopNavOptions from '../../components/TopNavOptions/TopNavOptions';
import { translate } from '../../utilities/i18';

const SignUpControllersBackgroundImage = Images.png.signUpControllers.img;
const QaplaSignUpLogo = Images.png.qaplaSignupLogo.img;

class LoginWithEmailScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: () =>
            <TopNavOptions
                navigation={navigation}
                back />
    });

    state = {
        email: '',
        password: ''
    };

    /**
     * Try SignIn the user using the email and password values from the state
     */
    logInUser = async () => {
        try {
            await signInWithEmailAndPassword(this.state.email, this.state.password);
            this.props.navigation.popToTop();
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <View>
                        <Image source={QaplaSignUpLogo} />
                    </View>
                    <View style={{ width: '100%' }}>
                        <TextInput style={styles.inputText}
                            placeholder={translate('loginWithEmailScreen.emailPlaceholder')}
                            autoCapitalize='none'
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
                        <Text style={styles.forgotPasswordText}>{translate('loginWithEmailScreen.forgotPassword')}</Text>
                    </View>
                    <View>
                        <TouchableWithoutFeedback onPress={this.logInUser}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>{translate('loginWithEmailScreen.login')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Image style={styles.backgroundImage}
                        source={SignUpControllersBackgroundImage} />
                </View>
            </SafeAreaView>
        );
    }
}

export default LoginWithEmailScreen;
