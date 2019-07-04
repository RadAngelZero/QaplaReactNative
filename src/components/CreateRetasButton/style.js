import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        bottom: 35,
        alignSelf: 'center',
        position: 'absolute',
    },
    buttonContainer: {
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        paddingVertical: 12,
        paddingHorizontal: 45,
        paddingRight: 40,
        paddingLeft: 40
    },
    textStyle: {
        color: '#FFF',
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    highlightedExterior: {
        paddingVertical: 12,
        paddingHorizontal: 45,
        backgroundColor: '#3DF9DF',
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        paddingRight: 40,
        paddingLeft: 40
    },
    highlightedInterior: {
        paddingVertical: 12,
        paddingHorizontal: 45,
        backgroundColor: '#6D7DDE',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        paddingRight: 40,
        paddingLeft: 40
    }
});