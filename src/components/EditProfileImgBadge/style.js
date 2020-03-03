// josep-sanahuja - 22-11-2019 - us153 - File creation

import { StyleSheet } from 'react-native';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        width: widthPercentageToPx(5),
        height: widthPercentageToPx(5),
        borderRadius: widthPercentageToPx(5) / 2,
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