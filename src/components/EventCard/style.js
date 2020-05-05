import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        marginTop: 14,
        backgroundColor: '#141833',
        alignSelf: 'center',
        width: widthPercentageToPx(95),
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10
    },
    disabledContainer: {
        marginTop: 14,
        backgroundColor: '#0E1222',
        alignSelf: 'center',
        width: widthPercentageToPx(95),
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10,
        opacity: 0.1
    },
    backgroundImageContainer: {
        width: widthPercentageToPx(95),
        height: heightPercentageToPx(100) / 6,
        justifyContent: 'space-between'
    },
    backgroundImage: {
        borderRadius: 20
    },
    colASocialContainer: {
        width: widthPercentageToPx(23),
    },
    colBContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: heightPercentageToPx(2.28)
    },
    colBSocialContainer: {
        width: widthPercentageToPx(37),
        marginRight: widthPercentageToPx(2)
    },
    picture: {
        marginTop: heightPercentageToPx(2.46),
        width: 60,
        height: 60
    },
    titleContainer: {
        width: widthPercentageToPx(95),
        alignItems: 'flex-end'
    },
    description: {
        fontSize: 10,
        fontWeight: '500',
        letterSpacing: .1,
        lineHeight: 10,
        color: '#ACACAC',
        marginTop: heightPercentageToPx(1)
    },
    participateButton: {
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: heightPercentageToPx(2),
        maxWidth: widthPercentageToPx(33),
        marginBottom: heightPercentageToPx(1)
    },
    participateTextButton: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: .15,
        textAlign: 'center',
        marginTop: heightPercentageToPx(1.48),
        marginBottom: heightPercentageToPx(1.48)
    },
    title: {
        maxWidth: widthPercentageToPx(35),
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: .38,
        color: '#FFF',
        lineHeight: 24,
        textAlign: 'right',
        marginTop: 16,
        marginRight: 28
    },
    body: {
        marginLeft: 14,
        marginRight: 24,
        marginBottom: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    brandText: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: .38,
        color: '#FFF'
    },
    streamerDetails: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    streamPlatformText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FFF'
    },
    platformImage: {
        marginLeft: 12,
        height: 30,
        width: 30
    },
    description: {
        fontSize: 10,
        fontWeight: '500',
        letterSpacing: .1,
        lineHeight: 10,
        color: '#EBEBF5',
        marginTop: heightPercentageToPx(1)
    },
    eventInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: widthPercentageToPx(6.13)
    },
    goToEvent: {
        color: '#6D7DDE',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 0.15,
        lineHeight: 14
    },
    participatingTextContainer: {
        flexDirection: 'row',
        marginBottom: heightPercentageToPx(2.28),
        marginRight: widthPercentageToPx(4)
    },
    participatingText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#3DF9DF',
        marginLeft: widthPercentageToPx(2.13)
    },
});