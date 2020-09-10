import { StyleSheet } from 'react-native';

import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';

export default styles = StyleSheet.create({
    prizesCard: {
        marginTop: 14,
        backgroundColor: '#141833',
        alignSelf: 'center',
        borderRadius: 20,
        width: widthPercentageToPx(95),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10,
        marginBottom: 12
    },
    prizesContainer: {
        borderRadius: 20
    },
    backgroundImage: {
        width: widthPercentageToPx(95),
        height: heightPercentageToPx(100) / (heightPercentageToPx(100) > 850 ? 6 : 5),
        paddingTop: 16,
        paddingLeft: 18
    },
    prizeTitle: {
        fontSize: 22,
        color: '#FFF',
        maxWidth: '50%'
    },
    prizeDescription: {
        fontSize: 12,
        color: '#FFF',
        maxWidth: '50%',
        marginTop: 8
    },
    prizesCounterContainer: {
        position: 'absolute',
        bottom: 16,
        left: 12,
        flexDirection: 'row'
    },
    prizeIndexActive: {
        borderRadius: 100,
        backgroundColor: '#FFF',
        height: 6,
        width: 6,
        marginLeft: 6
    },
    prizeIndex: {
        borderRadius: 100,
        backgroundColor: 'rgba(216, 216, 216, .46)',
        height: 6,
        width: 6,
        marginLeft: 6
    },
    leaderBoardContainer: {
        flex: 1,
        marginHorizontal: 8,
        backgroundColor: Colors.backgroundColor
    },
    leaderHeaderComponent: {
        marginTop: 6
    },
    separatorComponent: {
        marginTop: 6
    },
    footerComponent: {
        height: heightPercentageToPx(16)
    },
    // LeaderRow
    leaderRowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leaderProfileImage: {
        height: 36,
        width: 36,
        borderRadius: 100
    },
    leaderPlace: {
        color: '#FFF',
        marginLeft: 8
    },
    totalDonations: {
        color: '#FFF',
        marginLeft: 8
    },
    userName: {
        color: '#FFF',
        marginLeft: 8
    }
});