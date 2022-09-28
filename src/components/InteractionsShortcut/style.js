import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    mainContainer: {
        width: widthPercentageToPx(44.26),
        height: heightPercentageToPx(24.63),
    },
    bigMainContainer: {
        width: widthPercentageToPx(91.46),
        height: heightPercentageToPx(19.95),
    },
    imageBackground: {
        flex: 1,
        borderRadius: widthPercentageToPx(5.33),
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: widthPercentageToPx(6.4),
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
        // backgroundColor: '#f0f',
        // position: 'absolute',
        width: widthPercentageToPx(29.33),
        height: widthPercentageToPx(29.33),
    },
    textContainer: {
        // position: 'absolute',
    },
    textHeader: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.33),
        letterSpacing: 1,
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
        fontSize: 12,
        fontWeight: '500',
        lineHeight: heightPercentageToPx(1.72),
        letterSpacing: widthPercentageToPx(-0.1),
        marginTop: heightPercentageToPx(0.86),
    },
    button: {
        backgroundColor: '#00FEDF',
        // position: 'absolute',
        alignSelf: 'center',
        paddingHorizontal: widthPercentageToPx(6.93),
        paddingVertical: heightPercentageToPx(1.47),
        borderRadius: widthPercentageToPx(4.93),
        marginTop: heightPercentageToPx(1.97),
    },
    buttonText: {
        color: '#0D1021',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.7),
        letterSpacing: -0.40799999237060547,
    },
});