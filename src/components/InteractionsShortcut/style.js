import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    bigMainContainer: {
        width: widthPercentageToPx(91.46),
        height: heightPercentageToPx(19.95),
    },
    imageBackground: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    iconTooltipPos: {
        position: 'absolute',
        marginLeft: widthPercentageToPx(3.2),
        marginTop: heightPercentageToPx(1.47),
    },
    iconTooltip: {
        maxWidth: widthPercentageToPx(6.4),
        maxHeight: widthPercentageToPx(6.4),
        minWidth: widthPercentageToPx(6.4),
        minHeight: widthPercentageToPx(6.4),
    },
    gif: {
        width: widthPercentageToPx(29.33),
        height: widthPercentageToPx(29.33),
    },
    textContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    bigTextHeader: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 24,
        letterSpacing: 1,
    },
    textAccentColor: {
        color: '#00FFDD',
    },
    textSubtitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 16.71,
        marginTop: 3,
    },
    button: {
        backgroundColor: '#00FEDF',
        alignSelf: 'center',
        paddingHorizontal: 26,
        paddingVertical: 12,
        borderRadius: 100,
        marginTop: 16,
    },
    buttonText: {
        color: '#0D1021',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 22,
        letterSpacing: -0.40799999237060547,
    },
});