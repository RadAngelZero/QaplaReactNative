// josep.sanahuja    - 05-08-2019 - us84 - + sfvContainer

import { StyleSheet } from 'react-native';

export default styles =  StyleSheet.create({
    sfvContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#131833'
    },
    container: {
        flex: 1,
        backgroundColor:'#131833'
    },
    headerContainer: {
        backgroundColor: '#0e1222',
        paddingBottom: 18
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        marginHorizontal: 12
    },
    titleText: {
        fontSize: 24,
        fontWeight: '500',
        color: '#FFF'
    },
    inputText: {
        marginTop: 14,
        borderRadius: 6,
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: 12
    }
});