// josep.sanahuja - 18-12-2019 - us178 - File creation

import { StyleSheet, Platform } from 'react-native';
import { hasSafeAreaView, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    resendText: {
        height: 14.49,
        width: 'auto',
        color: 'rgb(61, 249, 223)',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 0.15,
        lineHeight: 14,
        textAlign: 'center'
    },
    textWarning: {
        fontSize: 10,
        color: '#FFF',
        textAlign: 'center'
    }

});