// diego           - 03-09-2019 - us96 - Fil creation

import { StyleSheet, Platform } from 'react-native';
import { hasSafeAreaView } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    sfvcontainer: {
        backgroundColor: '#141833',
        height: hasSafeAreaView() ? 60 : 50,
        marginTop: ((Platform.OS == 'ios') && !hasSafeAreaView()) ? 20 : 0,
        paddingTop: hasSafeAreaView() ? 20 : 0
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 18
    },
    backIconContainer: {
        marginLeft: 30,
        marginTop: 18,
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
        marginRight: 30,
        marginTop: 18,
        alignSelf: 'flex-end'
    }
});