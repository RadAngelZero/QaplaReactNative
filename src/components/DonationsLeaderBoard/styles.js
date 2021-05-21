import { StyleSheet } from 'react-native';

import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    prizesCard: {
        backgroundColor: Colors.backgroundColor,
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
    leaderBoardTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    title: {
        fontSize: 22,
        color: '#FFF',
        marginLeft: 24
    },
    tooltip: {
        marginLeft: 12
    },
    leaderBoardContainer: {
        height: heightPercentageToPx(23),
        backgroundColor: Colors.backgroundColor
    },
    separatorComponent: {
        marginTop: 6
    },
    userLeaderBoardPositionContainer: {
        justifyContent: 'space-around',
        alignContent: 'center',
        flexDirection: 'row',
        marginTop: 24,
        marginBottom: 24,
        marginLeft: 24,
        marginRight: 24,
        backgroundColor: '#FECD2E',
        padding: 7,
        borderRadius: 9
    },
    dataContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userLeaderImage: {
        height: 30,
        width: 30,
        borderRadius: 100,
        marginLeft: 24
    },
    userLeaderName: {
        fontSize: 21,
        color: '#0D1021',
        marginLeft: 12,
        width: widthPercentageToPx(40)
    },
    userLeaderDonations: {
        fontSize: 21,
        color: '#0D1021',
        marginLeft: 12
    },
    // TopLeaderChip
    chipContainer: {
        position: 'absolute',
        bottom: -10,
        alignSelf: 'center',
        width: 40,
        borderRadius: 12
    },
    chipText: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5
    },
    // TopLeaders
    topLeadersContainer: {
        backgroundColor: Colors.backgroundColor,
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 8
    },
    secondPlaceContainer: {
        marginTop: 28,
        marginRight: 20,
        justifyContent: 'center'
    },
    secondAndThirdPlaceImage: {
        height: 65,
        width: 65,
        borderRadius: 100
    },
    topLeaderUserName: {
        fontSize: 14,
        color: '#FFF',
        marginTop: 12,
        textAlign: 'center'
    },
    topLeaderExperience: {
        fontSize: 24,
        color: Colors.greenQapla,
        marginTop: 12,
        textAlign: 'center'
    },
    firstPlaceImage: {
        height: 90,
        width: 90,
        borderRadius: 100
    },
    firstPlaceContainer: {
        marginRight: 20,
        justifyContent: 'center'
    },
    thirdPlaceContainer: {
        marginTop: 28,
        justifyContent: 'center'
    },
    // LeaderRow
    leaderRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 24,
        marginRight: 24
    },
    leaderDataContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leaderPlace: {
        fontSize: 21,
        color: '#FFF',
        letterSpacing: .3,
        textAlignVertical: 'center',
        width: widthPercentageToPx(12)
    },
    leaderProfileImage: {
        marginTop: 4,
        height: 30,
        width: 30,
        borderRadius: 100,
        marginLeft: 24,
        marginBottom: 7
    },
    userName: {
        fontSize: 21,
        color: '#FFF',
        marginLeft: 12,
        width: widthPercentageToPx(40)
    },
    leaderDonationsContainer: {
        alignSelf: 'center'
    },
    totalDonations: {
        fontSize: 21,
        color: '#FFF'
    }
});