import React, { Component } from 'react';
import { BackHandler, View, Image, SafeAreaView, Platform, Modal, Text, TouchableOpacity, Dimensions, TextInput, Keyboard, Animated, Easing, LayoutAnimation } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, paddingTopForAndroidDevicesWithNotch, getScreenSizeMultiplier, getScreenWidth } from '../../utilities/iosAndroidDim';
import { connect } from 'react-redux';
import { appleAuth } from '@invertase/react-native-apple-authentication';

import LinearGradient from 'react-native-linear-gradient';

import Colors from '../../utilities/Colors';
import styles from './style';
import Images from '../../../assets/images';
import { signInWithFacebook, setupGoogleSignin, signInWithGoogle, signInWithApple } from '../../services/auth';
import { translate } from '../../utilities/i18';
import { updateUserLoggedStatus } from '../../services/database';
import { subscribeUserToAllRegistredTopics } from '../../services/messaging';
import QaplaText from '../../components/QaplaText/QaplaText';
import QaplaIcon from '../../components/QaplaIcon/QaplaIcon';
import ProgressDotsIndicator from '../../components/ProgressDotsIndicator/ProgressDotsIndicator';
import { render } from 'enzyme';

const QaplaSignUpLogo2021 = Images.png.qaplaSignupLogo2021.img;
const AwesomeHand = Images.png.awesomeHand.img;
const FacebookIcon = Images.svg.facebookIcon;
const GoogleIcon = Images.svg.googleIcon;
const AppleIcon = Images.svg.appleIcon;
const TwitchIcon = Images.svg.twitchIcon;
const LeftArrowThiccIcon = Images.svg.leftArrowThiccIcon;
const CloseThiccIcon = Images.svg.closeThiccIcon
const TwitchExtrudedLogo = Images.svg.twitchExtrudedLogo;
const AlertIcon = Images.svg.alertIcon;


const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const DismissKeyboardTouch = (props) => {
    return (
        <TouchableOpacity style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}
            onPress={props.onPress} />
    );
};

class SignUpLoginHandlerScreen extends Component {
    state = {
        originScreenWhenComponentMounted: 'Achievements',
        steps: 3,
        step: 0,
        actualScreen: 'loginRegister',
        screen: 'init',
        keyboardIsActive: false,
        username: '',
        streamer: '',

        closeBackButtonIconPosition: new Animated.Value(0),
        closeBackButtonIconWidth: new Animated.Value(40),
        closeBackButtonIconOpacity: new Animated.Value(1),
        closeBackButtonIconMarginLeft: new Animated.Value(0),
        closeBackButtonIconPositionAnimationDuration: 250,

        button1HexColorController: new Animated.Value(0),

        linearGradientColor1: '#A716EE',

        button1Color: Colors.greenQapla,
        button2Color: '#3b4bf9',
    };

    titles = {
        init: '¡Bienvenido!',
        signUp: 'Crea tu cuenta',
        logIn: 'Inicia sesión',
        twitchLink: 'Vincula tu cuenta',
        twitchWarning: 'Importante',
        createUsername: 'Crea tu nombre de usuario',
    }
    subtitles = {
        twitchLink: '¡Tu progreso en tiempo real!',
        twitchWarning: 'Te recordamos que las cuentas no vinculadas con Twitch no podrán recibir sus canjes del canal 😭 ',
    }
    bodies = {
        init: 'Crea una cuenta o inicia sesión para unirte a los streams 🥳',
        signUp: 'Descubre tu primer stream ¡ahora!\n',
        logIn: '¡Bienvenido de vuelta! Te extrañamos 😎\n',
        twitchLink: 'Recibe tus Qoins y XQ automáticamente al canjear puntos del canal de tu streamer.',
        twitchWarning: 'Pero no te preocupes, siempre puedes vincular tu cuenta desde tu perfil 😉',
    }

    gradientColors = {
        normalA: '#A716EE',
        normalB: '#2C07FA',
        warningA: '#FA8A07',
        warningB: '#EE1661',
        registered: '#202560',
    }

    buttonsColors = {
        signUp: Colors.greenQapla,
        logIn: '#3b4bf9',
        apple: '#000000',
        google: '#FFFFFF',
        twitch: '#9146FF',
    }

