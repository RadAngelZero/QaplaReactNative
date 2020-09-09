import { StyleSheet } from 'react-native';

import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';

export default styles = StyleSheet.create({
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