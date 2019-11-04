// diego           - 19-09-2019 - us121 - File creation
import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: heightPercentageToPx(0.99)
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 100,
        marginRight: widthPercentageToPx(2.13)
    }
});