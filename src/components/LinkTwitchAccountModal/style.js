import { StyleSheet } from 'react-native';

import { heightPercentageToPx, widthPercentageToPx, getPercentHeight, getPercentWidth } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';

export default styles = StyleSheet.create({
    // LinkTwitchAccountModal
    mainContainer: {
        flex: 1,
        backgroundColor: '#0D1021',
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(100),
    },
    closeIcon: {
        marginLeft: widthPercentageToPx(getPercentWidth(-0.2)),
        marginTop: heightPercentageToPx(getPercentHeight(-2)),
        alignSelf: 'center',
    },
    skipButtonContainer: {
        position: 'absolute',
        top: heightPercentageToPx(getPercentHeight(55)),
        right: widthPercentageToPx(getPercentWidth(24)),
        borderRadius: 100,
        backgroundColor: 'rgba(64, 64, 255, 0.3)',
    },
    skipButtonText: {
        marginHorizontal: widthPercentageToPx(getPercentWidth(12)),
        marginVertical: heightPercentageToPx(getPercentHeight(9)),
        fontSize: heightPercentageToPx(getPercentHeight(16)),
        textAlign: 'center',
        fontWeight: '600',
        color: 'rgba(255, 255, 255, .65)'
    },
    linkAccountContainer: {
        marginTop: heightPercentageToPx(getPercentHeight(112)),
        width: widthPercentageToPx(100),
        backgroundColor: Colors.modals.backgroundDarkModal,
        borderRadius: heightPercentageToPx(getPercentHeight(30)),
        shadowColor: '#000',
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(getPercentHeight(1.48)),
        },
        shadowOpacity: 0.58,
        shadowRadius: heightPercentageToPx(getPercentHeight(16)),
        elevation: heightPercentageToPx(getPercentHeight(24)),
    },
    fullHeightDialog: {
        minHeight: heightPercentageToPx(getPercentHeight(700)),
    },
    // LinkTwitchAccountModal
    linkOptions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkAccountBody: {
        marginHorizontal: widthPercentageToPx(getPercentWidth(48)),
        marginTop: heightPercentageToPx(getPercentHeight(72)),
        flex: 1,
        justifyContent: 'space-between',
    },
    linkYouAccount: {
        fontSize: heightPercentageToPx(getPercentHeight(30)),
        lineHeight: heightPercentageToPx(getPercentHeight(30)),
        letterSpacing: widthPercentageToPx(getPercentWidth(-0.72)),
        color: '#FFF',
        marginTop: heightPercentageToPx(getPercentHeight(60)),
    },
    realTimeProgress: {
        fontSize: heightPercentageToPx(getPercentHeight(22)),
        color: '#FFF',
        marginTop: heightPercentageToPx(getPercentHeight(30)),
        fontWeight: '600'
    },
    linkDescription: {
        fontSize: heightPercentageToPx(getPercentHeight(22)),
        color: '#FFF',
        marginTop: heightPercentageToPx(getPercentHeight(30)),
    },
    linkButtonContainer: {
        borderRadius: heightPercentageToPx(getPercentHeight(32)),
        backgroundColor: '#0A0311',
        marginBottom: heightPercentageToPx(getPercentHeight(48)),
    },
    linkButtonText: {
        marginHorizontal: widthPercentageToPx(getPercentWidth(40)),
        marginVertical: heightPercentageToPx(getPercentHeight(26)),
        fontSize: heightPercentageToPx(getPercentHeight(16)),
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    // SkipLinkTwitchAccount
    alertContainer: {
        flexDirection: 'row',
        marginTop: heightPercentageToPx(getPercentHeight(60)),
        alignItems: 'center',
    },
    important: {
        fontSize: heightPercentageToPx(getPercentHeight(30)),
        color: '#FFF',
        marginLeft: widthPercentageToPx(getPercentWidth(8)),
    },
    reminder: {
        fontSize: heightPercentageToPx(getPercentHeight(22)),
        color: '#FFF',
        marginTop: heightPercentageToPx(getPercentHeight(30)),
        fontWeight: '600',
    },
    skipDescription: {
        fontSize: heightPercentageToPx(getPercentHeight(22)),
        color: '#FFF',
        marginTop: heightPercentageToPx(getPercentHeight(30)),
    },
    skipLinkButtonContainer: {
        borderRadius: heightPercentageToPx(getPercentHeight(32)),
        backgroundColor: 'rgba(255,255,255,0.19)',
        marginBottom: heightPercentageToPx(getPercentHeight(48)),
    },
    skipLinkButtonText: {
        marginHorizontal: widthPercentageToPx(getPercentWidth(40)),
        marginVertical: heightPercentageToPx(getPercentHeight(26)),
        fontSize: heightPercentageToPx(getPercentHeight(16)),
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    backButtonContainer: {
        backgroundColor: '#141539',
        height: heightPercentageToPx(getPercentHeight(40)),
        width: heightPercentageToPx(getPercentHeight(40)),
        position: 'absolute',
        top: heightPercentageToPx(7),
        left: widthPercentageToPx(4),
        borderRadius: 100,
        overflow: 'hidden',
    },
});