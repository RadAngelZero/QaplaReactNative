import { StyleSheet } from 'react-native';

import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .5)'
    },
    mainContainer: {
        position: 'absolute',
        backgroundColor: '#141539',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: widthPercentageToPx(100)
    },
    closeIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: heightPercentageToPx(4.92),
        marginTop: 16,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    closeIcon: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    signUpContainer: {
        alignItems: 'center',
        marginTop: 4
    },
    signUpGifContainer: {
        borderRadius: 8,
        overflow: 'hidden'
    },
    signUpGif: {
        height: heightPercentageToPx(17.85)
    },
    title: {
        marginTop: 32,
        marginBottom: 16,
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: -.72,
        color: '#FFF'
    },
    benefitsList: {
        width: widthPercentageToPx(69.33),
        alignItems: 'center'
    },
    benefit: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 19.36,
        textAlign: 'center',
        color: '#FFF'
    },
    signUpOptions: {
        marginTop: 44
    },
    signUpOption: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 28,
        paddingRight: 34,
        borderRadius: 1000,
    },
    appleSignUp: {
        backgroundColor: '#FFF',
    },
    appleSignUpText: {
        fontSize: 14,
        fontWeight: '700'
    },
    twitchSignUp: {
        marginTop: 24,
        backgroundColor: '#000000'
    },
    twitchSignUpText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFF'
    },
});