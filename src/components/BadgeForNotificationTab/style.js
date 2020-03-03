// diego -          01-08-2019 - us58 - File creation

import { StyleSheet } from 'react-native';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';


export default styles = StyleSheet.create({
    container: {
        borderRadius: 11.5,
        width: widthPercentageToPx(6),
        marginRight: widthPercentageToPx(1.33),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    badge: {
        fontSize: 16,
        color: '#0E1222',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});
