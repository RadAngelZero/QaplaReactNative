// josep.sanahuja - 13-08-2019 - us86 - File creation

import { StyleSheet } from 'react-native';
import { getDimensions } from '../../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
	sfvContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'#131833'
    },
    mainContainer: {
		flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        height: '100%',
	},
	container: {
        height: getDimensions().height*.5,
        width: getDimensions().width,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#141833',
        borderRadius: 20,
        zIndex: 1000,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginRight: 20,
        marginLeft: 20,
        paddingTop: '20%'
    },
    headerText: {
        marginBottom: '15%',
        color: '#FFF',
        fontSize: 40,
        textAlign: 'center'
    },
    text: {
    	color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 32,
        marginRight: 32
    },
    paragraph: {
        marginTop: 5,
        marginRight: 30,
        marginLeft: 30,
        color: '#CFD1DB',
        fontSize: 16,
        textAlign: 'center'
    },
    okButton: {
        marginTop: 40,
        borderRadius: 100,
        backgroundColor: '#6D7DDE'
    }
})