// diego          - 21-08-2019 - us89 - AddGamerTag Modal styles removed
// josep.sanahuja - 05-08-2019 - us84 - + sfvContainer
// josep.sanahuja - 15-07-2019 - us26 - + cancelImageContainer & cancelImage
// josep.sanahuja - 15-07-2019 - us25 - + 'gamerTagTextInput' & modal style
// diego          - 17-07-2019 - NA   - Remove unnecesary code to make more legible and efficient

import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  	sfvContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#131833'
    },
    container:{
		flex: 1,
		justifyContent:'center',
		backgroundColor:'#131833'
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
});