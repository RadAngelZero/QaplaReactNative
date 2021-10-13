import { StyleSheet } from 'react-native';
import { getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';

export default styles = StyleSheet.create({
    dot: {
        backgroundColor: '#3D42DF',
        height: getScreenSizeMultiplier() * 12,
        width: getScreenSizeMultiplier() * 12,
        borderRadius: 100,
    }
})