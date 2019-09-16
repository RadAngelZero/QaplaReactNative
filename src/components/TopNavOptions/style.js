// diego           - 03-09-2019 - us96 - File creation

import { StyleSheet, Platform } from 'react-native';
import { hasSafeAreaView } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#131833'
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