// diego          - 06-09-2019 - us93 - Added checkbox style
// diego          - 06-08-2019 - us68 - File creation

import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        marginTop: 6,
        marginBottom: 24,
        marginRight: 20,
        marginLeft: 20,
        alignItems: 'center'
    },
    paragraph: {
        marginTop: 5,
        color: '#CFD1DB',
        fontSize: 16,
        textAlign: 'center'
    },
    gotItButton: {
        marginTop: 24,
        borderRadius: 100,
        backgroundColor: '#6D7DDE'
    },
    gotItButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: .57,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 32,
        marginRight: 32
    },
    checkbox: {
        marginTop: 18
    }
});