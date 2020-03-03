// diego          - 21-08-2019 - us89 - AddGamerTag Modal styles removed
// josep.sanahuja - 05-08-2019 - us84 - + sfvContainer
// josep.sanahuja - 15-07-2019 - us26 - + cancelImageContainer & cancelImage
// josep.sanahuja - 15-07-2019 - us25 - + 'gamerTagTextInput' & modal style
// diego          - 17-07-2019 - NA   - Remove unnecesary code to make more legible and efficient

import {StyleSheet} from 'react-native'
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim'

export default StyleSheet.create({
  	sfvContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#0D1021'
    },
    container:{
		flex: 1,
		justifyContent:'center',
		backgroundColor: '#0D1021'
	},
	headerOptions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: heightPercentageToPx(2,96)
	},
	backIcon: {
		marginLeft: widthPercentageToPx(8)
	},
	closeIcon: {
		fontSize: 20,
		textAlignVertical: 'top',
		width: widthPercentageToPx(6.4),
		height: heightPercentageToPx(2.96),
		marginRight: widthPercentageToPx(5.33),
		color: '#FFF'
	},
});
