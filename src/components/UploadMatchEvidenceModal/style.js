// diego          - 19-08-2019 - us89 - Responsive behavior added to width and height modal size
// josep.sanahuja - 12-08-2019 - us79 - File creation

import { StyleSheet } from 'react-native';
import { getDimensions } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
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
        maxWidth: getDimensions().width*.8,
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
    	color: 'white'
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
        paddingLeft: '20%',
        paddingRight: '20%',
        paddingTop: '3%',
        paddingBottom: '3%',
        borderRadius: 100,
        backgroundColor: '#6D7DDE',
        marginBottom: 18
    },
    closeIcon: {
        fontSize: 20,
        textAlignVertical: 'top',
        width: 24,
        height: 24,
        top: 10,
        right: 10,
        color: '#FFF',
        position: 'absolute'
    },

})