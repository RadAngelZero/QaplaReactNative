// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView

import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback, SafeAreaView } from 'react-native';

import styles from './style';
import Images from './../../../assets/images';
import { signInWithFacebook, setupGoogleSignin, signInWithGoogle, signOut } from '../../services/auth';
import { translate } from '../../utilities/i18';
import { createUserProfile } from '../../services/database';

const SignUpControllersBackgroundImage = Images.png.signUpControllers.img;
const QaplaSignUpLogo = Images.png.qaplaSignupLogo.img;

class SignInScreen extends Component {
    componentDidMount() {
        setupGoogleSignin();
    }

    signInWithFacebook = async () => {
        try {
            const user = await signInWithFacebook();
            this.succesfullSignIn(user);
        } catch (error) {
            console.error(error);
        }
    }

    signInWithGoogle = async () => {
        try {
            const user = await signInWithGoogle();
            this.succesfullSignIn(user);
        } catch (error) {
            console.error(error);
        }
    }

    succesfullSignIn = (user) => {
        if (user.additionalUserInfo.isNewUser) {
            createUserProfile(user.user.uid, user.user.email);
            this.props.navigation.navigate('ChooseUserNameScreen');
        } else {
            this.props.navigation.pop();
        }
    }


    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <View>
                        <Image source={QaplaSignUpLogo} />
                    </View>
                    <View>
                        <TouchableWithoutFeedback onPress={this.signInWithFacebook}>
                            <View style={styles.facebookButtonContainer}>
                                <Text style={[styles.whiteColor, styles.alignSelfCenter]}>{translate('signInScreen.facebookSignin')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.signInWithGoogle}>
                            <View style={styles.googleButtonContainer}>
                                <Text style={[styles.googleButtonText, styles.alignSelfCenter]}>{translate('signInScreen.googleSignin')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.alreadyHaveAccountTextContainer}>
                            <Text style={[styles.whiteColor, styles.alignSelfCenter, styles.fontBold]}>{translate('signInScreen.alreadyHaveAccount')}</Text>
                            <Text style={[styles.enterWithEmailText, styles.alignSelfCenter, styles.fontBold]} onPress={() => this.props.navigation.navigate('Login')}>
                                {translate('signInScreen.emailSignin')}
                            </Text>
                        </View>
                    </View>
                    <Image style={styles.backgroundImage}
                        source={SignUpControllersBackgroundImage} />
                </View>
            </SafeAreaView>
        );
    }
}

export default SignInScreen;
