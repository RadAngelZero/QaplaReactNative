import { StyleSheet } from 'react-native';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    listContainer: {
        justifyContent: 'space-between',
    },
    sectionHeader: {
        display: 'flex',
        position: 'absolute',
        fontSize: 22,
        lineHeight: 28,
        color : '#FFF',
        fontWeight: '700',
        letterSpacing: 1,
        marginTop: 18,
        marginLeft: 13,
    }
});