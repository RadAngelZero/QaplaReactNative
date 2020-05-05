// josep.sanahuja - 20-09-2019 - us111 - Added disabledContainer
// josep.sanahuja - 19-09-2019 - us114 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    listContainer: {
        alignSelf: 'center',
        width: widthPercentageToPx(95),
        justifyContent: 'space-between',
    },
    container: {
        marginTop: heightPercentageToPx(2.83),
        backgroundColor: '#141833',
        alignSelf: 'center',
        width: widthPercentageToPx(95),
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: heightPercentageToPx(0.62),
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10,
        justifyContent: 'space-between'
    },
    disabledContainer: {
        marginTop: heightPercentageToPx(2.83),
        backgroundColor: '#0E1222',
        alignSelf: 'center',
        width: widthPercentageToPx(95),
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: heightPercentageToPx(0.62),
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10,
        justifyContent: 'space-between',
        opacity: 0.1
    },
    contentContainer: {
        marginLeft: widthPercentageToPx(4),
        marginRight: widthPercentageToPx(4),
        marginBottom: heightPercentageToPx(2),
        flexDirection: 'row'
    },
    colAContainer: {
        width: widthPercentageToPx(60),
    },
    colBContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },
    colASocialContainer: {
        width: widthPercentageToPx(23),
    },
    colBSocialContainer: {
        width: widthPercentageToPx(37),
        marginRight: widthPercentageToPx(2)
    },
    colCSocialContainer: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    qaploinsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    shareContainer: {
        marginLeft: widthPercentageToPx(4),
        marginRight: widthPercentageToPx(4),
        flexDirection: 'row'
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: .2,
        color: '#FFF',
        marginTop: heightPercentageToPx(2.28),
        maxWidth: widthPercentageToPx(58),
        alignSelf: 'flex-start'
    },
    titleSocial: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: .2,
        color: '#FFF',
        marginTop: heightPercentageToPx(2.28),
        maxWidth: widthPercentageToPx(37),
        alignSelf: 'flex-start'
    },
    description: {
        fontSize: 10,
        fontWeight: '500',
        letterSpacing: .1,
        lineHeight: 10,
        color: '#EBEBF5',
        marginTop: heightPercentageToPx(1)
    },
    qaploinsText: {
        top: heightPercentageToPx(1.2),
        height: 50.73,
        width: 66.26,
        color: '#FFF',
        fontSize: 36,
        fontWeight: '600',
        letterSpacing: 0.45,
        lineHeight: 43,
        textAlign: 'right',
        position: 'absolute',
        right: widthPercentageToPx(0)
    },
    verifyButton: {
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        shadowColor: '#000',
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(0.25),
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: heightPercentageToPx(2),
        maxWidth: widthPercentageToPx(33),
        marginBottom: heightPercentageToPx(2)
    },
    verifyTextButton: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: .15,
        textAlign: 'center',
        marginTop: heightPercentageToPx(1.48),
        marginBottom: heightPercentageToPx(1.48)
    },
    redimirButton: {
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        shadowColor: '#000',
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(0.25),
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: heightPercentageToPx(2),
        maxWidth: widthPercentageToPx(33),
        marginBottom: heightPercentageToPx(1)
    },
    redimirTextButton: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: .15,
        textAlign: 'center',
        marginTop: heightPercentageToPx(1.48),
        marginBottom: heightPercentageToPx(1.48)
    },
    progressContainer: {
        flexDirection: 'row',
        width: widthPercentageToPx(95),
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: heightPercentageToPx(2.28)
    },
    progressBar: {
        marginTop: heightPercentageToPx(1.48),
        width: widthPercentageToPx(70),
        backgroundColor: '#ACACAC',
        height: 4,
        marginLeft: widthPercentageToPx(4.27),
        marginBottom: heightPercentageToPx(1.85),
        borderRadius: 18,
        alignSelf: 'baseline'
    },
    progressBarContent: {
        backgroundColor: '#6D7DDE',
        height: 4,
        borderRadius: 18
    },
    progressBarCounter: {
        fontSize: 10,
        fontWeight: '700',
        color: '#3DF9DF',
        marginLeft: widthPercentageToPx(2.13)
    },
    likeText: {
        marginTop: heightPercentageToPx(2),
        marginBottom: heightPercentageToPx(2.28),
        marginRight: widthPercentageToPx(3),
        height: 14.49,
        width: 66.26,
        color: '#6D7DDE',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 0.15,
        lineHeight: 14,
    },
    uploadText: {
        marginTop: heightPercentageToPx(2),
        marginBottom: heightPercentageToPx(2.28),
        height: 14.49,
        width: 66.26,
        color: '#6D7DDE',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 0.15,
        lineHeight: 14,
    },
    qaploinIcon: {
        marginTop: heightPercentageToPx(2.09),
        marginRight: widthPercentageToPx(1.6)
    },
    picture: {
        marginTop: heightPercentageToPx(2.46),
        width: 60,
        height: 60
    },
    sectionHeader: {
        fontSize: 20,
        lineHeight: 24,
        color : '#FFF',
        fontWeight: 'bold',
        marginTop: 18
    }
});