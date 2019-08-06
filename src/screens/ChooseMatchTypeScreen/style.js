// josep.sanahuja    - 05-08-2019 - us84 - + sfvContainer

import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor:'#131833'
    },
    container: {
        flex: 1,
        backgroundColor:'#131833'
    },
    titleText: {
        color: '#FFF',
        marginLeft: 24,
        fontSize: 32,
        fontWeight: 'bold',
        width: '60%',
        marginTop: 43
    },
    lightningImage: {
        marginTop: 71,
        alignItems: 'center'
    },
    publicMatchButton: {
        marginTop: 66,
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
        marginRight: 80,
        marginLeft: 80
    },
    publicMatchButtonText: {
        color: '#FFF',
        fontSize: 14,
        letterSpacing: .5,
        paddingVertical: 14,
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    directMatchButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-start',
        borderRadius: 100,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#6D7DDE',
        backgroundColor: 'transparent',
        marginTop: 25,
        marginRight: 80,
        marginLeft: 80
    },
    directMatchButtonSearchIcon: {
        paddingVertical: 14,
        marginLeft: 15
    },
    directMatchButtonText: {
        color: 'rgba(0, 0, 0, .8)',
        fontSize: 14,
        letterSpacing: .5,
        paddingVertical: 14,
        paddingHorizontal: 20,
        alignContent: 'center'
    }
});