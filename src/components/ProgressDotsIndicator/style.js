import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems:'center',
        alignContent:'center',
    },
    indicator: {
        height: '100%',
        borderRadius: 100,
    }});