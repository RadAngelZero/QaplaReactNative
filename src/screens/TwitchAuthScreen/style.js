import { StyleSheet } from 'react-native';
import { paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    sfvContainer: {
		flex: 1,
        justifyContent: 'center',
        backgroundColor:'#131833',
        paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    container: {
        flex: 1,
        overflow: 'hidden'
    }
})