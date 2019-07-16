// josep.sanahuja - 15-07-2019 - us26 - + cancelImageContainer & cancelImage
// josep.sanahuja - 15-07-2019 - us25 - + 'gamerTagTextInput' & modal style

import {StyleSheet} from 'react-native'

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
        flexDirection: 'column',
		justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '30%',
        backgroundColor: '#131833',
	},
	modalButtonsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalTextContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
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
    	
    	width: 100,
        borderRadius: 20,
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
        marginLeft: 0
    },
    confirmButtonText: {
    	color: '#FFF',
        fontSize: 14,
        letterSpacing: .5,
        paddingVertical: 14,
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    cancelButton: {
    	marginTop: 20,
    	width: 100,
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
        marginRight: 0,
        marginLeft: 10
    },
    cancelButtonText: {
    	color: '#FFF',
        fontSize: 14,
        letterSpacing: .5,
        paddingVertical: 14,
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    gamerTagTextInput : {
        fontSize: 14,
        paddingVertical: 14,
        letterSpacing: .5,
        elevation: 6,
        height: 40,
        borderRadius: 100,
        shadowColor: "#000",
        borderColor: '#36E5CE',
        borderWidth: 1,
        width: 200,
        justifyContent: 'center',
        marginBottom: 10,
        textAlign: 'center',
        color: 'white'
    },
    cancelImageContainer: {
        width:     40, 
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        top: -10,
        right: -10
    },
    cancelImage: {
        borderRadius: 20
    }

});