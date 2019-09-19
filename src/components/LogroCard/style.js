// josep.sanahuja    - 05-08-2019 - us84 - + sfvContainer
// diego             - 01-08-2019 - us58 - File creation

// import { StyleSheet } from 'react-native';

// export default styles = StyleSheet.create({
//     sfvContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         backgroundColor:'#131833',

//     },
//     container: {
//         backgroundColor:'#131833',
//         flexDirection: 'row',
//         alignItems: 'center',
//         flex: 1
//     },
//     title: {
//         color: '#FFF',
//         fontSize: 24,
//         textAlign: 'center'
//     }
// });

// diego           - 18-09-2019 - us133 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    listContainer: {
        marginTop: heightPercentageToPx(2.83),
        alignSelf: 'center',
        width: widthPercentageToPx(95),
        justifyContent: 'space-between',
    },
    container: {
        marginTop: heightPercentageToPx(2.83),
        backgroundColor: '#0E1222',
        alignSelf: 'center',
        width: widthPercentageToPx(95),
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10,
        justifyContent: 'space-between',
    },
    contentContainer: {
        marginLeft: widthPercentageToPx(4),
        marginRight: widthPercentageToPx(4),
        flexDirection: 'row'
    },
    colAContainer: {
        width: widthPercentageToPx(60),
    },
    colBContainer: {
        flex: 1,
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
        marginTop: 18,
        maxWidth: widthPercentageToPx(58),
        alignSelf: 'flex-start'
    },
    titleSocial: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: .2,
        color: '#FFF',
        marginTop: 18,
        maxWidth: widthPercentageToPx(37),
        alignSelf: 'flex-start'
    },
    description: {
        fontSize: 10,
        fontWeight: '500',
        letterSpacing: .1,
        lineHeight: 10,
        color: '#ACACAC',
        marginTop: heightPercentageToPx(1)
    },
    qaploinsText: {
        marginTop: 17,
        height: 50.73,
        width: 66.26,
        color: '#FFF',
        fontSize: 36,
        fontWeight: '600',
        letterSpacing: 0.45,
        lineHeight: 43,
        textAlign: 'right'
    },
    verifyButton: {
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
        maxWidth: '33%',
        marginBottom: heightPercentageToPx(2)
    },
    verifyTextButton: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: .15,
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 12
    },
    redimirButton: {
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
    redimirTextButton: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: .15,
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 12
    },
    likeText: {
        marginTop: heightPercentageToPx(2),
        marginBottom: 18,
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
        marginBottom: 18,
        height: 14.49,
        width: 66.26,
        color: '#6D7DDE',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 0.15,
        lineHeight: 14,
    },
    qaploinIcon: {
        marginTop: 17,
        marginRight: 6
    },
    picture: {
        marginTop: 20,
        width: 60,
        height: 60 
    }
}); 