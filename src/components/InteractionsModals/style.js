import { StyleSheet } from 'react-native';
import { getScreenSizeMultiplier, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export const colors = {
    greenAqua: '#00FFDD',
    darkText: '#0D1021',
    transparentText: '#FFFFFF99',
};

export const styles = StyleSheet.create({
    bottomSheetContainer: {
        width: '100%',
        height: '100%',
    },
    bottomSheetAccentText: {
        color: colors.greenAqua,
    },
    bottomSheetWhiteText: {
        color: '#fff',
    },
    bottomSheetLinearGradient: {
        flex: 1,
        height: '100%',
        borderTopLeftRadius: widthPercentageToPx(10.66),
        borderTopRightRadius: widthPercentageToPx(10.66),
    },
    bottomSheetLinearGradientWithButtons: {
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    bottomSheetMainContainer: {
        marginTop: heightPercentageToPx(2.46),
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomSheetSearchStreamerMainContainer: {
        display: 'flex',
        marginTop: 24,
        marginLeft: widthPercentageToPx(9),
    },
    bottomSheetSearchStreamerHeader: {
        fontSize: 22,
        fontWeight: '700',
        lineHeight: 28,
        letterSpacing: 1,
    },
    bottomSheetSearchStreamerSubtitle: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 28,
    },
    bottomSheetSearchStreamerIcon: {
        transform: [{ scale: getScreenSizeMultiplier() }]
    },
    bottomSheetSearchBar: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#141539',
        width: widthPercentageToPx(92),
        height: heightPercentageToPx(6.2),
        alignSelf: 'center',
        borderRadius: widthPercentageToPx(13.33),
        marginTop: heightPercentageToPx(1.72),
        paddingHorizontal: widthPercentageToPx(4.8),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: widthPercentageToPx(1), height: heightPercentageToPx(1.23) },
        shadowOpacity: 0.5,
        shadowRadius: widthPercentageToPx(2.66),
        elevation: widthPercentageToPx(2.66),
    },
    bottomSheetSearchBarText: {
        color: '#fff6',
        marginLeft: widthPercentageToPx(2.66),
    },
    bottomSheetSelectionQoinsText: {
        color: colors.greenAqua,
        fontSize: 40,
        fontWeight: '700',
        letterSpacing: 1,
    },
    bottomSheetQoin: {
        minWidth: widthPercentageToPx(8),
        minHeight: widthPercentageToPx(8),
        maxWidth: widthPercentageToPx(8),
        maxHeight: widthPercentageToPx(8),
        marginTop: widthPercentageToPx(1.06),
        marginLeft: widthPercentageToPx(1.06),
    },
    bottomSheetBigQoin: {
        minWidth: widthPercentageToPx(10),
        minHeight: widthPercentageToPx(10),
        maxWidth: widthPercentageToPx(10),
        maxHeight: widthPercentageToPx(10),
        marginLeft: widthPercentageToPx(1.06),
    },
    bottomSheetButtonsContainer: {
        maxWidth: widthPercentageToPx(69.33),
    },
    bottomSheetButton: {
        width: widthPercentageToPx(69.33),
        height: heightPercentageToPx(9.11),
        borderRadius: widthPercentageToPx(9.86),
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheetButtonBackground: {
        backgroundColor: colors.greenAqua,
    },
    bottomSheetButtonText: {
        color: colors.darkText,
        fontSize: 17,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.71),
        letterSpacing: 0.492000013589859,
    },
    bottomSheetNoButton: {
        alignSelf: 'center',
    },
    bottomSheetNoButtonText: {
        color: colors.transparentText,
        letterSpacing: 1,
    },
    checkoutMinTouchable: {
        marginRight: widthPercentageToPx(2.66),
    },
    checkoutPluTouchable: {
        marginLeft: widthPercentageToPx(2.66),
    },
    checkoutAddRemIcon: {
        minWidth: widthPercentageToPx(6.4),
        minHeight: widthPercentageToPx(6.4),
        maxWidth: widthPercentageToPx(6.4),
        maxHeight: widthPercentageToPx(6.4),
    },
    checkoutTotalQoinsText: {
        color: '#FFEDCB',
        fontSize: 48,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(7.01),
        letterSpacing: 1,
    },
    heartHands: {
        position: 'absolute',
        width: widthPercentageToPx(49.86),
        height: widthPercentageToPx(49.86),
        bottom: heightPercentageToPx(20.79),
        alignSelf: 'center',
    },
    sentText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: heightPercentageToPx(3.44),
        letterSpacing: 1,
        textAlign: 'center',
        marginTop: heightPercentageToPx(9.11),
    },
    sentAccentText: {
        fontWeight: '700',
    },
    sentMarginButtonBottom: {
        marginBottom: heightPercentageToPx(5.29),
    },
});

export const gradients = {
    gradient1: ['#A716EE', '#2C07FA'],
};