import { StyleSheet } from 'react-native';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#0C1021'
    },
    tabStyle: {
        borderRadius: 6,
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 8,
        paddingBottom: 8,
        marginLeft: 20
    },
    activeTab: {
        backgroundColor: '#29326B'
    },
    inactiveTab: {
        backgroundColor: 'transparent'
    },
    tabLabelStyle: {
        color: '#FFF',
        fontSize: 17,
        textAlign: 'center'
    }
});