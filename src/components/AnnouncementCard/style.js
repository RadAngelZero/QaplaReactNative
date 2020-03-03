// josep.sanahuja    - 18-10-2019 - us140 - File creation

import { StyleSheet } from 'react-native'
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default StyleSheet.create({
  	container:{
        marginTop: heightPercentageToPx(1.48),
        marginHorizontal: widthPercentageToPx(1.0),
        borderRadius: 10,
        width: widthPercentageToPx(49),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#141833'
	},
    imageContainer: {
        height: widthPercentageToPx(15),
        width: widthPercentageToPx(15),
        marginBottom: heightPercentageToPx(1),
        marginTop: 16
    },
    imageStyle: {
        height: widthPercentageToPx(15),
        width: widthPercentageToPx(15),
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    description: {
        width: widthPercentageToPx(40),
        marginBottom: 16,
        color: '#ACACAC',
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 14,
        textAlign: 'center'
    }
});