import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    Tab: {
        flexDirection: 'row',
        paddingBottom: heightPercentageToPx(2.25)
    },
    TabLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'left',
        marginRight: widthPercentageToPx(2.66),
        marginLeft: widthPercentageToPx(2.66)
    }
});