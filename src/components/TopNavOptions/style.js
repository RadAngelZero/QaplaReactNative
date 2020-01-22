// josep.sanahuja  - 05-01-2020 - us187 - Standarized margins for CloseIcon and BackIcon
// diego           - 03-09-2019 - us96 - File creation

import { StyleSheet, Platform } from 'react-native';
import { hasSafeAreaView, heightPercentageToPx, widthPercentageToPx, paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim';
import {
    NAV_TOPBAR_ICON_LEFT_MARGIN,
    NAV_TOPBAR_ICON_RIGHT_MARGIN,
    NAV_TOPBAR_ICON_TOP_MARGIN
} from '../../utilities/Constants';

export default styles = StyleSheet.create({
    sfvContainer: {
        justifyContent: 'center',
        backgroundColor: '#0d1021',
        paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backIconContainer: {
        marginLeft: widthPercentageToPx(NAV_TOPBAR_ICON_LEFT_MARGIN),
        marginTop: heightPercentageToPx(NAV_TOPBAR_ICON_TOP_MARGIN),
        alignSelf: 'flex-end'
    },
    buttonDimensions: {
        height: hasSafeAreaView() ? 60 : 50
    },
    icon: {
        width: 22,
        height: 18
    },
    closeIconContainer: {
        marginRight: widthPercentageToPx(NAV_TOPBAR_ICON_RIGHT_MARGIN),
        marginTop: heightPercentageToPx(NAV_TOPBAR_ICON_TOP_MARGIN),
        alignSelf: 'flex-end'
    }
});
