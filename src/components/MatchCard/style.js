// diego          - 09-08-2019 - bug4 - styles for icons on the match card added

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export const styles = StyleSheet.create({
    container: {
        height: heightPercentageToPx(14),
        backgroundColor: '#0e1222',
        alignSelf: 'center',
        width: widthPercentageToPx(95),
        marginTop: heightPercentageToPx(1.85),
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(0.62),
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10
    },
    rowGame: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: heightPercentageToPx(2.46)
    },
    rowUserName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: heightPercentageToPx(2.46)
    },
    col: {
        flexDirection: 'column',
    },
    marginBottom10: {
        marginBottom: heightPercentageToPx(1.23)
    },
    gameContainer: {
        marginLeft: widthPercentageToPx(3.13),
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftTextStyle: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
        textAlignVertical: 'center',
        marginLeft: widthPercentageToPx(3.13)
    },
    rightTextStyle: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
        textAlignVertical: 'center'
    },
    matchDetailInfoContainer: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginRight: widthPercentageToPx(3.13),
        alignSelf: 'center'
    },
    betContainer: {
        flexDirection: 'row',
        marginLeft: widthPercentageToPx(1.6)
    },
    hourContainer: {
        flexDirection: 'row',
        marginLeft: widthPercentageToPx(1.6)
    },
    leftFooterTextStyle: {
        color: '#FFF',
        fontSize: 11,
        marginLeft: widthPercentageToPx(1.6),
        textAlignVertical: 'center',
        marginTop: heightPercentageToPx(0.5)
    },
    rightFooterTextStyle: {
        color: '#FFF',
        fontSize: 11,
        marginRight: widthPercentageToPx(3.13),
        marginTop: heightPercentageToPx(0.5)
    },
    adversaryDataContainer: {
        flexDirection: 'row',
        marginLeft: widthPercentageToPx(3.13)
    },
    avatarImage: {
        height: 24,
        width: 24,
        borderRadius: 100,
        backgroundColor: '#131833',
        marginRight: widthPercentageToPx(3.13)
    },
    qaploinIcon: {
        marginRight: widthPercentageToPx(1.6)
    }
});