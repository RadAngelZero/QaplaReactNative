// diego           - 24-09-2019 - us128 - File creation

import { StyleSheet } from 'react-native';
import { widthPercentageToPx, getDimensions } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor:'#131833',
        marginLeft: widthPercentageToPx(4),
        width: getDimensions().width
    }
});