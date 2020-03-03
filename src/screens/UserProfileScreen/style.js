// josep.sanahuja  - 22-11-2019 - us153 - Add editImg
// diego           - 20-08-2019 - us89  - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    sfvContainer: {
        backgroundColor: '#0D1021',
        justifyContent: 'center',
        flex: 1
    },
    userInfoContainer: {
        backgroundColor: '#0E1222',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: heightPercentageToPx(0.25),
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
    imageAndNameContainer: {
        flexDirection: 'column',
        marginRight: widthPercentageToPx(10),
        marginLeft: widthPercentageToPx(10),
        marginBottom: heightPercentageToPx(4.43),
        alignItems: 'center'
    },
    avatarImage: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
        backgroundColor: '#131833',
        marginBottom: heightPercentageToPx(1),
        resizeMode: 'cover'
    },
    editImg: {
        position: 'absolute',
        bottom: heightPercentageToPx(1),
        right: widthPercentageToPx(-0.5)
    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF'
    },
    manageQaploinsContainer: {
        flexDirection: 'column',
        marginBottom: heightPercentageToPx(3.07)
    },
    qaploinInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginBottom: heightPercentageToPx(2.21)
    },
    qaploinImage: {
        marginRight: widthPercentageToPx(2.67)
    },
    qaploinsAmount: {
        fontSize: 26,
        color: '#FFF',
        fontWeight: 'bold'
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addQaploinsButton: {
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        textAlignVertical: 'center'
    },
    cashoutQaploins: {
        borderRadius: 100,
        backgroundColor: '#6D7DDE',
        marginLeft: widthPercentageToPx(1.66),
        textAlignVertical: 'center'
    },
    addQaploinsButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: heightPercentageToPx(1.23),
        marginBottom: heightPercentageToPx(1.23),
        marginLeft: widthPercentageToPx(5.87),
        marginRight: widthPercentageToPx(5.87)
    },
    fab: {
        bottom: heightPercentageToPx(2),
        right: widthPercentageToPx(4.26),
        width: widthPercentageToPx(12.8),
        height: heightPercentageToPx(6),
        borderRadius: 100,
        position: 'absolute',
        backgroundColor: '#FA2D79',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: heightPercentageToPx(0.37),
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    }
});
