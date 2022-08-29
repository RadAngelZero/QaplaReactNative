import { StyleSheet } from 'react-native';

import { getScreenSizeMultiplier, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';

export default styles = StyleSheet.create({
    personalizeButtonContainer: {
        marginTop: heightPercentageToPx(2.21),
    },
    personalizeButtonBackgroundImage: {
        width: widthPercentageToPx(43),
        height: widthPercentageToPx(43),
        borderRadius: widthPercentageToPx(5),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    personalizeButtonIconContainer: {
        display: 'flex',
        transform: [{ scale: getScreenSizeMultiplier() }],
    },
    personalizeButtonIconText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.5),
        marginTop: heightPercentageToPx(0.73),
    },
    personalizeButtonDisplayQoinsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#141833',
        borderRadius: widthPercentageToPx(2.66),
        paddingHorizontal: widthPercentageToPx(3.46),
        paddingVertical: heightPercentageToPx(0.73),
        marginTop: heightPercentageToPx(1.41),
        shadowColor: '#000',
        shadowOffset: { width: widthPercentageToPx(1), height: heightPercentageToPx(1.23) },
        shadowOpacity: 0.5,
        shadowRadius: widthPercentageToPx(2.66),
        elevation: widthPercentageToPx(2.66),
    },
    qoin: {
        maxWidth: widthPercentageToPx(6.6),
        maxHeight: widthPercentageToPx(6.6),
    },
    personalizeButtonDisplayQoinsText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.58),
        letterSpacing: -0.3199999928474426,
        marginLeft: widthPercentageToPx(2.13),
    },
    personalizeButtonIcon: {
        minWidth: widthPercentageToPx(13.33),
        minHeight: widthPercentageToPx(13.33),
        maxWidth: widthPercentageToPx(13.33),
        maxHeight: widthPercentageToPx(13.33),
    },
});