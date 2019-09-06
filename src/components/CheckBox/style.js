// diego	      - 06-09-2019 - us93 - File creation

import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxContainer: {
        height: 24,
        width: 24,
        borderColor: '#FFF',
        borderWidth: 2,
        borderRadius: 4,
        justifyContent: 'center'
    },
    selectedContainer: {
        height: 20,
        width: 20,
        backgroundColor: '#6D7DDE',
        borderRadius: 2,
        alignSelf: 'flex-start'
    },
    label: {
        fontSize: 14,
        color: '#909299',
        textAlignVertical: 'center',
        marginLeft: 8
    }
})