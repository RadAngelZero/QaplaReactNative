// josep.sanahuja    - 05-01-2020 - us187 - Standarized marginRight & marginTop for CloseIcon
// diego             - 12-09-2019 - us99 - Updated closeIcon styles to make it consistent with new
//                                         closeIcon implementation (changed text icon for SVG icon)
// josep.sanahuja    - 05-08-2019 - us84 - Changed container to identify notch area
// diego             - 01-08-2019 - us58 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim';
import {
    HEADER_SIZE
} from '../../utilities/Constants';
import Colors from '../../utilities/Colors';

export default styles = StyleSheet.create({
    sfvContainer: {
        justifyContent: 'center',
        backgroundColor: Colors.backgroundColor,
        paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: heightPercentageToPx(HEADER_SIZE),
        alignItems:'center',
        marginTop: 12,
        marginBottom: 30,
        marginLeft: widthPercentageToPx(4.27)
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    }
})
