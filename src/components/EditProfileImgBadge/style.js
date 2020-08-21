import { StyleSheet } from 'react-native';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        width: widthPercentageToPx(5),
        height: widthPercentageToPx(5),
        borderRadius: widthPercentageToPx(5) / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
});