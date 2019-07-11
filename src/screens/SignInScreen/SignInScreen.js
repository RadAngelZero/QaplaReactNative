import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import styles from './style';
import Images from './../../../assets/images';
import { signInWithFacebook, setupGoogleSignin, signInWithGoogle } from '../../services/auth';

const SignUpControllersBackgroundImage = Images.png.signUpControllers.img;
const QaplaSignUpLogo = Images.png.qaplaSignupLogo.img;

class SignInScreen extends Component {
    componentDidMount() {
        setupGoogleSignin();
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image source={QaplaSignUpLogo} />
                </View>
                <View>
                    <TouchableWithoutFeedback onPress={() => signInWithFacebook(this.props.navigation)}>
                        <View style={styles.facebookButtonContainer}>
                            <Text style={[styles.whiteColor, styles.alignSelfCenter]}>Continuar con Facebook</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => signInWithGoogle(this.props.navigation)}>
                        <View style={styles.googleButtonContainer}>
                            <Text style={[styles.googleButtonText, styles.alignSelfCenter]}>Continuar con Google</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.alreadyHaveAccountTextContainer}>
                        <Text style={[styles.whiteColor, styles.alignSelfCenter, styles.fontBold]}>¿Ya tienes cuenta?</Text>
                        <Text style={[styles.enterWithEmailText, styles.alignSelfCenter, styles.fontBold]} onPress={() => this.props.navigation.navigate('Login')}>Ingresa con correo</Text>
                    </View>
                </View>
                <Image style={styles.backgroundImage}
                    source={SignUpControllersBackgroundImage} />
            </View>
        );
    }
}

export default SignInScreen;
