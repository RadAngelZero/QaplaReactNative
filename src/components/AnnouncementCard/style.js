// josep.sanahuja    - 18-10-2019 - us140 - File creation

import { StyleSheet } from 'react-native'
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default StyleSheet.create({
  	container:{
        marginTop: heightPercentageToPx(1.48),
        marginHorizontal: widthPercentageToPx(2.67),
        borderRadius: 10,
        width: widthPercentageToPx(35),
        height: widthPercentageToPx(35),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0E1222'
	},
    imageContainer: {
        height: widthPercentageToPx(15),
        width: widthPercentageToPx(15),
        marginBottom: heightPercentageToPx(1),
        marginTop: heightPercentageToPx(2),
    },
    imageStyle: {
        height: widthPercentageToPx(15),
        width: widthPercentageToPx(15),
    },
    description: {
        height: heightPercentageToPx(5.17),
        width: widthPercentageToPx(30),
        color: '#FFF',
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 14,
        textAlign: 'center'
    }
});