import { StyleSheet } from 'react-native';

import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        backgroundColor: '#0D1021',
        paddingBottom: 0
    },
    closeBackIcon: {
        marginLeft: 16,
        marginTop: 16,
        height: 48,
        width: 48
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center'
    },
    qaplaLogo: {
        marginTop: 25,
        resizeMode: 'contain',
        width: widthPercentageToPx(34.31),
        height: heightPercentageToPx(8.27),
    },
    card: {
        flex: 1,
        justifyContent: 'space-around',
        width: widthPercentageToPx(100),
        marginTop: 32,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems: 'center'
    },
    titleAndDescriptionContainer: {
        marginTop: 32,
        width: widthPercentageToPx(100),
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        color: '#FFF',
        textAlign: 'center',
        width: widthPercentageToPx(70),
    },
    description: {
        marginTop: 24,
        maxWidth: widthPercentageToPx(70),
        fontSize: 22,
        color: '#FFF',
        textAlign: 'center',
        alignSelf: 'center'
    },
    emailButtonContainer: {
        width: widthPercentageToPx(100),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 32
    },
    emailButton: {
        marginRight: 12,
        fontSize: 14,
        color: 'rgba(255, 255, 255, .8)',
        textAlign: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emailFormContainer: {
        paddingTop: 24,
        maxWidth: widthPercentageToPx(100)
    },
    usernameContainer: {
        marginTop: 16,
        maxWidth: widthPercentageToPx(100)
    },
    button: {
        backgroundColor: '#00FFDD',
        width: widthPercentageToPx(70),
        height: heightPercentageToPx(9.11),
        borderRadius: 36,
        justifyContent: 'center',
        overflow: 'hidden'
    },
    buttonTextContainer: {
        width: widthPercentageToPx(70),
        alignSelf: 'center',
    },
    buttonWithIconContainer: {
        width: widthPercentageToPx(70),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 17,
        textAlign: 'center'
    },
    checkBox: {
        marginTop: 16
    },
    errorMessage: {
        fontSize: 12,
        color: '#FFF'
    },
    termsAndConditionsText: {
        fontSize: 14,
        marginTop: 12,
        lineHeight: 21,
        color: '#FFF',
        textAlignVertical: 'center',
        justifyContent:'center',
        width: widthPercentageToPx(70),
        textAlign: 'center'
    },
    hyperlinkText: {
        color: '#3df9df',
        fontWeight: 'bold'
    },
    dotStepsContainer: {
        marginBottom: 24,
        flexDirection: 'row',
        alignSelf: 'center',
        height: heightPercentageToPx(1.2)
    }
});