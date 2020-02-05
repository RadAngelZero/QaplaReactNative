// diego           - 22-11-2019 - us151 - File creation

import { StyleSheet } from 'react-native';

import { widthPercentageToPx, heightPercentageToPx, paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim';
import { NAV_TOPBAR_ICON_RIGHT_MARGIN, NAV_TOPBAR_ICON_TOP_MARGIN } from '../../utilities/Constants';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141833',
        alignSelf: 'center',
        paddingLeft: 16,
        paddingRight: 8,
        width: widthPercentageToPx(100),
        paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    closeIcon: {
        marginRight: widthPercentageToPx(NAV_TOPBAR_ICON_RIGHT_MARGIN),
        marginBottom: heightPercentageToPx(2.46),
        marginTop: heightPercentageToPx(NAV_TOPBAR_ICON_TOP_MARGIN),
        alignSelf: 'flex-end'
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFF',
        marginBottom: 8
    },
    paragraph: {
        marginBottom: 8,
        color: '#FFF'
    },
    strongText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF'
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#FFF'
    },
    numericList: {
        marginLeft: 16,
        marginRight: 12
    },
    underline: {
        textDecorationLine: 'underline'
    }
});