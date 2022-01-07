import React, { Component } from 'react';
import { Animated, Easing, Image, Keyboard, Platform, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import images from '../../../assets/images';
import ProgressDotsIndicator from '../../components/ProgressDotsIndicator/ProgressDotsIndicator';
import QaplaText from '../../components/QaplaText/QaplaText';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import styles from './style';
import TranslateXContainer from './TranslateXContainer';
import TextsCarrousel from './TextsCarrousel';
import ButtonsCarrousel from './ButtonsCarrousel';
import appleAuth from '@invertase/react-native-apple-authentication';
import { createAccountWitEmailAndPassword, setupGoogleSignin, signInWithApple, signInWithEmailAndPassword, signInWithGoogle } from '../../services/auth';
import { createUserProfile, getUserNameWithUID, updateUserLoggedStatus, userHaveTwitchId, validateUserName } from '../../services/database';
import LinkTwitchAccountModal from '../../components/LinkTwitchAccountModal/LinkTwitchAccountModal';
import { translate } from '../../utilities/i18';

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
        keyboardHeight: 0
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
        this.firstButtonBackgroundColor.stepForward();
        this.secondButtonBackgroundColor.stepForward();
        this.firstButton.stepForward(() => {
            this.setState({ screenIndex: this.state.screenIndex + 1, currentStep: this.state.currentStep + 1 });
        });
        this.secondButton.stepForward();
        this.texts.stepForward();
        this.emailButton.stepForward();
    }

    backToPreviousScreen = () => {
        this.firstButtonBackgroundColor.stepBack();
        this.secondButtonBackgroundColor.stepBack();
        this.firstButton.stepBack();
        this.secondButton.stepBack();
        this.texts.stepBack();
        this.emailButton.stepBack();
        if (this.state.currentStep === 0) {
            this.setState({ steps: 0 });
        }
        this.setState({ screenIndex: this.state.screenIndex - 1, currentStep: this.state.currentStep - 1 });
    }

    closeAndBackButton = () => {
        if (this.state.currentStep === -1) {
            return this.props.navigation.navigate('Achievements');
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

    render() {
        let showIOSButton = Platform.OS === 'ios' && appleAuth.isSignUpButtonSupported;
        const translateYGradientContainer = this.state.gradientContainerHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -this.state.keyboardHeight],
        });

        return (
            <ScrollView keyboardShouldPersistTaps='handled' style={styles.sfvContainer} scrollEnabled={false}>
                <SafeAreaView>
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
                        <Animated.View style={{ transform: [{ translateY: translateYGradientContainer }] }}>
                            <LinearGradient useAngle={true}
                                angle={136}
                                style={styles.card}
                                colors={['#A716EE', '#2C07FA']}>
                                <TextsCarrousel textOnRef={(ref) => this.texts = ref}
                                    showCreateAccountScreen={this.state.createAccountIsSelected}
                                    onEmailChange={(email) => this.setState({ email: email.toLowerCase() })}
                                    email={this.state.email}
                                    onPasswordChange={(password) => this.setState({ password })}
                                    password={this.state.password}
                                    onUsernameChange={(username) => this.setState({ username })}
                                    username={this.state.username}
                                    hideEmailUI={this.state.hideEmailUI}
                                    showUsernameErrorMessage={this.state.showUsernameErrorMessage}
                                    toggleAgreementTermsState={this.toggleAgreementTermsState}
                                    agreementTermsState={this.state.agreementTermsState}
                                    toggleAgreementPrivacyState={this.toggleAgreementPrivacyState}
                                    agreementPrivacyState={this.state.agreementPrivacyState}
                                    checkingUserName={this.state.checkingUserName} />
                                <TranslateXContainer onRef={(ref) => this.emailButton = ref}
                                    individualComponentWidth={widthPercentageToPx(100)}>
                                    <View style={styles.emailButtonContainer} />
                                    <TouchableOpacity onPress={this.goToEmailAuthenticationScreen}>
                                        <View style={styles.emailButtonContainer}>
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
                                    <View style={styles.emailButtonContainer} />
                                </TranslateXContainer>
                                <ButtonsCarrousel onFirstButtonPress={this.handleFirstButtonPress}
                                    onSecondButtonPress={this.handleSecondButtonPress}
                                    onFirstButtonBackgroundRef={(ref) => this.firstButtonBackgroundColor = ref}
                                    onFirstTextRef={(ref) => this.firstButton = ref}
                                    onSecondButtonBackgroundRef={(ref) => this.secondButtonBackgroundColor = ref}
                                    onSecondTextRef={(ref) => this.secondButton = ref}
                                    firstButtonBackgroundColors={['#00FFDD', showIOSButton ? '#000000' : 'transparent', 'transparent', 'transparent', 'transparent']}
                                    secondButtonBackgroundColors={['#3B4BF9', '#FFF', '#00FFDD', '#00FFDD', '#00FFDD']}
                                    currentStep={this.state.currentStep}
                                    showFirstButtonAsSignOption={showIOSButton}
                                    hideEmailUI={this.state.hideEmailUI}
                                    checkingUserName={this.state.checkingUserName} />
                                <View style={styles.dotStepsContainer}>
                                    {this.state.steps > 0 &&
                                        <ProgressDotsIndicator
                                            steps={this.state.steps}
                                            selected={this.state.currentStep}
                                            color={'rgba(0,254,223,0.54)'}
                                            activeColor={'#00FEDF'}
                                            /* We use heightPercentageToPx to achieve circular Views */
                                            width={heightPercentageToPx(1.2)}
                                            activeWidth={heightPercentageToPx(4)}
                                            marginHorizontal={heightPercentageToPx(1)} />
                                    }
                                    </View>
                            </LinearGradient>
                        </Animated.View>
                    </View>
                    <LinkTwitchAccountModal
                        open={this.state.showLinkWitTwitchModal}
                        onClose={this.closeTwitchLinkModal} />
                </SafeAreaView>
            </ScrollView>
        );
    }
}

function mapDispatchToProps(state) {
    return {
        originScreen: state.screensReducer.previousScreenId
    };
}

export default connect(mapDispatchToProps)(AuthHandlerScreen);