    componentDidMount() {
        setupGoogleSignin();

        /**
         * When the component is recently mounted (and because we are changing from a stack navigator to the switch navigator)
         * the currentScreen prop contains the Id of the last screen visited befor this one, we save this data on the state
         * so we can know the true origin, and we can handle the logic of the user switching between social media sign in
         * and email login
         */
        // this.setState({ screen: 'init' });
        this.setState({ originScreenWhenComponentMounted: this.props.currentScreen, streamer: this.props.navigation.state.params ? this.props.navigation.state.params.streamer : '' });
        this.backHandlerListener = BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBackButton);
        this.keyboardShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);

    }

    componentWillUnmount() {
        this.backHandlerListener.remove();
        this.keyboardShowListener.remove();
        this.keyboardHideListener.remove();
    }

    keyboardDidShow = () => {
        this.setState({ keyboardIsActive: true });
        console.log('show');
    }

    keyboardDidHide = () => {
        this.setState({ keyboardIsActive: false });
        console.log('hide');
        this.usernameInput.blur();
    }

    /**
     * Check to what screen must be redirected the user if presses the back button (only apply to android)
     */
    handleAndroidBackButton = () => {
        if (this.state.screen === 'signUp' || this.state.screen === 'logIn') {
            Animated.timing(this.state.closeBackButtonIconPosition, {
                toValue: 0,
                duration: this.state.closeBackButtonIconPositionAnimationDuration,
                easing: Easing.cubic,
                useNativeDriver: false,
            }).start();
            Animated.timing(this.state.button1HexColorController, {
                toValue: 0,
                duration: 400,
                easing: Easing.cubic,
                useNativeDriver: false,
            }).start();
            this.setState({ screen: 'init' });
            return true;
        }
        if (this.state.screen === 'createUsername') return true;
        if (this.state.screen === 'twitchLink') return true;
        if (this.state.screen === 'twitchWarning') {
            this.setState({ screen: 'twitchLink' });
            return true;
        }
        if (this.state.screen === 'createUsername') {
            this.setState({ screen: 'twitchWarning' });
            return true;
        }
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
                email: user.user.email,
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
            originScreen: this.state.originScreenWhenComponentMounted,
        });
    }

    onAppleButtonPress = async () => {
        try {
            const user = await signInWithApple();
            this.succesfullSignIn(user);
        } catch (error) {
            console.log('Error', error);
        }
    }

    closeBackButtonHandler = () => {
        if (this.state.screen === 'init') return this.props.navigation.navigate(this.state.originScreenWhenComponentMounted);
        if (this.state.screen === 'signUp' || this.state.screen === 'logIn') {
            Animated.timing(this.state.closeBackButtonIconPosition, {
                toValue: 0,
                duration: this.state.closeBackButtonIconPositionAnimationDuration,
                easing: Easing.cubic,
                useNativeDriver: false,
            }).start();
            Animated.timing(this.state.button1HexColorController, {
                toValue: 0,
                duration: 400,
                easing: Easing.cubic,
                useNativeDriver: false,
            }).start();
            return this.setState({ screen: 'init' });
        }
        if (this.state.screen === 'twitchWarning') return this.setState({ screen: 'twitchLink' });
    }

    succesfulRegistrationPharase = () => {
        if (this.state.streamer) {
            // add code to translation and replace word
            let text = `Ya estás participando en el stream de ${this.state.streamer} 💫💥. Llega a tiempo al stream para hacer tus canjes ;)`;
            let newTxt = text.split(' ');

            return <Text>{newTxt.map(text => {
                if (text.includes(this.state.streamer)) {
                    return <Text style={styles.aquaQaplaTextColor}>{text} </Text>;
                }
                return `${text} `;
            })}</Text>;

        }
        return 'Ya tienes una cuenta en Qapla, que te parece si vamos a ver los streams disponibles';
    }

    login = () => {
        // this.changeColorToAuth();
        Animated.timing(this.state.closeBackButtonIconPosition, {
            toValue: 1,
            duration: this.state.closeBackButtonIconPositionAnimationDuration,
            easing: Easing.cubic,
            useNativeDriver: false,
        }).start();
        Animated.timing(this.state.button1HexColorController, {
            toValue: 1,
            duration: 400,
            easing: Easing.cubic,
            useNativeDriver: false,
        }).start();
        this.setState({ screen: 'logIn' });
    }

    createAccount = () => {
        // this.changeColorToAuth();
        Animated.timing(this.state.closeBackButtonIconPosition, {
            toValue: 1,
            duration: this.state.closeBackButtonIconPositionAnimationDuration,
            easing: Easing.cubic,
            useNativeDriver: false,
        }).start();
        Animated.timing(this.state.button1HexColorController, {
            toValue: 1,
            duration: 400,
            easing: Easing.cubic,
            useNativeDriver: false,
        }).start();
        this.setState({ screen: 'signUp' });
    }

    appleButton = () => {
        //add code to auth with Apple
        //add conditional if authenticated
        if (true) {
            console.log('fade apple');
            Animated.timing(this.state.closeBackButtonIconOpacity, {
                toValue: 0,
                duration: 200,
                easing: Easing.cubic,
                useNativeDriver: false,

            }).start();
            return this.setState({ screen: 'createUsername' });
        }
    }

    googleButton = () => {
        //add code to auth with Google
        //add conditional if authenticated
        if (true) {
            console.log('fade google');

            Animated.timing(this.state.closeBackButtonIconOpacity, {
                toValue: 0,
                duration: 200,
                easing: Easing.cubic,
                useNativeDriver: false,
            }).start();
            return this.setState({ screen: 'createUsername' });
        }
    }

    twitchLink = () => {
        //add code to auth with Twitch
        //add conditional if authenticated
        if (true) return this.setState({ screen: 'signUpLogInComplete' });
    }

    submitUsername = () => {
        //add code to register username
        if (true) {
            console.log('fade username');
            Animated.sequence([
                Animated.timing(this.state.closeBackButtonIconOpacity, {
                    toValue: 1,
                    duration: 400,
                    easing: Easing.cubic,
                    useNativeDriver: false,
                }),
                Animated.parallel([
                    Animated.timing(this.state.closeBackButtonIconWidth, {
                        toValue: 88,
                        duration: 400,
                        easing: Easing.cubic,
                        useNativeDriver: false,
                    }),
                    Animated.timing(this.state.closeBackButtonIconPosition, {
                        toValue: 2,
                        duration: 400,
                        easing: Easing.cubic,
                        useNativeDriver: false,
                    }),
                    Animated.timing(this.state.closeBackButtonIconMarginLeft, {
                        toValue: 1,
                        duration: 400,
                        easing: Easing.cubic,
                        useNativeDriver: false,
                    }),
                ]),
            ]).start();


            return this.setState({ screen: 'twitchLink' });
        }
    }

    skipTwitchLink = () => {
        this.changeGradientToWarning();
        this.setState({ screen: 'twitchWarning' });
    }

    noLinkTwitch = () => {
        this.setState({ screen: 'signUpLogInComplete' });
    }

    returnToStreams = () => {
        this.props.navigation.navigate('Achievements');
    }

    dismissKeyboardHandler = () => {
        console.log('dismiss keyboar');
        Keyboard.dismiss();
    }

    calculateHexColor = (actualColor, initialColor, newColor, stepsToDo) => {
        const intActualColor = parseInt(actualColor.substr(1), 16);
        const intInitialColor = parseInt(initialColor.substr(1), 16);
        const intNewColor = parseInt(newColor.substr(1), 16);
        let newIntColor = 2;
        const colorsDistance = Math.abs(intInitialColor - intNewColor);
        let stepCalculation = colorsDistance / stepsToDo;
        if (colorsDistance < stepCalculation) {
            stepCalculation = colorsDistance;
        }
        if (intInitialColor < intNewColor) {
            newIntColor = (intActualColor + parseInt(stepCalculation.toFixed(0), 10)).toString(16);
        } else {
            newIntColor = (intActualColor - parseInt(stepCalculation.toFixed(0), 10)).toString(16);
        }
        if (colorsDistance <= stepCalculation) {
            newIntColor = (intActualColor + colorsDistance).toString(16);
        }
        return `#${'0'.repeat(6 - newIntColor.length)}${newIntColor}`;
    }

    changeGradientToWarning = () => {
        let intervalGradient = setInterval(() => {
            console.log('interval');
            console.log(parseInt(this.state.linearGradientColor1.substr(1), 16));
            console.log(parseInt(this.gradientColors.warningA.substr(1), 16));
        if (parseInt(this.state.linearGradientColor1.substr(1), 16) >= parseInt(this.gradientColors.warningA.substr(1), 16)) {
            return clearInterval(intervalGradient);
        }

        this.setState({ linearGradientColor1: this.calculateHexColor(this.state.linearGradientColor1, this.gradientColors.normalA, this.gradientColors.warningA, 100) });

    }, 10);
    // this.calculateHexColor(this.state.linearGradientColor1, this.gradientColors.normalA, this.gradientColors.warningA, 100)
}

