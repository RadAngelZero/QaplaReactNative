import { StyleSheet, Platform } from 'react-native';

import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';
import { SHEET_MAX_HEIGHT } from '../../utilities/Constants';

export default styles = StyleSheet.create({
    container: {
        backgroundColor: '#3B4BF9',
        padding: 12,
        height: SHEET_MAX_HEIGHT
    },
    topBar: {
        backgroundColor: '#858EF3',
        borderRadius: 20,
        width: widthPercentageToPx(25),
        height: 4,
        alignSelf: 'center'
    },
    openIcon: {
        backgroundColor: '#858EF3',
        borderRadius: 20,
        width: widthPercentageToPx(25),
        height: 10,
        alignSelf: 'flex-end',
        transform: [{ rotate: '180deg'}]
    },
    closeIcon: {
        backgroundColor: '#858EF3',
        borderRadius: 20,
        width: widthPercentageToPx(25),
        height: 10,
        alignSelf: 'flex-end'
    },
    rewardsInfoContainer: {
        marginLeft: 25,
        marginRight: 32,
        marginTop: Platform.OS === 'ios' ? 24 : 0
    },
    row: {
        flexDirection: 'row'
    },
    rewardsProgressContainer: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center'
    },
    rewardsHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rewardsTitle: {
        color: '#FFF',
        fontSize: 20
    },
    infoIcon: {
        marginLeft: 5
    },
    progress: {
        marginTop: 12
    },
    lifesContainer: {
        flexDirection: 'row',
        marginTop: 12
    },
    currentPoints: {
        color: '#FFF',
        fontSize: 12,
        alignSelf: 'center'
    },
    transactionsContainer: {
        marginTop: 40
    },
    transactionsTitle: {
        fontSize: 20,
        color: '#FFF'
    },
    transactionsSummary: {
        marginTop: 14,
        marginLeft: 20,
        flexDirection: 'row'
    },
    transactionsSummaryDescriptions: {
        flex: 1,
        justifyContent: 'space-around'
    },
    transactionDescription: {
        fontSize: 16,
        color: '#FFF',
        marginTop: 10
    },
    transactionSummaryValue: {
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    transactionValue: {
        fontSize: 16,
        color: '#FFF',
        marginTop: 10
    },
    transactionIcon: {
        marginTop: 10,
        marginLeft: 4
    },
    redeemButtonContainer: {
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(8),
        justifyContent: 'center',
        backgroundColor: Colors.pinkQapla,
        position: 'absolute',
        bottom: 0
    },
    redeemButtonText: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 8,
        marginLeft: 20,
        fontSize: 16,
        color: '#FFF'
    }
});