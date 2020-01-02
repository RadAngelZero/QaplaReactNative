// josep.sanahuja    - 22-11-2019 - us153 - Add closeIcon
// josep.sanahuja    - 30-09-2019 - us118 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../../utilities/iosAndroidDim';
import {
    NAV_TOPBAR_ICON_RIGHT_MARGIN,
    NAV_TOPBAR_ICON_TOP_MARGIN
} from '../../../utilities/Constants';

export default styles = StyleSheet.create({
	sfvContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'#131833'
    },
    closeIcon: {
        marginRight: widthPercentageToPx(NAV_TOPBAR_ICON_RIGHT_MARGIN),
        marginBottom: heightPercentageToPx(2.46),
        marginTop: heightPercentageToPx(NAV_TOPBAR_ICON_TOP_MARGIN),
        alignSelf: 'flex-end'
    },
})