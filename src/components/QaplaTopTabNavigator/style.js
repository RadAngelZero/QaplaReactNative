import { StyleSheet } from 'react-native';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    TopTabNavigatorContainer: {
        paddingLeft: widthPercentageToPx(2.66),
        flexDirection: 'column',
        backgroundColor: '#0C1021'
    },
    TabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0C1021'
    },
    TabIndicator: {
        height: 2,
        borderRadius: 10,
        backgroundColor: '#36E5CE'
    }
});