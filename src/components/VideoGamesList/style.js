// diego           - 03-09-2019 - us96 - Update container marginTop to be the same in all the match wizard

import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  	container:{
		flex: 1,
        backgroundColor:'#131833',
        marginTop: '5%'
	},
	title: {
        fontSize: 32,
        color: '#FFF',
        marginLeft: 24,
		fontWeight: 'bold',
		marginBottom: 4
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
	scrollViewMargin: {
		marginBottom: 10
	}
});