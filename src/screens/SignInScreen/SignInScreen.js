import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import styles from './style';
import Images from './../../../assets/images';
import { signInWithFacebook, setupGoogleSignin, signInWithGoogle } from '../../services/auth';

class SignInScreen extends Component {
    componentDidMount() {
        setupGoogleSignin();
      }
    
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image source={Images.png.instagramIcon.img} />
                </View>
                <View>
                    <TouchableWithoutFeedback onPress={signInWithFacebook}>
                        <View style={styles.facebookButtonContainer}>
                            <Text style={[styles.whiteColor, styles.alignSelfCenter]}>Continuar con Facebook</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={signInWithGoogle}>
                        <View style={styles.googleButtonContainer}>
                            <Text style={[styles.googleButtonText, styles.alignSelfCenter]}>Continuar con Google</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.alreadyHaveAccountTextContainer}>
                        <Text style={[styles.whiteColor, styles.alignSelfCenter]}>¿Ya tienes cuenta?</Text>
                        <Text style={[styles.enterWithEmailText, styles.alignSelfCenter]} onPress={() => this.props.navigation.navigate('Login')}>Ingresa con correo</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default SignInScreen;
