import {StyleSheet} from 'react-native'

export default StyleSheet.create({
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
	}
});