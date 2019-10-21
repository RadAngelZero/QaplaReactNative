// josep.sanahuja    - 18-10-2019 - us140 - File creation

import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  	container:{
        backgroundColor:'#131833'
	},
	titleContainer: {
		flexDirection: 'row',
		marginTop: 24
	},
	title: {
		fontSize: 16,
		letterSpacing: .17,
        color: '#FFF',
		marginLeft: 24
	},
	circleIcon: {
		marginLeft: 6,
		borderRadius: 100,
		alignSelf: 'center',
		width: 10,
		height: 10
	},
	scrollViewStyle: {
		marginRight: 10
	}
});