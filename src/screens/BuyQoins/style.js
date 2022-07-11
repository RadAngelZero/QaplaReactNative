import { StyleSheet } from 'react-native';
import { widthPercentageToPx, heightPercentageToPx, getScreenSizeMultiplier } from '../../utilities/iosAndroidDim'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1021',
    },
    whiteText: {
        color: '#fff',
    },
    transparentText: {
        color: '#0000',
    },
    gifsContainerLinearGradient: {
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(36.8),
    },
    markRebillet: {
        position: 'absolute',
        width: widthPercentageToPx(19.2),
        height: heightPercentageToPx(12.6),
        top: heightPercentageToPx(6.89),
        left: widthPercentageToPx(18.13),
    },
    loveTwitch: {
        position: 'absolute',
        width: widthPercentageToPx(38.93),
        height: heightPercentageToPx(19.59),
        top: heightPercentageToPx(-0.3),
        left: widthPercentageToPx(52.4),
        transform: [{ rotate: '35deg' }],
    },
    heartLoveSticker: {
        position: 'absolute',
        width: widthPercentageToPx(30.66),
        height: heightPercentageToPx(12.82),
        top: heightPercentageToPx(5.54),
        left: widthPercentageToPx(33.86),
    },
    frankTwitch: {
        position: 'absolute',
        width: widthPercentageToPx(35.73),
        height: heightPercentageToPx(14.19),
        top: heightPercentageToPx(16.99),
        left: widthPercentageToPx(8.8),
    },
    vibesCat: {
        position: 'absolute',
        width: widthPercentageToPx(29.86),
        height: heightPercentageToPx(10.35),
        top: heightPercentageToPx(17.61),
        left: widthPercentageToPx(61.86),
    },
    centralGIFContainer: {
        marginTop: heightPercentageToPx(11.2),
        borderRadius: widthPercentageToPx(2.66),
        width: widthPercentageToPx(44.53),
        height: widthPercentageToPx(44.53),
        alignSelf: 'center',
        overflow: 'hidden',
    },
    centralGIFSize: {
        width: widthPercentageToPx(44.53),
        height: widthPercentageToPx(44.53),
    },
    bubbleChat: {
        backgroundColor: '#3B4BF9',
        marginTop: heightPercentageToPx(1.47),
        paddingHorizontal: widthPercentageToPx(6),
        paddingVertical: heightPercentageToPx(1.35),
        borderRadius: widthPercentageToPx(5.33),
        borderTopRightRadius: widthPercentageToPx(1.06),
        alignSelf: 'center',
    },
    bubbleChatText: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.95),
        letterSpacing: 0.30000001192092896,
    },
    mainContentContainer: {
        flex: 1,
        marginTop: heightPercentageToPx(5.41),
        paddingHorizontal: widthPercentageToPx(6.4),
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 22,
        fontWeight: '600',
        lineHeight: heightPercentageToPx(3.2),
        maxWidth: widthPercentageToPx(70.66),
        textAlign: 'center',
        alignSelf: 'center',
    },
    pricesContainer: {
        marginBottom: heightPercentageToPx(4.92),
    },
    pack1Container: {
        backgroundColor: '#141539',
        borderRadius: widthPercentageToPx(5.333),
        height: heightPercentageToPx(14.65),
        justifyContent: 'center',
        paddingLeft: widthPercentageToPx(5.86),
    },
    pack2Container: {
        flex: 1,
        borderRadius: widthPercentageToPx(5.33),
        paddingLeft: widthPercentageToPx(5.86),
        paddingRight: widthPercentageToPx(6.4),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    qoinsContainer: {
        flexDirection: 'row',
    },
    qoinsText: {
        fontSize: 30,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(4.43),
        letterSpacing: 1,
    },
    qoin: {
        minWidth: widthPercentageToPx(8.53),
        maxWidth: widthPercentageToPx(8.53),
        minHeight: widthPercentageToPx(8.53),
        maxHeight: widthPercentageToPx(8.53),
        marginLeft: widthPercentageToPx(2.66),
    },
    marginTop8: {
        marginTop: heightPercentageToPx(0.98),
    },
    marginTop16: {
        marginTop: heightPercentageToPx(1.97),
    },
    paddingTopFix: {
        paddingTop: 5,
    },
    bigSubText: {
        fontSize: 20,
        lineHeight: heightPercentageToPx(2.95),
        fontWeight: '700',
    },
    smallSubText: {
        fontSize: 14,
        lineHeight: heightPercentageToPx(2.09),
    },
    thugDoug: {
        width: widthPercentageToPx(25.6),
        height: widthPercentageToPx(25.6),
        alignSelf: 'center',
    },
});