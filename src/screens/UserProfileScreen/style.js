// diego           - 20-08-2019 - us89 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    sfvContainer: {
        backgroundColor:'#131833',
        justifyContent: 'center',
        flex: 1
    },
    userInfoContainer: {
        backgroundColor: '#0e1222',
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
        marginRight: widthPercentageToPx(8),
        marginLeft: widthPercentageToPx(23),
        marginBottom: heightPercentageToPx(4.43)
    },
    avatarImage: {
        height: heightPercentageToPx(7.4),
        width: widthPercentageToPx(16),
        borderRadius: 100,
        backgroundColor: '#131833',
        marginBottom: heightPercentageToPx(1)
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
        justifyContent: 'space-between',
        marginBottom: heightPercentageToPx(2.21)
    },
    qaploinImage: {
        marginRight: widthPercentageToPx(2.67),
        height: heightPercentageToPx(3.7),
        width: widthPercentageToPx(8)
    },
    qaploinsAmount: {
        fontSize: 24,
        color: '#FFF',
        textAlign: 'right'
    },
    addQaploinsButton: {
        borderRadius: 100,
        backgroundColor: '#FA2D79'
    },
    addQaploinsButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlignVertical: 'center',
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