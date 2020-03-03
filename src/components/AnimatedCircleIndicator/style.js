// diego           - 20-08-2019 - us89 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim'

export default styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    fillText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF'
    },
    description: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        color: '#FFF',
        marginTop: heightPercentageToPx(1.48)
    }
});
