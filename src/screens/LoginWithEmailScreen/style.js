// josep.sanahuja    - 05-08-2019 - us84 - + sfvContainer

import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#131833'
    },
    container: {
        flex:1,
        backgroundColor:'#131833',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputText: {
        marginTop: 14,
        borderRadius: 6,
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginLeft: 72,
        marginRight: 72
    },
    buttonContainer: {
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        paddingVertical: 16,
        paddingHorizontal: 40,
        marginTop: 14
    },
    buttonText: {
        color: '#FFF',
        alignSelf: 'center'
    },
    forgotPasswordText: {
        color: '#3DF9DF',
        textAlign: 'right',
        marginRight: 40,
        fontSize: 12,
        marginTop: 14
    },
    backgroundImage: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: -1,
        opacity: .68,
        width: '100%',
        height: '50%'
    }
});
