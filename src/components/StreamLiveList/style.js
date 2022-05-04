import { StyleSheet } from 'react-native';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    listContainer: {
    },
    sectionHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    sectoinHeaderText: {
        display: 'flex',
        fontSize: 22,
        fontWeight: '700',
        lineHeight: 28,
        letterSpacing: 1,
        textAlign: 'left',
        color: '#fff',
        marginLeft: 16
    },
    sectionHeaderIcon: {
        display: 'flex',
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FF006B',
        marginLeft: 8,
        marginTop: 2
    }
});