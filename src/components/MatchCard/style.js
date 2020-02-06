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
        shadowColor: '#000',
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(0.62),
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10
    },
    mainBetContainer: {
        flex: 1,
        alignSelf: 'stretch',
        marginRight: widthPercentageToPx(3.73),
        marginTop: heightPercentageToPx(1.97),
        alignItems: 'flex-end'
    },
    betContainer: {
        width: widthPercentageToPx(25),
        height: heightPercentageToPx(4.8),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    padding: {
        flex: 1
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
    matchMainContainer: {
        backgroundColor: '#141833',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.14)',
        shadowRadius: 5,
        shadowOpacity: 1,
        height: heightPercentageToPx(20),
        marginLeft: widthPercentageToPx(3.4),
        marginRight: widthPercentageToPx(3.4),
        marginTop: heightPercentageToPx(3.9),
        justifyContent: 'center',
        flexDirection: 'column'
    },
    matchContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    gameLogoImage: {
        backgroundColor: 'transparent',
        resizeMode: 'center',
        width: 35,
        height: 31,
        marginLeft: widthPercentageToPx(3.73),
        marginTop: heightPercentageToPx(2.7),
    },
    gameText: {
        backgroundColor: 'transparent',
        color: 'white',
        // fontFamily: 'SFProRounded-Regular',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'left',
        lineHeight: 21,
        marginLeft: widthPercentageToPx(2.67),
        marginTop: heightPercentageToPx(3.45),
    },
    betText: {
        color: 'white',
        // fontFamily: 'SFProRounded-Bold',
        fontSize: 32,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'right',
        lineHeight: 28,
        letterSpacing: 0.51,
        paddingTop: heightPercentageToPx(1.31),
        backgroundColor: 'transparent',
        marginRight: widthPercentageToPx(1.6),
    },
    qaploinGradientImage: {
        resizeMode: 'center',
        backgroundColor: 'transparent',
        width: 24,
        height: 24,
        marginTop: heightPercentageToPx(0.99),
    },
    timeText: {
        backgroundColor: 'transparent',
        color: '#ebebf5',
        // fontFamily: 'SFProText-Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'right',
        lineHeight: 16,
        marginTop: heightPercentageToPx(2.7),
    },
    matchContainerRow: {
        backgroundColor: 'transparent',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: widthPercentageToPx(3.73),
        paddingRight: widthPercentageToPx(3.73),
        marginTop: heightPercentageToPx(-2.7)
    },
    avatarImage: {
        height: 23,
        width: 23,
        borderRadius: 23 / 2,
        backgroundColor: '#131833',
        resizeMode: 'cover',
        marginRight: widthPercentageToPx(1)
    },
    idRetaText: {
        backgroundColor: 'transparent',
        color: '#ebebf5',
        // fontFamily: 'SFProRounded-Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'left',
        lineHeight: 16,
        marginLeft: widthPercentageToPx(2.4),
    },
    usernameText: {
        backgroundColor: 'transparent',
        color: '#ebebf5',
        // fontFamily: 'SFProRounded-Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'right',
        lineHeight: 16,
        marginLeft: widthPercentageToPx(1.12)
    }
});