render() {
    return (
        <SafeAreaView style={[styles.sfvContainer, styles.darkQaplaBGColor]}>
            <View style={[styles.qaplaLogoView, {
                top: (this.state.screen.includes('twitch') || this.state.screen === 'signUpLogInComplete') ? '10%' : this.state.keyboardIsActive ? '12%' : '8.6%',
                height: this.state.keyboardIsActive ? '12.6%' : '8.8%',
            }]}>
                <Image source={QaplaSignUpLogo2021}
                    style={{
                        resizeMode: 'center',
                        alignSelf: 'flex-start',
                        width: '100%',
                        height: '100%',
                    }} />
            </View>
            {this.state.screen === 'createUsername' && <DismissKeyboardTouch onPress={this.dismissKeyboardHandler} />}
            {this.state.screen !== 'signUpLogInComplete' &&
                <AnimatedTouchableOpacity
                    disabled={this.state.screen === 'createUsername'}
                    style={{
                        width: this.state.closeBackButtonIconWidth.interpolate({ inputRange: [40, 88], outputRange: [getScreenSizeMultiplier() * 40, getScreenSizeMultiplier() * 88] }),
                        height: getScreenSizeMultiplier() * 40,
                        marginLeft: this.state.closeBackButtonIconMarginLeft.interpolate({ inputRange: [0, 1], outputRange: [getScreenWidth() * 0.055, getScreenWidth() * 0.71] }),
                        marginTop: '7%',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        overflow: 'hidden',
                        alignSelf: 'flex-start',
                    }}
                    onPress={this.state.screen === 'twitchLink' ? this.skipTwitchLink : this.closeBackButtonHandler} >
                    <Animated.View style={{
                        opacity: this.state.closeBackButtonIconOpacity,
                        backgroundColor: '#262b6a',
                        borderRadius: 100,
                        width: this.state.closeBackButtonIconWidth.interpolate({ inputRange: [40, 88], outputRange: [getScreenSizeMultiplier() * 40, getScreenSizeMultiplier() * 88] }),
                        height: getScreenSizeMultiplier() * 40,
                        justifyContent: 'flex-start',
                    }}>
                        <Animated.View style={{
                            flexDirection: 'row',
                            marginTop: '-5%',
                            marginLeft: '-5%',
                            transform: [{ translateX: this.state.closeBackButtonIconPosition.interpolate({ inputRange: [0, 1, 2], outputRange: [0, getScreenWidth() * -0.122, getScreenWidth() * -0.315] }) }],
                        }}>
                            <View style={{ marginLeft: '-2.3%', marginTop: '3%' }}>
                                <CloseThiccIcon />
                            </View>
                            <View style={{ marginLeft: '-2%', marginTop: '3%' }}>
                                <LeftArrowThiccIcon />
                            </View>
                            <Text style={{
                                color: 'rgba(255, 255, 255, 0.65)',
                                fontSize: getScreenSizeMultiplier() * 17,
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                lineHeight: getScreenSizeMultiplier() * 22,
                                letterSpacing: getScreenSizeMultiplier() * 0.49,
                                textAlignVertical: 'center',
                                marginLeft: '10%',
                                width: '150%',
                            }}>Omitir</Text>
                        </Animated.View>
                    </Animated.View>
                </AnimatedTouchableOpacity>}
            <View
                style={[styles.registroInicioSesionView, { marginTop: this.state.screen === 'createUsername' ? '21.8%' : (this.state.screen.includes('twitch') ? '-8.3%' : this.state.screen === 'signUpLogInComplete' ? '8.4%' : '21.8%') }]}>
                <View
                    pointerEvents="box-none"
                    style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        marginTop: '13%',
                    }}>
                    <LinearGradient
                        start={{
                            x: 0.03,
                            y: 0.08,
                        }}
                        end={{
                            x: 0.95,
                            y: 0.94,
                        }}
                        locations={[0, 1]}
                        colors={[this.state.linearGradientColor1, this.gradientColors.normalB]}
                        style={styles.modalBgViewLinearGradient}>
                        <View
                            style={styles.modalBgView} />
                    </LinearGradient>
                    {this.state.screen === 'createUsername' && <DismissKeyboardTouch onPress={this.dismissKeyboardHandler} />}
                    <View
                        pointerEvents="box-none"
                        style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            width: '100%',
                            top: this.state.screen.includes('twitch') ? '10%' : '15%',
                            bottom: '8%',
                            alignItems: 'center',
                        }}>
                        {this.state.screen.includes('twitch') ?
                            // Twitch screens
                            <View style={{ height: '100%', width: '100%', marginLeft: '20%' }}>
                                <View style={{ height: '10%', width: '50%', alignSelf: 'flex-start' }}>
                                    <TwitchExtrudedLogo />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <View style={{ marginTop: '20.6%', flexDirection: 'row' }}>

                                        {this.state.screen === 'twitchWarning' && <View style={{ marginRight: '2%' }}><AlertIcon /></View>}
                                        <Text style={{
                                            color: 'white',
                                            fontSize: getScreenSizeMultiplier() * 30,
                                            fontStyle: 'normal',
                                            fontWeight: 'bold',
                                            lineHeight: getScreenSizeMultiplier() * 30,

                                        }}>{this.titles[this.state.screen]}</Text>
                                    </View>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: getScreenSizeMultiplier() * 22,
                                        fontStyle: 'normal',
                                        fontWeight: 'normal',
                                        lineHeight: getScreenSizeMultiplier() * 26,
                                        marginTop: '9.5%',
                                    }}>{this.subtitles[this.state.screen]}</Text>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: getScreenSizeMultiplier() * (this.state.screen === 'twitchWarning' ? 18 : 22),
                                        fontStyle: 'normal',
                                        fontWeight: 'normal',
                                        lineHeight: getScreenSizeMultiplier() * (this.state.screen === 'twitchWarning' ? 24 : 26),
                                        marginTop: '9.5%',
                                    }}>{this.bodies[this.state.screen]}</Text>
                                </View>
                                <TouchableOpacity
                                    style={[styles.buttonsShape, this.state.screen === 'twitchWarning' ? styles.transparentWhiteBGColor : styles.twitchBGColor, { marginTop: this.state.screen === 'twitchWarning' ? '14%' : '26.6%', marginLeft: this.state.screen === 'twitchWarning' ? '5%' : '0%', height: '12.8%' }]}
                                    onPress={this.state.screen === 'twitchWarning' ? this.noLinkTwitch : this.twitchLink}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        {this.state.screen === 'twitchWarning' ?
                                            <View style={{}}>
                                                <Text
                                                    style={[styles.loginRegisterButtonsText, styles.whiteTextColor, { fontSize: getScreenSizeMultiplier() * 14 }]}>Deseo continuar</Text>
                                            </View>
                                            :
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: '-10%', width: '100%' }}>
                                                <View style={{ height: '100%', width: '10%', marginLeft: '-5%', transform: [{ scale: 1.7 }] }}>
                                                    <TwitchIcon />
                                                </View>
                                                <View style={{ marginLeft: '7%' }}>
                                                    <Text
                                                        style={[styles.loginRegisterButtonsText, styles.whiteTextColor, { fontSize: getScreenSizeMultiplier() * 14 }]}>Vincular con Twitch</Text>
                                                </View>
                                            </View>
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                            //End of Twitch screens
                            :
                            this.state.screen === 'signUpLogInComplete' ?
                                // Successful register screen
                                <View style={{ height: '100%', width: '100%', top: '-37%', alignItems: 'center' }}>
                                    <View style={{ height: '50%', width: '50%' }}>
                                        <Image
                                            source={AwesomeHand}
                                            style={{ resizeMode: 'contain', height: '100%', width: '100%' }}
                                        />
                                    </View>
                                    <View style={{ alignItems: 'center', width: '90%', marginTop: '16%' }}>
                                        <Text style={[styles.titleText, {}]}>¡Genial!</Text>
                                        <Text style={[styles.bodyText, {
                                            fontSize: getScreenSizeMultiplier() * 17,
                                            textAlign: 'center',
                                            lineHeight: getScreenSizeMultiplier() * 22,
                                            marginTop: '2%'
                                        }]}>{this.succesfulRegistrationPharase()}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={[styles.buttonsShape, styles.buttonSignUpBGColor, { height: '13.7%', marginTop: '40%' }]}
                                        onPress={this.returnToStreams}
                                    >
                                        <Text style={[styles.loginRegisterButtonsText, styles.darkQaplaTextColor]}>Volver a los streams</Text>
                                    </TouchableOpacity>
                                </View>
                                //End of Successful register screen
                                :
                                //Sign Up/Log In with Apple/Google Screens and Create Username
                                <View style={{ flex: 1, height: '100%', width: '100%', alignItems: 'center', marginTop: this.state.keyboardIsActive ? '9.8%' : 0 }}>
                                    <Text style={[styles.titleText, { width: '60%', marginTop: this.state.screen === 'createUsername' ? '-4%' : 0 }]}>{this.titles[this.state.screen]}</Text>
                                    {this.state.screen === 'createUsername' && <DismissKeyboardTouch onPress={this.dismissKeyboardHandler} />}
                                    {this.state.screen === 'createUsername' ?
                                        <View style={{ width: '100%', alignItems: 'center', height: '100%', marginTop: '4%' }}>
                                            <View style={{
                                                backgroundColor: 'rgb(13, 16, 34)',
                                                borderRadius: 50,
                                                width: '65%',
                                                height: this.state.keyboardIsActive ? '20%' : '10.5%',
                                                marginTop: '11.6%',
                                            }}>
                                                <TextInput
                                                    style={{
                                                        color: 'rgb(0, 255, 220)',
                                                        fontSize: getScreenSizeMultiplier() * 16,
                                                        fontStyle: 'normal',
                                                        fontWeight: 'normal',
                                                        textAlign: 'left',
                                                        lineHeight: getScreenSizeMultiplier() * 26,
                                                        letterSpacing: getScreenSizeMultiplier() * 0.25,
                                                        marginHorizontal: '7.2%',
                                                        width: '86%',
                                                        textAlignVertical: 'center',
                                                        height: '100%',
                                                    }}
                                                    // onFocus={() => { Keyboard.scheduleLayoutAnimation({ duration: 1000, easing: 'linear' }); }}
                                                    onFocus={() => { LayoutAnimation.configureNext(LayoutAnimation.Presets.linear); }}
                                                    onBlur={() => { console.log('blur') }}
                                                    onChange={(text) => { this.setState({ username: text }); }}
                                                    value={this.state.username}
                                                    placeholder={'Nombre de usuario'}
                                                    placeholderTextColor={'#009682'}
                                                    ref={(ref) => { this.usernameInput = ref; }}
                                                />
                                            </View>
                                            <View style={{ flex: 1 }} />
                                            {!this.state.keyboardIsActive &&
                                                <TouchableOpacity
                                                    style={[styles.buttonsShape, styles.buttonSignUpBGColor, { height: '16.4%', marginBottom: '34.4%' }]}
                                                    onPress={this.submitUsername}
                                                >
                                                    <Text style={[styles.loginRegisterButtonsText, styles.darkQaplaTextColor]}>Estoy listo</Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                        :
                                        <View style={{ width: '100%', alignItems: 'center', height: '100%' }}>
                                            <Text style={styles.bodyText}>{this.bodies[this.state.screen]}</Text>
                                            <TouchableOpacity
                                                style={[
                                                    styles.buttonsShape,
                                                    // this.state.screen === 'init' ? styles.buttonSignUpBGColor : styles.blackGBColor,
                                                    // { backgroundColor: this.state.button1Color },
                                                    { marginTop: this.state.screen === 'init' ? '22%' : '21.8%' }]}
                                                onPress={this.state.screen === 'init' ? this.createAccount : this.appleButton}>
                                                <Animated.View
                                                    style={{
                                                        backgroundColor: this.state.button1HexColorController.interpolate({
                                                            inputRange: [0, 1], outputRange: [this.buttonsColors.signUp, this.buttonsColors.apple]
                                                        }),
                                                        height: '100%',
                                                        width: '100%',
                                                        justifyContent: 'center',
                                                        borderRadius: 100,
                                                    }}>
                                                    {this.state.screen === 'init' ?
                                                        <Text style={[styles.loginRegisterButtonsText, styles.darkQaplaTextColor]}>Crear mi cuenta</Text>
                                                        :
                                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                            <View style={{ height: '100%', width: '10%', marginLeft: '-5%', transform: [{ scale: 1.7 }] }}>
                                                                <AppleIcon />
                                                            </View>
                                                            <View style={{ marginLeft: '4%' }}>
                                                                <Text
                                                                    style={[styles.loginRegisterButtonsText, styles.whiteTextColor, { fontSize: getScreenSizeMultiplier() * 14 }]}>Continuar con Apple</Text>
                                                            </View>
                                                        </View>
                                                    }
                                                </Animated.View>
                                            </TouchableOpacity>
                                            <View
                                                style={{
                                                    height: '5.4%',
                                                }} />
                                            <TouchableOpacity
                                                style={[styles.buttonsShape, this.state.screen === 'init' ? styles.buttonLogInBGColor : styles.whiteBGColor, { marginBottom: '16.4%' }]}
                                                onPress={this.state.screen === 'init' ? this.login : this.googleButton}>
                                                {this.state.screen === 'init' ?
                                                    <Text style={[styles.loginRegisterButtonsText, styles.whiteTextColor]}>Ya tengo cuenta</Text>
                                                    :
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                        <View style={{ height: '100%', width: '10%', marginLeft: '-4.6%', transform: [{ scale: 1.3 }] }}>
                                                            <GoogleIcon />
                                                        </View>
                                                        <View style={{ marginLeft: '6.8%' }}>
                                                            <Text
                                                                style={[styles.loginRegisterButtonsText, styles.blackTextColor, { fontSize: getScreenSizeMultiplier() * 14 }]}>Continuar con Google</Text>
                                                        </View>
                                                    </View>
                                                }
                                            </TouchableOpacity>
                                        </View>}
                                </View>
                            //End of Sign Up/Log In with Apple/Google Screens
                        }
                    </View>
                </View>
            </View>
            <View style={{
                flex: 1,
                position: 'absolute',
                height: Dimensions.get('screen').height * 0.011,
                width: '33%',
                bottom: '5%',
                alignSelf: 'center',
            }}>
                {this.state.screen !== 'init' && this.state.screen !== 'signUpLogInComplete' && !this.state.keyboardIsActive &&
                    <ProgressDotsIndicator
                        steps={this.state.steps}
                        selected={this.state.step}
                        color={'rgba(0,254,223,0.54)'}
                        activeColor={'#00FEDF'}
                        width={Dimensions.get('screen').height * 0.011}
                        activeWidth={'25%'}
                        marginHorizontal={'5%'}
                    />
                }
            </View>
            {
                this.state.screen === 'signUpLogInComplete' &&
                <View style={{
                    backgroundColor: 'rgba(13, 16, 34, 0.36)',
                    alignSelf: 'stretch',
                    flexDirection: 'row',
                    position: 'absolute',
                    height: '11%',
                    width: '100%',
                    bottom: 0,
                }}>
                    <TouchableOpacity style={{
                        marginTop: '8%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: '20%',
                        width: '100%',
                    }}>
                        <Text style={{
                            color: 'rgba(37, 172, 255, 0.65)',
                            fontSize: 14,
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            textAlign: 'left',
                            lineHeight: 18,
                            letterSpacing: 0.22,
                            marginLeft: 26,
                        }}
                        >Ver tutorial sobre canjes, Qoins y XQ</Text>
                        <View style={{ flex: 1 }} />
                        <View style={{
                            backgroundColor: '#0D1022',
                            width: getScreenWidth() * 0.06,
                            height: getScreenWidth() * 0.06,
                            marginRight: '10%',
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <View style={{ transform: [{ scaleX: -1 }, { scale: 0.6 }], marginLeft: '-2%', marginTop: '6%' }}>
                                <LeftArrowThiccIcon />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView >
    );
}
}

function mapDispatchToProps(state) {
    return {
        originScreen: state.screensReducer.previousScreenId,
        currentScreen: state.screensReducer.currentScreenId,
    };
}

export default connect(mapDispatchToProps)(SignUpLoginHandlerScreen);
