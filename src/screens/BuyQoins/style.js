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
        height: heightPercentageToPx(35.34),
    },
    markRebillet: {
        position: 'absolute',
        width: widthPercentageToPx(22.4),
        height: heightPercentageToPx(16.13),
        top: heightPercentageToPx(5.78),
        left: widthPercentageToPx(14.13),
    },
    loveTwitch: {
        position: 'absolute',
        width: widthPercentageToPx(42.89),
        height: heightPercentageToPx(20.55),
        top: heightPercentageToPx(-1.3),
        left: widthPercentageToPx(53.89),
        transform: [{ rotate: '35deg' }],
    },
    heartLoveSticker: {
        position: 'absolute',
        width: widthPercentageToPx(30.66),
        height: heightPercentageToPx(11.82),
        top: heightPercentageToPx(5.18),
        left: widthPercentageToPx(33.86),
    },
    frankTwitch: {
        position: 'absolute',
        width: widthPercentageToPx(35.73),
        height: heightPercentageToPx(12.19),
        top: heightPercentageToPx(16.99),
        left: widthPercentageToPx(2.93),
    },
    vibesCat: {
        position: 'absolute',
        width: widthPercentageToPx(29.86),
        height: heightPercentageToPx(9.35),
        top: heightPercentageToPx(17.61),
        left: widthPercentageToPx(69.6),
    },
    centralGIFContainer: {
        marginTop: heightPercentageToPx(11.2),
        borderRadius: widthPercentageToPx(2.66),
        width: widthPercentageToPx(58.93),
        height: heightPercentageToPx(19.95),
        alignSelf: 'center',
        overflow: 'hidden',
    },
    centralGIFSize: {
        width: widthPercentageToPx(58.93),
        height: heightPercentageToPx(19.95),
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
        marginTop: heightPercentageToPx(7.38),
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