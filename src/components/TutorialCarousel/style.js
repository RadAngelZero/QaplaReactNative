// diego              - 12-09-2019 - us99 - Added back icon styles
// diego              - 16-08-2019 - us77 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    scrollContainer: {
        height: heightPercentageToPx(44),
        width: widthPercentageToPx(93.55)
    },
    backIconContainer: {
        justifyContent: 'center',
        width: widthPercentageToPx(100)
    },
    backIcon: {
        alignSelf: 'flex-start',
        marginTop: heightPercentageToPx(2.96),
        marginLeft: widthPercentageToPx(8),
        marginBottom: heightPercentageToPx(2.28)
    },
    carrouselContainer: {
        flexWrap: 'wrap'
    },
    image: {
        resizeMode: 'contain',
        width: widthPercentageToPx(94.66),
        height: heightPercentageToPx(33.33)
    },
    progressContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        top: -1 * heightPercentageToPx(4.69)
    },
    progressCircleIndicator: {
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginRight: widthPercentageToPx(2.93),
        width: 9,
        height: 9
    },
});
