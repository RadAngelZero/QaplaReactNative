// diego           - 03-09-2019 - us96 - File creation

import { StyleSheet, Platform } from 'react-native';
import { hasSafeAreaView, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    sfvContainer: {
        justifyContent: 'center',
        backgroundColor:'#131833'
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: heightPercentageToPx(2.28)
    },
    backIconContainer: {
        marginLeft: widthPercentageToPx(8),
        marginTop: heightPercentageToPx(2.28),
        alignSelf: 'flex-end'
    },
    buttonDimensions: {
        height: hasSafeAreaView() ? 60 : 50
    },
    icon: {
        width: 22,
        height: 18
    },
    closeIconContainer: {
        marginRight: widthPercentageToPx(8),
        marginTop: heightPercentageToPx(2.28),
        alignSelf: 'flex-end'
    }
});