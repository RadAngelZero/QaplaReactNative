// diego             - 12-09-2019 - us99 - Updated closeIcon styles to make it consistent with new
//                                         closeIcon implementation (changed text icon for SVG icon)
// josep.sanahuja    - 05-08-2019 - us84 - Changed container to identify notch area
// diego             - 01-08-2019 - us58 - File creation

import { StyleSheet, Platform } from 'react-native';
import { hasSafeAreaView } from './../../utilities/iosAndroidDim'
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import {
    NAV_TOPBAR_ICON_RIGHT_MARGIN,
    NAV_TOPBAR_ICON_TOP_MARGIN
} from '../../utilities/Constants';

export default styles = StyleSheet.create({
    sfvContainer: {
        justifyContent: 'center',
        backgroundColor:'#0e1222'
    },
    container: {
        backgroundColor: '#0E1222',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 25,
        alignItems:'flex-start',
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(3.69),
        marginLeft: widthPercentageToPx(4.27),
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    closeIcon: {
        marginRight: widthPercentageToPx(NAV_TOPBAR_ICON_RIGHT_MARGIN),
        alignSelf: 'baseline'
    }
})