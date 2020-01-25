// diego           - 30-12-2019 - us189 - Removed margin top of container
// diego           - 03-09-2019 - us96 - Update container marginTop to be the same in all the match wizard

import {StyleSheet} from 'react-native'
import { widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim';

export default StyleSheet.create({
  	container:{
		backgroundColor:'#0d1021',
		alignSelf: 'flex-start'
	},
	title: {
        fontSize: 32,
        color: '#FFF',
        marginLeft: widthPercentageToPx(6.4),
		fontWeight: 'bold',
		marginBottom: heightPercentageToPx(0.49)
	},
	backIcon: {
		marginLeft: 30
	},
	closeIcon: {
		fontSize: 20,
		textAlignVertical: 'top',
		width: 24,
		height: 24,
		marginRight: widthPercentageToPx(5.33),
		color: '#FFF'
	},
	scrollViewMargin: {
		marginBottom: heightPercentageToPx(1.23)
	}
});