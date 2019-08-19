// diego          - 13-08-2019 - us77 - Upload result and other result buttons styles updated
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
        marginTop: '11%',
        alignItems: 'center'
    },
    footerEvidence: {
        marginTop: '2%',
        color: '#FFF',
        fontSize: 20
    },
    otherResultButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-start',
        borderRadius: 100,
        borderWidth: 3,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        marginTop: '20%',
        marginRight: 40,
        marginLeft: 40
    },
    buttonText: {
        color: '#FFF',
        fontSize: 14,
        letterSpacing: .5,
        paddingVertical: 14,
        paddingHorizontal: 40,
        textAlign: 'center'
    },
    uploadResultButton: {
        marginTop: 24.5,
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        marginRight: 40,
        marginLeft: 40,
        marginBottom: 24
    }
});