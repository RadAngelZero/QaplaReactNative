import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
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
    }
});