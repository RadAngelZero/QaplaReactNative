import { StyleSheet } from 'react-native';

import { widthPercentageToPx } from '../../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    timeLifeBadge: {
        borderRadius: 100,
        backgroundColor: '#6D7DDE',
        width: widthPercentageToPx(12),
        alignSelf: 'center'
    },
    timeLife: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: .1,
        color: '#FFF',
        marginTop: 4,
        marginBottom: 4,
        textAlign: 'center'
    }
});