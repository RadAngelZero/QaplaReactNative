/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
// josep.sanahuja    - 05-08-2019 - us84 - + sfvContainer

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, paddingTopForAndroidDevicesWithNotch, getScreenSizeMultiplier, getScreenWidth } from '../../utilities/iosAndroidDim'
import Colors from '../../utilities/Colors';

export default styles = StyleSheet.create({
    darkQaplaBGColor: {
        backgroundColor: '#131833',
    },
    buttonSignUpBGColor: {
        backgroundColor: Colors.greenQapla,
    },
    buttonLogInBGColor: {
        backgroundColor: '#3b4bf9',
    },
    twitchBGColor: {
        backgroundColor: '#9146FF',
    },
    transparentWhiteBGColor: {
        backgroundColor: 'rgba(255, 255, 255, 0.19)',
    },
    darkQaplaTextColor: {
        color: '#131833',
    },
    aquaQaplaTextColor: {
        color: Colors.greenQapla,
    },
    whiteTextColor: {
        color: 'white',
    },
    blackTextColor: {
        color: 'black',
    },
    whiteBGColor: {
        backgroundColor: 'white',
    },
    blackGBColor: {
        backgroundColor: 'black',
    },
    sfvContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    registroInicioSesionView: {
        flex: 1,
        alignItems: 'center',
    },
    closeBackButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#262b6a',
        resizeMode: 'center',
        width: getScreenWidth() * 0.055,
        height: getScreenWidth() * 0.014,
        marginLeft: '5.5%',
        marginTop: '10%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeBackButtonSpaceHandler: {
        width: getScreenWidth() * 0.11,
        height: getScreenWidth() * 0.11,
        marginLeft: '6.5%',
        marginTop: '6.5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qaplaLogoView: {
        position: 'absolute',
        width: '100%',
        marginTop: '5%',
    },
    qaplaLogoSpaceHandler: {
        width: '100%',
        height: '8.8%',
        marginTop: '5%',
    },
    modalBgView: {
        width: '100%',
        height: '100%',
    },
    modalBgViewLinearGradient: {
        shadowColor: 'rgba(0, 0, 0, 0.14)',
        shadowRadius: getScreenSizeMultiplier() * 5,
        shadowOpacity: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        borderTopLeftRadius: getScreenSizeMultiplier() * 50,
        borderTopRightRadius: getScreenSizeMultiplier() * 50,
    },
    titleText: {
        color: 'white',
        fontSize: getScreenSizeMultiplier() * 30,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: getScreenSizeMultiplier() * 30,
        paddingTop: '1.6%',
    },
    bodyText: {
        color: 'white',
        fontSize: getScreenSizeMultiplier() * 22,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'center',
        lineHeight: getScreenSizeMultiplier() * 26,
        letterSpacing: getScreenSizeMultiplier() * 0.35,
        paddingTop: '0.3%',
        width: '75%',
        marginTop: '4.6%',
    },
    loginRegisterButtonsText: {
        fontSize: getScreenSizeMultiplier() * 17,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: getScreenSizeMultiplier() * 22,
        letterSpacing: getScreenSizeMultiplier() * 0.49,
    },
    buttonsShape: {
        borderRadius: getScreenSizeMultiplier() * 50,
        width: '70%',
        height: '16.6%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
