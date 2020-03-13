// diego          - 30-12-2019 - us189 - Updated width of the game cards
// diego          - 17-07-2019 - NA   - update images styles and remove unnecesary code

import {StyleSheet} from 'react-native'
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default StyleSheet.create({
  	container:{
        marginTop: 16,
        marginRight: 6,
        marginLeft: 6,
        borderRadius: 10,
        alignSelf: 'center'
	},
    imageStyle: {
        height: heightPercentageToPx(25),
        width: widthPercentageToPx(80),
        alignSelf: 'center',
        resizeMode: 'cover'
    },
	detailsContainer: {
        backgroundColor: '#141833',
        flexDirection: 'row',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    iconContainer: {
        marginLeft: 12,
        marginTop: 12,
        marginBottom: 12
    },
    gameName: {
        fontSize: 18,
        color: '#FFF',
        alignSelf: 'center',
        marginLeft: 8,
        position: 'absolute',
        bottom: 16,
        left: 32
    }
});