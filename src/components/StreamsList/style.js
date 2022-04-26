import { StyleSheet } from 'react-native';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    listContainer: {
        alignSelf: 'center',
        width: widthPercentageToPx(95),
        justifyContent: 'space-between',
    },
    sectionHeader: {
        display: 'flex',
        position: 'absolute',
        fontSize: 20,
        lineHeight: 24,
        color : '#FFF',
        fontWeight: 'bold',
        marginTop: 18
    }
});