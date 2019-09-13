// diego             - 03-09-2019 - us96 - Update titleText marginTop to be the same in all the match wizard
// josep.sanahuja    - 05-08-2019 - us84 - + sfvContainer

import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        justifyContent: 'center',
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
        marginTop: '5%'
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
        fontWeight: 'bold',
        letterSpacing: .5,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 32,
        marginRight: 32
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
        alignSelf: 'center',
        marginLeft: 24
    },
    directMatchButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: .5,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 8,
        marginRight: 32
    }
});