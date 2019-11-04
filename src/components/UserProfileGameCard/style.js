// diego           - 11-09-2019 - us107 - Updated card margins to make visible for the user
//                                        that he can scroll
// diego           - 20-08-2019 - us89 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        height: heightPercentageToPx(15),
        backgroundColor: '#0D1021',
        borderRadius: 10,
        opacity: .82,
        elevation: 1,
        marginLeft: widthPercentageToPx(2.67),
        marginTop: heightPercentageToPx(2.28),
        flexDirection: 'row'
    },
    gameData: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: widthPercentageToPx(4.8),
        flexDirection: 'column'
    },
    descriptionText: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        color: '#FFF',
        marginTop: heightPercentageToPx(1.48)
    },
    gamerInfo: {
        marginLeft: widthPercentageToPx(4.0),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: widthPercentageToPx(4.8)
    },
    indicatorContainer: {
        marginLeft: widthPercentageToPx(4.0)
    }
});