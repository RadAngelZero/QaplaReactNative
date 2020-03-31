import { StyleSheet } from 'react-native';
import Colors from '../../utilities/Colors';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    title: {
        color: '#FFF',
        marginLeft: 16,
        fontSize: 24,
        fontWeight: 'bold',
        width: '70%',
        letterSpacing: 0.51
    }
});