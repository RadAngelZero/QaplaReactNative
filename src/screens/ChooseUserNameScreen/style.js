import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#131833',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        marginLeft: 30,
        marginRight: 30
    },
    title: {
        color: '#FFF',
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    inputText: {
        marginTop: 14,
        borderRadius: 6,
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 12
    },
    buttonContainer: {
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        paddingVertical: 16,
        paddingHorizontal: 40,
        marginTop: 50
    },
    buttonText: {
        color: '#FFF',
        alignSelf: 'center'
    },
});