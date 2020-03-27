// josep.sanahuja          - 05-01-2020 - us187 - Standarized marginRight & marginTop for CloseIcon
// josep-sanahuja          - 21-12-2019 - us152 - File creation

import { StyleSheet } from 'react-native';
import { widthPercentageToPx, paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    sfvContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'#141833',
      alignSelf: 'center',
      alignItems: 'center',
      width: widthPercentageToPx(100),
      paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    scrollViewContainer: {
        paddingLeft: 16,
        paddingRight: 8,
    },
    closeIcon: {
        alignSelf: 'flex-end'
    },
    modalTitle: {
        color: '#FFF',
        fontSize: 24,
        marginBottom: 8
    },
    lineText: {
        color: '#FFF'
    },
    separator: {
        marginBottom: 8
    }
});
