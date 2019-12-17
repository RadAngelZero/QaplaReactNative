// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView
// Diego             - 11-07-2019 - Qapla logo added to the top and Controllers image background created

import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback, TextInput, SafeAreaView } from 'react-native';
import Images from './../../../assets/images';
import styles from './style';
import { signInWithEmailAndPassword } from '../../services/auth';

const SignUpControllersBackgroundImage = Images.png.signUpControllers.img;
const QaplaSignUpLogo = Images.png.qaplaSignupLogo.img;

class LoginWithEmailScreen extends Component {
    state = {
        email: '',
        password: ''
    };

    logInUser = () => signInWithEmailAndPassword(this.state.email, this.state.password, this.props.navigation);

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <View>
                        <Image source={QaplaSignUpLogo} />
                    </View>
                    <View style={{ width: '100%' }}>
                        <TextInput style={styles.inputText}
                            placeholder='Email o Usuario'
                            onChangeText={(text) => this.setState({ email: text })}
                            onSubmitEditing={() => this.passwordInput.focus()}
                            returnKeyType='next' />
                        <TextInput style={styles.inputText}
                            placeholder='Contraseña'
                            onChangeText={(text) => this.setState({ password: text })}
                            secureTextEntry
                            ref={(passwordInput) => this.passwordInput = passwordInput}
                            onSubmitEditing={this.logInUser} />
                        <Text style={styles.forgotPasswordText} >¿Olvidaste tu contraseña?</Text>
                    </View>
                    <View>
                        <TouchableWithoutFeedback onPress={this.logInUser}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText} >INICIAR SESION</Text>
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
