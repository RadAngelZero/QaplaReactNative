import { StyleSheet } from 'react-native';
import { widthPercentageToPx, heightPercentageToPx, getPercentHeight, getPercentWidth } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';

export default styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(100),
    },
    container: {
        width: widthPercentageToPx(92),
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#0D1022',
        borderRadius: heightPercentageToPx(getPercentHeight(40)),
        shadowColor: '#000',
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(1.48),
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        alignItems: 'center',
        paddingTop: heightPercentageToPx(getPercentHeight(24)),
        paddingHorizontal: widthPercentageToPx(getPercentWidth(42)),
        paddingBottom: heightPercentageToPx(getPercentHeight(40)),
    },
    blur: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    closeIcon: {
        position: 'absolute',
        width: heightPercentageToPx(getPercentHeight(45)),
        height: heightPercentageToPx(getPercentHeight(45)),
        top: heightPercentageToPx(getPercentHeight(24)),
        right: widthPercentageToPx(getPercentWidth(18)),
    },
    image: {
        width: heightPercentageToPx(getPercentHeight(140)),
        height: heightPercentageToPx(getPercentHeight(140)),
        marginBottom: heightPercentageToPx(getPercentHeight(14)),
    },
    modalText: {
        fontSize: heightPercentageToPx(getPercentHeight(24)),
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: heightPercentageToPx(getPercentHeight(30)),
        textAlign: 'center',
        color: '#fff',
        maxWidth: widthPercentageToPx(getPercentWidth(210))
    },
    newCodeText: {
        lineHeight: 30,
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 30
    },
    textInput: {
        marginTop: 36,
        backgroundColor: '#202750',
        height: heightPercentageToPx(getPercentHeight(64)),
        width: widthPercentageToPx(getPercentWidth(260)),
        borderRadius: heightPercentageToPx(getPercentHeight(20)),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: heightPercentageToPx(getPercentHeight(38)),
    },
    textInputText: {
        fontSize: heightPercentageToPx(getPercentHeight(24)),
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: heightPercentageToPx(getPercentHeight(24)),
        letterSpacing: widthPercentageToPx(getPercentWidth(-0.1)),
        textAlign: 'left',
        color: '#fff',
    },
    button: {
        backgroundColor: '#3B4BF9',
        height: heightPercentageToPx(getPercentHeight(74)),
        width: widthPercentageToPx(getPercentWidth(260)),
        borderRadius: heightPercentageToPx(getPercentHeight(38)),
        justifyContent: 'center',
    },
    textButton: {
        fontSize: heightPercentageToPx(getPercentHeight(17)),
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: heightPercentageToPx(getPercentHeight(22)),
        letterSpacing: widthPercentageToPx(getPercentWidth(0.492000013589859)),
        textAlign: 'center',
        color: '#fff',
    },
    confirmIcon: {
        marginTop: heightPercentageToPx(getPercentHeight(38)),
        marginBottom: heightPercentageToPx(getPercentHeight(-24)),
        width: heightPercentageToPx(getPercentHeight(170)),
        height: heightPercentageToPx(getPercentHeight(170)),
    },
    qaplaColor: {
        color: Colors.greenQapla,
    },
    confirmModalSubtitle: {
        fontSize: heightPercentageToPx(getPercentHeight(16)),
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: heightPercentageToPx(getPercentHeight(22)),
        letterSpacing: widthPercentageToPx(getPercentWidth(0.2545454502105713)),
        textAlign: 'center',
        color: '#fff',
        marginBottom: heightPercentageToPx(5.5)
    },
    boldConfirmModalSubtitle: {
        fontWeight: '700'
    }
});
