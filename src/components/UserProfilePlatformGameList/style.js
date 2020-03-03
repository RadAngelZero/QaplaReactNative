// diego           - 20-08-2019 - us89 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: heightPercentageToPx(2.96),
        marginLeft: widthPercentageToPx(6.4)
    }
});
