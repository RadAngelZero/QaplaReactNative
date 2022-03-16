import React, { Component } from 'react';
import { Animated, Easing, Image, Keyboard, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import images from '../../../assets/images';
import ProgressDotsIndicator from '../../components/ProgressDotsIndicator/ProgressDotsIndicator';
import QaplaText from '../../components/QaplaText/QaplaText';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import styles from './style';
import appleAuth from '@invertase/react-native-apple-authentication';
import { createAccountWitEmailAndPassword, setupGoogleSignin, signInWithApple, signInWithEmailAndPassword, signInWithGoogle } from '../../services/auth';
import { createUserProfile, getUserNameWithUID, updateUserLoggedStatus, userHaveTwitchId, validateUserName } from '../../services/database';
import LinkTwitchAccountModal from '../../components/LinkTwitchAccountModal/LinkTwitchAccountModal';
import { translate } from '../../utilities/i18';
import QaplaTextInput from '../QaplaTextInput/QaplaTextInput';
import PrivacyModal from '../../components/PrivacyModal/PrivacyModal';
import TermsAndConditionsModal from '../../components/TermsAndConditionsModal/TermsAndConditionsModal';

class AuthHandlerScreen extends Component {
    texts = null;
    screens = null;
    firstButton = null;
    firstButtonBackgroundColor = null;
    secondButton = null;
    secondButtonBackgroundColor = null;
    emailButton = null;

    state = {
        gradientContainerHeight: new Animated.Value(0),
        steps: 0,
        currentStep: -1,
        createAccountIsSelected: true,
        screenIndex: 0,
        showLinkWitTwitchModal: false,
        hideEmailUI: false,
        email: '',
        password: '',
        username: '',
        uid: '',
        showUsernameErrorMessage: false,
        checkingUserName: false,
        keyboardHeight: 0,
        openTermsModal: false,
        openPrivacyModal: false
    };
    componentDidMount() {
        setupGoogleSignin();
        Keyboard.addListener('keyboardDidShow', (e) => {
            // - 96 because we want the back button to still visible and with a margin of 16
            this.setState({ keyboardHeight: e.endCoordinates.height - 96 }, () => {
                Animated.timing(this.state.gradientContainerHeight, {
                    toValue: 1,
                    duration: 400,
                    easing: Easing.cubic,
                    useNativeDriver: false
                }).start();
            });
        });

        Keyboard.addListener('keyboardDidHide', (e) => {
            Animated.timing(this.state.gradientContainerHeight, {
                toValue: 0,
                duration: 400,
                easing: Easing.cubic,
                useNativeDriver: false
            }).start();
        });
    }

    /**
     * Check if the user is new, if it's new create the profile and send the user
     * to ChooseUserNameScreen
     * If isn't just close and back to the previous flow
     */
     succesfullSignIn = async (user) => {
        this.setState({ uid: user.user.uid, email: user.user.email }, async () => {
            if (user.additionalUserInfo.isNewUser) {
                this.setState({ showLinkWitTwitchModal: true });
            } else {
                updateUserLoggedStatus(true, user.user.uid);
                const userHaveTwitchLinked = await userHaveTwitchId(user.user.uid);
                if (!userHaveTwitchLinked) {
                    this.setState({ showLinkWitTwitchModal: true });
                }

                const userName = await getUserNameWithUID(user.user.uid);

                if (!userName) {
                    this.goToCreateUsernameStep();
                } else if (userHaveTwitchLinked) {
                    const onSuccessCallback = this.props.navigation.getParam('onSuccessSignIn', () => {});

                    onSuccessCallback(user.user.uid);
                    return this.props.navigation.navigate(this.props.originScreen);
                }
            }
        });
    }

    handleFirstButtonPress = async () => {
        if (this.state.currentStep === -1) {
            this.goToCreateAccount();
        } else if (this.state.currentStep === 0) {
            this.setState({ hideEmailUI: true }, async () => {
                try {
                    const user = await signInWithApple();
                    await this.succesfullSignIn(user);
                } catch (error) {
                    this.setState({ hideEmailUI: false });
                }
            });
        }
    }

    handleSecondButtonPress = async () => {
        if (this.state.currentStep === -1) {
            this.goToHaveAccount();
        } else if (this.state.currentStep === 0) {
            this.setState({ hideEmailUI: true }, async () => {
                try {
                    const user = await signInWithGoogle();
                    await this.succesfullSignIn(user);
                } catch (error) {
                    this.setState({ hideEmailUI: false });
                }
            });
        } else if (this.state.currentStep === 1) {
            this.authenticateWithEmail();
        } else if (this.state.currentStep === 2) {
            this.handleUsername();
        }
    }

    goToCreateAccount = () => {
        this.setState({ createAccountIsSelected: true, steps: 3 }, () => this.goToNextScreen());
    }

    goToHaveAccount = () => {
        this.setState({ createAccountIsSelected: false }, () => {
            this.goToNextScreen();
        });
    }

    goToNextScreen = () => {
        this.setState({ screenIndex: this.state.screenIndex + 1, currentStep: this.state.currentStep + 1 });
    }

    backToPreviousScreen = () => {
        if (this.state.currentStep === 0) {
            this.setState({ steps: 0 });
        }
        this.setState({ screenIndex: this.state.screenIndex - 1, currentStep: this.state.currentStep - 1 });
    }

    closeAndBackButton = () => {
        if (this.state.currentStep === -1) {
            if (this.props.originScreen !== 'Profile') {
                return this.props.navigation.navigate(this.props.originScreen);
            } else {
                return this.props.navigation.navigate('Achievements');
            }
        } else if (this.state.screenIndex !== -1) {
            this.backToPreviousScreen();
        }
    }

    closeTwitchLinkModal = async () => {
        this.setState({ showLinkWitTwitchModal: false });
        const userName = await getUserNameWithUID(this.state.uid);
        if (!userName) {
            this.goToCreateUsernameStep();
        } else {
            return this.props.navigation.navigate(this.props.originScreen);
        }
    }

    goToEmailAuthenticationScreen = () => {
        this.goToNextScreen();
    }

    authenticateWithEmail = async () => {
        if (this.state.createAccountIsSelected) {
            try {
                const user = await createAccountWitEmailAndPassword(this.state.email, this.state.password);
                this.succesfullSignIn(user);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const user = await signInWithEmailAndPassword(this.state.email, this.state.password);
                this.succesfullSignIn(user);
            } catch (error) {
                console.log(error);
            }
        }
    }

    goToCreateUsernameStep = () => {
        this.texts.goToStep(3);
        this.firstButtonBackgroundColor.goToStep(4);
        this.secondButtonBackgroundColor.goToStep(4);
        this.firstButton.goToStep(4);
        this.secondButton.goToStep(4);
        this.emailButton.stepForward();
        this.setState({ currentStep: 2 });
    }

    handleUsername = () => {
        if (this.state.username !== '' && !this.state.checkingUserName) {
            this.setState({
                checkingUserName: true,
                showUsernameErrorMessage: false }, async () => {
                    if (this.state.username !== '' && await validateUserName(this.state.username)) {
                        await createUserProfile(this.state.uid, this.state.email, this.state.username);

                        return this.props.navigation.navigate(this.props.originScreen);
                    } else {
                        this.setState({
                            showUsernameErrorMessage: true,
                            checkingUserName: false
                        });
                    }
                });
        }
    }

    openTermsModal = () => this.setState({ openTermsModal: true });

    openPrivacyModal = () => this.setState({ openPrivacyModal: true });

    closeTermsAndConditionsModal = () => this.setState({ openTermsModal: false });

    closePrivacyModal = () => this.setState({ openPrivacyModal: false });

    render() {
        let showIOSButton = Platform.OS === 'ios' && appleAuth.isSignUpButtonSupported;
        const translateYGradientContainer = this.state.gradientContainerHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -this.state.keyboardHeight],
        });

        return (
            <SafeAreaView style={styles.sfvContainer}>
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.sfvContainer}>
                <TouchableOpacity onPress={this.closeAndBackButton}>
                        <View style={styles.closeBackIcon}>
                            {this.state.currentStep !== 3 &&
                            <>
                                {this.state.screenIndex !== 0 ?
                                    <images.svg.backIcon />
                                    :
                                    <images.svg.closeIcon />
                                }
                            </>
                            }
                        </View>
                </TouchableOpacity>
                <View style={styles.mainContainer}>
                    <Image source={images.png.qaplaSignupLogo2021.img}
                        style={styles.qaplaLogo} />
                    <Animated.View style={[styles.card, { transform: [{ translateY: translateYGradientContainer }] }]}>
                        <LinearGradient useAngle={true}
                            angle={136}
                            style={styles.card}
                            colors={['#A716EE', '#2C07FA']}>
                            <View style={styles.titleAndDescriptionContainer}>
                                <QaplaText style={styles.title}>
                                    {this.state.currentStep === -1 && translate('authHandlerScreen.textsCarrousel.welcome')}
                                    {this.state.currentStep === 0 &&
                                        (this.state.createAccountIsSelected ?
                                            translate('authHandlerScreen.textsCarrousel.createAccount')
                                            :
                                            translate('authHandlerScreen.textsCarrousel.signIn')
                                        )
                                    }
                                    {this.state.currentStep === 1 &&
                                        (this.state.createAccountIsSelected ?
                                            translate('authHandlerScreen.textsCarrousel.createAccountWithEmail')
                                            :
                                            translate('authHandlerScreen.textsCarrousel.signInWithEmail')
                                        )
                                    }
                                    {this.state.currentStep === 2 &&
                                        translate('authHandlerScreen.textsCarrousel.createUsername')
                                    }
                                </QaplaText>
                                <QaplaText style={styles.description}>
                                    {this.state.currentStep === -1 && translate('authHandlerScreen.textsCarrousel.authOptions')}
                                    {this.state.currentStep === 0 &&
                                        (this.state.createAccountIsSelected ?
                                            translate('authHandlerScreen.textsCarrousel.firstTimeMessage')
                                            :
                                            translate('authHandlerScreen.textsCarrousel.welcomeBackMessage')
                                        )
                                    }
                                </QaplaText>
                                {this.state.currentStep === 1 && !this.state.hideEmailUI &&
                                    <View style={styles.emailFormContainer}>
                                        <QaplaTextInput onChangeText={(email) => this.setState({ email: email.toLowerCase() })}
                                            style={{ backgroundColor: '#0D1022', color: '#00FFDC' }}
                                            placeholderTextColor={'rgba(0, 255, 220, 0.35)'}
                                            value={this.state.email}
                                            keyboardType='email-address'
                                            placeholder='Email' />
                                        <QaplaTextInput onChangeText={(password) => this.setState({ password })}
                                            style={{ marginTop: 24, backgroundColor: '#0D1022' }}
                                            placeholderTextColor={'rgba(0, 255, 220, 0.35)'}
                                            secureTextEntry
                                            value={this.state.password}
                                            placeholder='Password' />
                                    </View>
                                }
                                {this.state.currentStep === 2 &&
                                    <>
                                    <View style={styles.usernameContainer}>
                                        <QaplaTextInput onChangeText={(username) => this.setState({ username })}
                                            value={this.state.username}
                                            placeholder='Username' />
                                    </View>
                                    {this.state.showUsernameErrorMessage &&
                                        <View>
                                            <QaplaText style={styles.errorMessage}>{translate('chooseUserNameScreen.userNameAlreadyTaken')}</QaplaText>
                                        </View>
                                    }
                                    <QaplaText style={styles.termsAndConditionsText}>
                                        {`${translate('chooseUserNameScreen.bodyFirstPart')} `}
                                        <QaplaText style={styles.hyperlinkText} onPress={this.openTermsModal}>
                                            {translate('chooseUserNameScreen.termsAndConditions')}
                                        </QaplaText>
                                        {` ${translate('chooseUserNameScreen.bodySecondPart')} `}
                                        <QaplaText style={styles.hyperlinkText} onPress={this.openPrivacyModal}>
                                            {translate('chooseUserNameScreen.privacyPolicy')}
                                        </QaplaText>
                                    </QaplaText>
                                    <PrivacyModal
                                        open={this.state.openPrivacyModal}
                                        onClose={this.closePrivacyModal} />
                                    <TermsAndConditionsModal
                                        open={this.state.openTermsModal}
                                        onClose={this.closeTermsAndConditionsModal} />
                                    </>
                                }
                            </View>
                            <View style={{  alignItems: 'center' }}>
                                <TouchableOpacity onPress={this.goToEmailAuthenticationScreen} disabled={this.state.currentStep !== 0}>
                                    <View style={[styles.emailButtonContainer, { opacity: this.state.currentStep === 0 ? 1 : 0 }]}>
                                            <QaplaText style={styles.emailButton}>
                                                {this.state.createAccountIsSelected ?
                                                    translate('authHandlerScreen.signUpWithEmail')
                                                    :
                                                    translate('authHandlerScreen.signInWithEmail')
                                                }
                                            </QaplaText>
                                            <images.svg.rightArrow />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginBottom: 24 }} onPress={this.handleFirstButtonPress} disabled={this.props.disabled}>
                                    <View style={[styles.button, { backgroundColor: this.state.currentStep === -1 ? '#00FFDD' : ((showIOSButton && this.state.currentStep < 1) ? '#000000' : 'transparent') }]}
                                        onRef={this.props.onBackgroundRef}>
                                        {this.state.currentStep === -1 &&
                                            <View style={styles.buttonTextContainer}>
                                                <QaplaText style={[styles.buttonText, { color: '#0D1021' }]}>
                                                    {translate('authHandlerScreen.buttonsCarrousel.createAccount')}
                                                </QaplaText>
                                            </View>
                                        }
                                        {this.state.currentStep === 0 &&
                                            <View style={styles.buttonWithIconContainer}>
                                                {showIOSButton &&
                                                    <>
                                                        <images.svg.appleIcon height={32} width={32} style={{ marginRight: 8 }} />
                                                        <QaplaText style={[styles.buttonText, { color: '#FFF' }]}>
                                                            {translate('authHandlerScreen.buttonsCarrousel.continueWithApple')}
                                                        </QaplaText>
                                                    </>
                                                }
                                            </View>
                                        }
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.handleSecondButtonPress} disabled={this.props.disabled}>
                                    <View style={[styles.button, { backgroundColor: this.state.currentStep === -1 ? '#3B4BF9' : (this.state.currentStep === 0 ? '#FFF' : '#00FFDD') }]}
                                        onRef={this.props.onBackgroundRef}>
                                        {this.state.currentStep === -1 &&
                                            <QaplaText style={[styles.buttonText, { color: '#FFF' }]}>
                                                {translate('authHandlerScreen.buttonsCarrousel.alreadyHaveAccount')}
                                            </QaplaText>
                                        }
                                        {this.state.currentStep === 0 &&
                                            <View style={styles.buttonWithIconContainer}>
                                                <images.svg.googleIcon height={32} width={32} style={{ marginRight: 8 }} />
                                                <QaplaText style={[styles.buttonText, { color: '#585858' }]}>
                                                    {translate('authHandlerScreen.buttonsCarrousel.continueWithGoogle')}
                                                </QaplaText>
                                            </View>
                                        }
                                        {this.state.currentStep === 1 &&
                                            <View style={styles.buttonTextContainer}>
                                                {!this.state.hideEmailUI &&
                                                    <QaplaText style={[styles.buttonText, { color: '#0D1021' }]}>
                                                        {translate('authHandlerScreen.buttonsCarrousel.continue')}
                                                    </QaplaText>
                                                }
                                            </View>
                                        }
                                        {this.state.currentStep === 2 &&
                                            <View style={styles.buttonWithIconContainer}>
                                                <QaplaText style={[styles.buttonText, { color: '#0D1021' }]}>
                                                    {this.props.checkingUserName ?
                                                        translate('authHandlerScreen.buttonsCarrousel.validatingUsername')
                                                        :
                                                        translate('authHandlerScreen.buttonsCarrousel.iamReady')
                                                    }
                                                </QaplaText>
                                            </View>
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.dotStepsContainer}>
                                <ProgressDotsIndicator
                                    steps={this.state.steps}
                                    selected={this.state.currentStep}
                                    color={'rgba(0,254,223,0.54)'}
                                    activeColor={'#00FEDF'}
                                    /* We use heightPercentageToPx to achieve circular Views */
                                    width={heightPercentageToPx(1.2)}
                                    activeWidth={heightPercentageToPx(4)}
                                    marginHorizontal={heightPercentageToPx(1)} />
                            </View>
                        </LinearGradient>
                    </Animated.View>
                </View>
                <LinkTwitchAccountModal
                    open={this.state.showLinkWitTwitchModal}
                    onClose={this.closeTwitchLinkModal} />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

function mapDispatchToProps(state) {
    return {
        originScreen: state.screensReducer.previousScreenId
    };
}

export default connect(mapDispatchToProps)(AuthHandlerScreen);
