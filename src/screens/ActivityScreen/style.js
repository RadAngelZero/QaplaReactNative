import { StyleSheet } from 'react-native';

import Colors from '../../utilities/Colors';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    backIcon: {
        marginTop: 16,
        marginLeft: 16,
        backgroundColor: '#141539',
        borderRadius: 100
    },
    title: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: '700',
        marginTop: 32,
        marginLeft: 24
    },
    listContentContainer: {
        marginTop: 15,
        marginLeft: 24
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(255, 255, 255, .66)',
        marginTop: 30
    },
    recordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },
    recordLeftPartContainer: {
        flexDirection: 'row',
        alignContent: 'center'
    },
    recordDetailContainer: {
        justifyContent: 'space-between',
        marginLeft: 20
    },
    recordTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFF'
    },
    recordHours: {
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(255, 255, 255, .65)',
        marginTop: 4,
        marginBottom: 4
    },
    recordAmount: {
        fontSize: 30,
        color: '#FFF',
        marginRight: 24,
        alignSelf: 'center'
    }
});