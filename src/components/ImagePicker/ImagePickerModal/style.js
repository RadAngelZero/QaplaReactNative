// josep.sanahuja    - 05-01-2020 - us187 - Standarized marginRight & marginTop for CloseIcon
// josep.sanahuja    - 22-11-2019 - us153 - Add closeIcon
// josep.sanahuja    - 30-09-2019 - us118 - File creation

import { StyleSheet } from 'react-native';
import { paddingTopForAndroidDevicesWithNotch } from '../../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
	sfvContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'#131833',
      paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    closeIcon: {
        alignSelf: 'flex-end'
    },
})