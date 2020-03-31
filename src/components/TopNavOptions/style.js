// josep.sanahuja  - 05-01-2020 - us187 - Standarized margins for CloseIcon and BackIcon
// diego           - 03-09-2019 - us96 - File creation

import { StyleSheet } from 'react-native';
import { paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    sfvContainer: {
        justifyContent: 'center',
        backgroundColor: '#0D1021',
        paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    sfvContainerSignInWithEmail: {
        justifyContent: 'center',
        backgroundColor: '#131833',
        paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backIconContainer: {
        alignSelf: 'flex-end'
    },
    closeIconContainer: {
        alignSelf: 'flex-end'
    }
});
