// josep.sanahuja - 05-08-2019 - us78 - File creation

import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#131833'
    },
    container: {
        backgroundColor:'#131833',
        alignItems: 'center',
        flex: 1
    },
    winLooseContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '14%'
    },
    winLooseSeparator: {
        width: '6%'
    },
    uploadEvidence: {
        marginTop: '13%',
        alignItems: 'center'
    },
    footerEvidence: {
        marginTop: '2%',
        marginBottom: '12%',
        color: '#FFF',
        fontSize: 20
    },
    otherResultButton: {
        marginTop: 11,
        borderRadius: 100,
        backgroundColor: '#FA2D79'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        letterSpacing: 2.65,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 14,
        marginBottom: 14,
        color: '#FFF'
    },
    uploadResultButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-start',
        borderRadius: 100,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#6D7DDE',
        backgroundColor: 'transparent',
        marginTop: 25,
        marginRight: 54,
        marginLeft: 54
    }
});