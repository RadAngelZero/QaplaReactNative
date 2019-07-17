// josep.sanahuja - 15-07-2019 - us26 - + cancelImageContainer & cancelImage
// josep.sanahuja - 15-07-2019 - us25 - + 'gamerTagTextInput' & modal style

import {StyleSheet} from 'react-native'
import { getDimensions } from '../../utilities/iosAndroidDim';

export default StyleSheet.create({
  	container:{
		flex: 1,
		justifyContent:'center',
		backgroundColor:'#131833'
	},
	safeAreaViewContainer: {
		flex: 1,
		justifyContent:'center',
		alignItems: 'center'
	},
	modalContainer: {
        marginTop: 10,
        marginBottom: 23,
        marginRight: 5,
        marginLeft: 5,
        alignItems: 'center'
	},
	headerOptions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 24
	},
	backIcon: {
		marginLeft: 30
	},
	closeIcon: {
		fontSize: 20,
		textAlignVertical: 'top',
		width: 24,
		height: 24,
		marginRight: 20,
		color: '#FFF'
	},	
	modalText: {
        fontSize: 14,
        marginTop: 20,
        marginBottom: 10,
        color: '#FFF',
        textAlignVertical: 'center',
        justifyContent:'center',
        marginLeft: 10,
        marginRight:10,
        textAlign: 'center'
    },
    confirmButton: {
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
        marginRight: 10,
        marginLeft: 10
    },
    confirmButtonText: {
    	color: '#FFF',
        fontSize: 14,
        letterSpacing: .5,
        paddingVertical: 6,
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    gamerTagTextInput : {
        fontSize: 14,
        letterSpacing: .5,
        elevation: 6,
        borderRadius: 100,
        shadowColor: "#000",
        borderColor: '#36E5CE',
        borderWidth: 1,
        width: 200,
        justifyContent: 'center',
        marginBottom: 10,
        textAlign: 'center',
        color: 'white'
    }
});