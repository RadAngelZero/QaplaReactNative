// diego	      - 06-09-2019 - us93 - File creation

import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    selectionArea: {
        flexDirection: 'row',
        alignSelf: 'center'
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
        backgroundColor: '#3DF9DF',
        borderRadius: 2,
        alignSelf: 'flex-start'
    },
    label: {
        fontSize: 11,
        color: '#909299',
        textAlignVertical: 'center',
        marginLeft: 8
    }
})