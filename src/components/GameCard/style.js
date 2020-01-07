// diego          - 30-12-2019 - us189 - Updated width of the game cards
// diego          - 17-07-2019 - NA   - update images styles and remove unnecesary code

import {StyleSheet} from 'react-native'
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default StyleSheet.create({
  	container:{
        marginTop: heightPercentageToPx(1.48),
        marginHorizontal: widthPercentageToPx(2.67),
        borderRadius: 10,
        width: widthPercentageToPx(75),
        alignSelf: 'center'
	},
	titleContainer: {
		flexDirection: 'row',
		marginTop: heightPercentageToPx(2.96)
    },
    imageStyle: {
        height: heightPercentageToPx(25),
        width: widthPercentageToPx(95),
        alignSelf: 'center',
        resizeMode: 'cover'
    },
	detailsContainer: {
        backgroundColor: '#0E1222',
        flexDirection: 'row',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    iconContainer: {
        marginLeft: widthPercentageToPx(4.27),
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.83)
    },
    gameName: {
        fontSize: 18,
        color: '#FFF',
        alignSelf: 'center',
        marginLeft: widthPercentageToPx(2.67)
    }
});