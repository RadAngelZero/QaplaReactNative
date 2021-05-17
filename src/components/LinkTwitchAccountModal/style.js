import { StyleSheet } from 'react-native';

import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';

export default styles = StyleSheet.create({
    // LinkTwitchAccountModal
    mainContainer: {
		flex: 1,
        backgroundColor: '#0D1021',
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(100)
    },
    closeIcon: {
        position: 'absolute',
        top: heightPercentageToPx(7),
        left: widthPercentageToPx(4),
        borderRadius: 100
    },
    skipButtonContainer: {
        position: 'absolute',
        top: heightPercentageToPx(7),
        right: widthPercentageToPx(4),
        borderRadius: 100,
        backgroundColor: 'rgba(64, 64, 255, 0.3)'
    },
    skipButtonText: {
        marginLeft: 12,
        marginRight: 12,
        marginTop: 9,
        marginBottom: 9,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
        color: 'rgba(255, 255, 255, .65)'
    },
    linkAccountContainer: {
        marginTop: heightPercentageToPx(14),
        width: widthPercentageToPx(100),
        backgroundColor: Colors.modals.backgroundDarkModal,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(1.48),
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24
    },
    fullHeightDialog: {
        minHeight: heightPercentageToPx(86)
    },
    // LinkTwitchAccountModal
    linkOptions: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    linkAccountBody: {
        marginLeft: 48,
        marginRight: 48,
        marginTop: 72,
        flex: 1,
        justifyContent: 'space-between'
    },
    linkYouAccount: {
        fontSize: 30,
        color: '#FFF',
        marginTop: 60
    },
    realTimeProgress: {
        fontSize: 22,
        color: '#FFF',
        marginTop: 30,
        fontWeight: '600'
    },
    linkDescription: {
        fontSize: 22,
        color: '#FFF',
        marginTop: 30
    },
    linkButtonContainer: {
        borderRadius: 32,
        backgroundColor: '#0A0311',
        marginBottom: 48
    },
    linkButtonText: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 26,
        marginBottom: 26,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center'
    },
    // SkipLinkTwitchAccount
    alertContainer: {
        flexDirection: 'row',
        marginTop: 60,
        alignItems: 'center'
    },
    important: {
        fontSize: 30,
        color: '#FFF',
        marginLeft: 8
    },
    reminder: {
        fontSize: 22,
        color: '#FFF',
        marginTop: 30,
        fontWeight: '600'
    },
    skipDescription: {
        fontSize: 22,
        color: '#FFF',
        marginTop: 30,
    },
    skipLinkButtonContainer: {
        borderRadius: 32,
        backgroundColor: 'rgba(255,255,255,0.19)',
        marginBottom: 48
    },
    skipLinkButtonText: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 26,
        marginBottom: 26,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center'
    }
});