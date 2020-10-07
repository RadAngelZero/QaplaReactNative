import React, { Component } from 'react';
import { BackHandler, View, Image, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import { auth } from 'react-native-firebase';

import styles from './style';
import Images from './../../../assets/images';
import { signInWithFacebook, setupGoogleSignin, signInWithGoogle } from '../../services/auth';
import { translate } from '../../utilities/i18';
import { updateUserLoggedStatus } from '../../services/database';
import { subscribeUserToAllRegistredTopics } from '../../services/messaging';
import QaplaText from '../../components/QaplaText/QaplaText';
import { database } from '../../utilities/firebase';

const SignUpControllersBackgroundImage = Images.png.signUpControllers.img;
const QaplaSignUpLogo = Images.png.qaplaSignupLogo.img;
const FacebookIcon = Images.svg.facebookIcon;
const GoogleIcon = Images.svg.googleIcon;

class SignInScreen extends Component {
    state = {
        originScreenWhenComponentMounted: 'Achievements'
    };

    componentDidMount() {
        setupGoogleSignin();

        /**
         * When the component is recently mounted (and because we are changing from a stack navigator to the switch navigator)
         * the currentScreen prop contains the Id of the last screen visited befor this one, we save this data on the state
         * so we can know the true origin, and we can handle the logic of the user switching between social media sign in
         * and email login
         */
        this.setState({ originScreenWhenComponentMounted: this.props.currentScreen });
        this.backHandlerListener = BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBackButton);
    }

    componentWillUnmount() {
        this.backHandlerListener.remove();
    }

    /**
     * Check to what screen must be redirected the user if presses the back button (only apply to android)
     */
    handleAndroidBackButton = () => {
        /**
         * If the user are on SignIn screen and comes from profile we navigate to achievements
         */
        if (this.props.currentScreen === 'SignIn' && this.state.originScreenWhenComponentMounted === 'Profile') {
            this.props.navigation.navigate('Achievements');

            return true;
        }

        return false;
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
        if (user.additionalUserInfo.isNewUser) {
            this.props.navigation.navigate('ChooseUserName', {
                originScreen: this.state.originScreenWhenComponentMounted,
                email: user.user.email 
            });
        } else {
            updateUserLoggedStatus(true, user.user.uid);
            subscribeUserToAllRegistredTopics(user.user.uid);
            if (this.props.originScreen !== 'Public') {
                this.props.navigation.dismiss();
            } else {
                this.props.navigation.navigate('MatchWizard');
            }
        }
    }

    navigateToLoginWithEmail = () => {
        this.props.navigation.navigate('LogIn', {
            originScreen: this.state.originScreenWhenComponentMounted
        });
    }

    onAppleButtonPress = async () => {
        try {
            // 1). start a apple sign-in request
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            // 2). if the request was successful, extract the token and nonce
            const { identityToken, nonce } = appleAuthRequestResponse;

            console.log(identityToken, nonce);

            // can be null in some scenarios
            if (identityToken) {

                database.ref('iOSSignInTest').update(appleAuthRequestResponse);

                const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

                const user = await auth().signInWithCredential(appleCredential);

                database.ref('iOSSignInTest').update({ linked: true, uid: user.user.uid});
            // 3). create a Firebase `AppleAuthProvider` credential
            /*const appleCredential = firebase.auth.AppleAuthProvider.credential(identityToken, nonce);

            // 4). use the created `AppleAuthProvider` credential to start a Firebase auth request,
            //     in this example `signInWithCredential` is used, but you could also call `linkWithCredential`
            //     to link the account to an existing user
            const userCredential = await firebase.auth().signInWithCredential(appleCredential);

            // user is now signed in, any Firebase `onAuthStateChanged` listeners you have will trigger
            console.warn(`Firebase authenticated via Apple, UID: ${userCredential.user.uid}`);*/
            } else {
            // handle this - retry?
            }
        } catch (error) {
            database.ref('iOSSignInTest').update({ linked: false, error });
            console.log('Error', error);
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
                    <View>
                        <TouchableWithoutFeedback onPress={this.signInWithFacebook}>
                            <View style={[styles.socialMediaSignInButton, styles.facebookSignInButton]}>
                                <FacebookIcon style={styles.socialMediaIconStyle} />
                                <QaplaText style={[styles.textButton, styles.whiteColor]}>{translate('signInScreen.facebookSignin')}</QaplaText>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.signInWithGoogle}>
                            <View style={[styles.socialMediaSignInButton, styles.googleSignInButton]}>
                                <GoogleIcon style={styles.socialMediaIconStyle} />
                                <QaplaText style={[styles.textButton, styles.googleButtonText]}>{translate('signInScreen.googleSignin')}</QaplaText>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.onAppleButtonPress}>
                            <View style={[styles.socialMediaSignInButton, styles.googleSignInButton]}>
                                <AppleButton
                                    buttonStyle={AppleButton.Style.WHITE}
                                    buttonType={AppleButton.Type.SIGN_IN}
                                    style={styles.appleButton}
                                    onPress={this.onAppleButtonPress} />
                                <QaplaText style={[styles.textButton, styles.googleButtonText]}>Sign in with apple</QaplaText>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.alreadyHaveAccountTextContainer}>
                            <QaplaText style={[styles.whiteColor, styles.alignSelfCenter, styles.fontBold]}>{translate('signInScreen.alreadyHaveAccount')}</QaplaText>
                            <QaplaText style={[styles.enterWithEmailText, styles.alignSelfCenter, styles.fontBold]} onPress={this.navigateToLoginWithEmail}>
                                {translate('signInScreen.emailSignin')}
                            </QaplaText>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

function mapDispatchToProps(state) {
    return {
        originScreen: state.screensReducer.previousScreenId,
        currentScreen: state.screensReducer.currentScreenId
    }
}

export default connect(mapDispatchToProps)(SignInScreen);
