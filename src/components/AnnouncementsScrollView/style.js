// josep.sanahuja    - 18-10-2019 - us140 - File creation

import {StyleSheet} from 'react-native'
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default StyleSheet.create({
  	container:{
        backgroundColor: '#0d1021'
	},
	titleContainer: {
		flexDirection: 'row',
		marginTop: heightPercentageToPx(2.96)
	},
	title: {
		fontSize: 16,
		letterSpacing: .17,
        color: '#FFF',
		marginLeft: widthPercentageToPx(6.4)
	},
	circleIcon: {
		marginLeft: widthPercentageToPx(1.6),
		borderRadius: 100,
		alignSelf: 'center',
		width: widthPercentageToPx(2.67),
		height: heightPercentageToPx(1.23)
	},
	scrollViewStyle: {
		marginRight: widthPercentageToPx(2.67)
	}
});