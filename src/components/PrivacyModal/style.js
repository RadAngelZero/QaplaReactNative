// josep.sanahuja          - 05-01-2020 - us187 - Standarized marginRight & marginTop for CloseIcon
// josep-sanahuja          - 21-12-2019 - us152 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim';
import {
    NAV_TOPBAR_ICON_RIGHT_MARGIN,
    NAV_TOPBAR_ICON_TOP_MARGIN
} from '../../utilities/Constants';

export default styles = StyleSheet.create({
    sfvContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'#131833',
      alignSelf: 'center',
      alignItems: 'center',
      paddingLeft: widthPercentageToPx(3),
      paddingRight: widthPercentageToPx(1),
      width: widthPercentageToPx(100),
      paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    closeIcon: {
        marginRight: widthPercentageToPx(NAV_TOPBAR_ICON_RIGHT_MARGIN),
        marginBottom: heightPercentageToPx(2.46),
        marginTop: heightPercentageToPx(NAV_TOPBAR_ICON_TOP_MARGIN),
        alignSelf: 'flex-end'
    },
    modalTitle: {
        color: '#FFF',
        fontSize: 24,
        maxWidth: widthPercentageToPx(70),
        marginBottom: heightPercentageToPx(2)
    },
    textContainer: {
        marginTop: heightPercentageToPx(1.33),
        paddingBottom: heightPercentageToPx(2.66) // <- For android devices with full screen
    },
    lineText: {
        color: '#FFF'
    }
});