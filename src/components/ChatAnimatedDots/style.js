import { StyleSheet } from 'react-native';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    dot: {
        backgroundColor: '#3D42DF',
        height: heightPercentageToPx(1.2),
        width: heightPercentageToPx(1.2),
        borderRadius: 100
    }
})