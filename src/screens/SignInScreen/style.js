import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#131833',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    facebookButtonContainer: {
        borderRadius: 100,
        backgroundColor: '#364fe2',
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginTop: 44
    },
    whiteColor: {
        color: '#FFF'
    },
    alignSelfCenter: {
        alignSelf: 'center'
    },
    googleButtonContainer: {
        borderRadius: 100,
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginTop: 24
    },
    googleButtonText: {
        color: 'rgba(0, 0, 0, .541)'
    },
    alreadyHaveAccountTextContainer: {
        flexDirection: 'row',
        marginTop: 25
    },
    enterWithEmailText: {
        color: 'rgba(61,249,223,1)',
        marginLeft: 5
    },
    fontBold: {
        fontSize: 13,
        fontWeight: 'bold'
    }
});