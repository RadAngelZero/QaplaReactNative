// diego             - 14-08-2019 - us80 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim'

export default styles = StyleSheet.create({
    container: {
        height: heightPercentageToPx(14),
        backgroundColor: '#141833',
        alignSelf: 'center',
        width: widthPercentageToPx(90),
        marginTop: heightPercentageToPx(1.85),
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(0.62),
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10,
        flexDirection: 'row'
    },
    readStateContainer: {
        alignSelf: 'center',
        marginLeft: widthPercentageToPx(0.8),
        width: widthPercentageToPx(13.5)
    },
    unreadNotification: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: widthPercentageToPx(4.8),
        height: heightPercentageToPx(2.28),
        width: heightPercentageToPx(2.28),
        borderRadius: 100,
        backgroundColor: '#3DF9DF'
    },
    readNotification: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: widthPercentageToPx(4.8),
        height: heightPercentageToPx(2.28),
        width: widthPercentageToPx(4.8),
        borderRadius: 100,
        backgroundColor: '#FA2D79'
    },
    infoContainer: {
        flexDirection: 'column',
        marginLeft: widthPercentageToPx(0.8),
        justifyContent: 'center',
        width: widthPercentageToPx(67.5)
    },
    infoText: {
        color: '#ACACAC',
        fontSize: 14
    }
});