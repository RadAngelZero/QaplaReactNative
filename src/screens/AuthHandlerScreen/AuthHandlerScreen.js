import React, { Component } from 'react';
import { Image, ImageBackground, Keyboard, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import images from '../../../assets/images';
import ProgressDotsIndicator from '../../components/ProgressDotsIndicator/ProgressDotsIndicator';
import QaplaText from '../../components/QaplaText/QaplaText';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import styles from './style';
import appleAuth from '@invertase/react-native-apple-authentication';
import { createAccountWitEmailAndPassword, setupGoogleSignin, signInWithApple, signInWithEmailAndPassword, signInWithGoogle } from '../../services/auth';
import { createUserProfile, getQlanData, getQlanIdWithQreatorCode, getUserNameWithUID, subscribeUserToQlan, updateUserLoggedStatus, userHaveTwitchId, validateUserName } from '../../services/database';
import LinkTwitchAccountModal from '../../components/LinkTwitchAccountModal/LinkTwitchAccountModal';
import { translate } from '../../utilities/i18';
import QaplaTextInput from '../QaplaTextInput/QaplaTextInput';
import PrivacyModal from '../../components/PrivacyModal/PrivacyModal';
import TermsAndConditionsModal from '../../components/TermsAndConditionsModal/TermsAndConditionsModal';

class AuthHandlerScreen extends Component {
    state = {
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
        openTermsModal: false,
        openPrivacyModal: false,
        keyboard: false,
        qlanCode: '',
        streamerUsername: '',
        joiningQlan: false
    };

    componentDidMount() {
        setupGoogleSignin();
        Keyboard.addListener('keyboardDidShow', (e) => {
            this.setState({ keyboard: true });
        });

        Keyboard.addListener('keyboardDidHide', (e) => {
            this.setState({ keyboard: false });
        });
    }

    /**
     * For Google and Apple Auth only
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
                    const onSuccessCallback = this.props.navigation.getParam('onSuccessSignIn', () => { });

                    onSuccessCallback(user.user.uid);
                    return this.props.navigation.navigate(this.props.originScreen);
                }
            }
        });
    }

    handleTwitchSignIn = async (user, isNewUser) => {
        if (isNewUser) {
            await createUserProfile(user.user.uid, user.user.email, user.user.displayName);
        }

        updateUserLoggedStatus(true, user.user.uid);
        const onSuccessCallback = this.props.navigation.getParam('onSuccessSignIn', () => { });
        onSuccessCallback(user.user.uid);

        if (isNewUser) {
            this.setState({ currentStep: 3 });
        } else {
            this.props.navigation.navigate(this.props.originScreen);
        }
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
        switch (this.state.currentStep) {
            case -1:
                this.goToHaveAccount();
                break;
            case 0:
                this.setState({ hideEmailUI: true }, async () => {
                    try {
                        const user = await signInWithGoogle();
                        await this.succesfullSignIn(user);
                    } catch (error) {
                        this.setState({ hideEmailUI: false });
                    }
                });
                break;
            case 1:
                this.authenticateWithEmail();
                break;
            case 2:
                this.handleUsername();
                break;
            case 3:
                this.handleQlan();
                break;
            case 4:
                return this.props.navigation.navigate(this.props.originScreen);
            default:
                break;
        }
    }

    goToCreateAccount = () => {
        this.setState({ createAccountIsSelected: true, steps: 5 }, () => this.goToNextScreen());
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
            if (this.props.originScreen !== 'Profile' && this.props.originScreen !== 'MyStreams') {
                return this.props.navigation.navigate(this.props.originScreen);
            } else {
                return this.props.navigation.navigate('Timeline');
            }
        } else if (this.state.screenIndex !== -1) {
            this.backToPreviousScreen();
        }
    }

    closeTwitchLinkModal = async () => {
        this.setState({ showLinkWitTwitchModal: false });
        if (this.state.uid) {
            const userName = await getUserNameWithUID(this.state.uid);
            if (!userName) {
                this.goToCreateUsernameStep();
            }  else if (this.state.currentStep === 3) {
                this.setState({ joiningQlan: false, disabled: false });
            } else {
                return this.props.navigation.navigate(this.props.originScreen);
            }
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
        this.setState({ currentStep: 2 });
    }

    handleUsername = () => {
        if (this.state.username !== '' && !this.state.checkingUserName) {
            this.setState({
                checkingUserName: true,
                showUsernameErrorMessage: false
            }, async () => {
                if (this.state.username !== '' && await validateUserName(this.state.username)) {
                    await createUserProfile(this.state.uid, this.state.email, this.state.username);

                    this.setState({ currentStep: 3 });
                } else {
                    this.setState({
                        showUsernameErrorMessage: true,
                        checkingUserName: false
                    });
                }
            });
        }
    }

    handleQlan = async () => {
        this.setState({ joiningQlan: true, disabled: true });

        const qlanId = await getQlanIdWithQreatorCode(this.state.qlanCode);
        if (qlanId) {
            if (this.props.twitchId) {
                await subscribeUserToQlan(this.state.uid, qlanId, this.state.username, this.props.twitchUsername);
                const qlanData = await getQlanData(qlanId);

                this.setState({ currentStep: 4, streamerUsername: qlanData.val().name, joiningQlan: false, disabled: false });
            } else {
                this.setState({ showLinkWitTwitchModal: true });
            }
        } else {
            this.setState({ joiningQlan: false, disabled: false });
        }
    }

    finishProcess = () => this.props.navigation.navigate(this.props.originScreen);

    openTermsModal = () => this.setState({ openTermsModal: true });

    openPrivacyModal = () => this.setState({ openPrivacyModal: true });

    closeTermsAndConditionsModal = () => this.setState({ openTermsModal: false });

    closePrivacyModal = () => this.setState({ openPrivacyModal: false });

    render() {
        let showIOSButton = Platform.OS === 'ios' && appleAuth.isSignUpButtonSupported;

        console.log(this.state.currentStep);
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.sfvContainer}>
                    <View style={{ flexDirection: 'column' }}>
                        {this.state.currentStep !== 3 && this.state.currentStep !== 4 &&
                            <TouchableOpacity onPress={this.closeAndBackButton}>
                                <View style={styles.closeBackIcon}>
                                    {this.state.screenIndex !== 0 ?
                                        <images.svg.backIcon />
                                        :
                                        <images.svg.closeIcon />
                                    }
                                </View>
                            </TouchableOpacity>
                        }
                        {this.state.currentStep === 3 &&
                            <TouchableOpacity style={styles.skipButtonContainer} onPress={this.finishProcess}>
                                <Text style={styles.skipButtonText}>{translate('linkTwitchAccount.skip')}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.mainContainer}>
                        {!(this.state.currentStep === 3 || this.state.currentStep === 4) &&
                            <Image source={images.png.qaplaSignupLogo2021.img}
                                style={styles.qaplaLogo} />
                        }
                        {(this.state.currentStep === 3 || this.state.currentStep === 4) && !this.state.keyboard &&
                            <ImageBackground source={images.png.qlanProfile.img}
                                style={styles.qlanImage} >
                                <Text style={styles.qlanImageText}>Qlan</Text>
                            </ImageBackground>
                        }
                        <View style={[styles.card, this.state.keyboard ? { position: 'absolute', top: heightPercentageToPx(-18.47) } : {}]}>
                            <LinearGradient useAngle={true}
                                angle={136}
                                style={styles.card}
                                colors={['#A716EE', '#2C07FA']}>
                                <View style={styles.titleAndDescriptionContainer}>
                                    {this.state.currentStep === 4 &&
                                        <>
                                            <Image source={images.png.checkCircleGlow.img}
                                                style={styles.tickCircleGlow} />
                                            <Text style={styles.modalText}>
                                                {translate('qlan.youJoinedP1')} <Text style={styles.qaplaColor}>{this.state.streamerUsername}</Text>{translate('qlan.youJoinedP2')}
                                            </Text>
                                            <Text style={styles.confirmModalSubtitle}>{translate('qlan.youWillReceive')}</Text>
                                        </>
                                    }
                                    <QaplaText style={[styles.title,
                                    {
                                        marginTop: this.state.currentStep === 3 ?
                                            this.state.keyboard ?
                                                heightPercentageToPx(14.53)
                                                :
                                                heightPercentageToPx(5.17)
                                            :
                                            this.state.keyboard ?
                                                heightPercentageToPx(8.87)
                                                :
                                                0,
                                        marginBottom: this.state.currentStep === 3 ? heightPercentageToPx(-3.45) : 0,
                                    }]}>
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
                                        {this.state.currentStep === 3 &&
                                            translate('authHandlerScreen.textsCarrousel.haveQreatorQode')
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
                                                placeholder='Username'
                                                style={{ textAlign: 'center' }} />
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
                                    {this.state.currentStep === 3 &&
                                        <>
                                        <Text style={styles.qlanSubtitle}>
                                            {/* translation pending */}
                                            {translate('authHandlerScreen.textsCarrousel.getCustomAlerts')}
                                        </Text>
                                        <View style={styles.usernameContainer}>
                                            <QaplaTextInput onChangeText={(qlanCode) => this.setState({ qlanCode })}
                                                value={this.state.qlanCode}
                                                placeholder={'Q-APLITA'}
                                                style={{ textAlign: 'center' }} />
                                        </View>
                                        </>
                                    }
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    {(this.state.currentStep === 0 || this.state.currentStep === -1) &&
                                        <>
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
                                            <TouchableOpacity style={{ marginBottom: 24 }} onPress={this.handleFirstButtonPress} disabled={this.state.currentStep === 0 && !showIOSButton}>
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
                                        </>}
                                    <TouchableOpacity onPress={this.handleSecondButtonPress}
                                        disabled={this.state.disabled}>
                                        <View style={[styles.button, {
                                            backgroundColor: this.state.currentStep === -1 ? '#3B4BF9' : (this.state.currentStep === 0 ? '#FFF' : '#00FFDD'),
                                            marginTop: this.state.currentStep === 3
                                                ?
                                                this.state.keyboard
                                                    ?
                                                    heightPercentageToPx(5.54)
                                                    :
                                                    heightPercentageToPx(-1.72)
                                                :
                                                this.state.currentStep === 4 ?
                                                    heightPercentageToPx(-11)
                                                    :
                                                    this.state.currentStep === 2 ?
                                                        heightPercentageToPx(0.62)
                                                        :
                                                        0,
                                        }]}
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
                                            {this.state.currentStep === 3 &&
                                                <View style={styles.buttonWithIconContainer}>
                                                    <QaplaText style={[styles.buttonText, { color: '#0D1021' }]}>
                                                        {this.state.joiningQlan ?
                                                            translate('authHandlerScreen.buttonsCarrousel.joiningQlan')
                                                            :
                                                            translate('authHandlerScreen.buttonsCarrousel.joinQlan')
                                                        }
                                                    </QaplaText>
                                                </View>
                                            }
                                            {this.state.currentStep === 4 &&
                                                <View style={styles.buttonWithIconContainer}>
                                                    <QaplaText style={[styles.buttonText, { color: '#0D1021' }]}>
                                                        {translate('authHandlerScreen.buttonsCarrousel.goToFirstStream')}
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
                                        width={heightPercentageToPx(0.98)}
                                        activeWidth={widthPercentageToPx(8)}
                                        marginHorizontal={heightPercentageToPx(1)} />
                                </View>
                            </LinearGradient>
                        </View>
                    </View>
                    <LinkTwitchAccountModal
                        open={this.state.showLinkWitTwitchModal}
                        onClose={this.closeTwitchLinkModal}
                        onAuthSuccessful={this.handleTwitchSignIn}
                        onLinkSuccessful={this.handleQlan}
                        linkingWithQreatorCode={Boolean(this.state.qlanCode)} />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

function mapDispatchToProps(state) {
    return {
        originScreen: state.screensReducer.previousScreenId,
        twitchId: state.userReducer.user.twitchId,
        twitchUsername: state.userReducer.user.twitchUsername,
    };
}

export default connect(mapDispatchToProps)(AuthHandlerScreen);
