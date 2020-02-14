// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView

import React, { Component } from 'react';
import { BackHandler, View, Image, Text, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Svg } from 'react-native-svg';

import styles from './style';
import Images from './../../../assets/images';
import { signInWithFacebook, setupGoogleSignin, signInWithGoogle } from '../../services/auth';
import { translate, getLocaleLanguage } from '../../utilities/i18';
import { createUserProfile } from '../../services/database';
import { subscribeUserToTopic } from '../../services/messaging';
import { EVENTS_TOPIC } from '../../utilities/Constants';

const SignUpControllersBackgroundImage = Images.png.signUpControllers.img;
const QaplaSignUpLogo = Images.png.qaplaSignupLogo.img;
const FacebookIcon = Images.svg.facebookIcon;
const GoogleIcon = Images.svg.googleIcon;

class SignInScreen extends Component {
    componentDidMount() {
        setupGoogleSignin();
        this.backHandlerListener = BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBackButton);
    }

    componentWillUnmount() {
        this.backHandlerListener.remove();
    }

    /**
     * Check to what screen must be redirected the user if presses the back button (only apply to android)
     */
    handleAndroidBackButton = () => {
        if (this.props.originScreen === 'Perfil') {
            this.props.navigation.navigate('Logros');
        } else {
            this.props.navigation.navigate(this.props.originScreen);
        }

        return true;
    }

    /**
     * Start a session with facebook
     */
    signInWithFacebook = async () => {
        try {
            const user = await signInWithFacebook();
            this.succesfullSignIn(user);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Start a session with google
     */
    signInWithGoogle = async () => {
        try {
            const user = await signInWithGoogle();
            this.succesfullSignIn(user);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Check if the user is new, if it's new create the profile and send the user
     * to ChooseUserNameScreen
     * If isn't just close and back to the previous flow
     */
    succesfullSignIn = (user) => {
        subscribeUserToTopic(`${EVENTS_TOPIC}_${getLocaleLanguage()}`);
        if (user.additionalUserInfo.isNewUser) {
            createUserProfile(user.user.uid, user.user.email);
            this.props.navigation.navigate('ChooseUserNameScreen');
        } else {
            if (this.props.originScreen === 'Publicas') {
                this.props.navigation.navigate('ChooseMatchType');
            } else {
                this.props.navigation.pop();
            }
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
                            <View style={[styles.socialMediaSignInButton, styles.facebookSignInButton]}>
                                <Svg style={styles.socialMediaIconStyle}>
                                    <FacebookIcon />
                                </Svg>
                                <Text style={[styles.textButton, styles.whiteColor]}>{translate('signInScreen.facebookSignin')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.signInWithGoogle}>
                            <View style={[styles.socialMediaSignInButton, styles.googleSignInButton]}>
                                <Svg style={styles.socialMediaIconStyle}>
                                    <GoogleIcon />
                                </Svg>
                                <Text style={[styles.textButton, styles.googleButtonText]}>{translate('signInScreen.googleSignin')}</Text>
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

function mapDispatchToProps(state) {
    return {
        originScreen: state.screensReducer.previousScreenId
    }
}

export default connect(mapDispatchToProps)(SignInScreen);
