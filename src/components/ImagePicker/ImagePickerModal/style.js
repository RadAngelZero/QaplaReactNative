// josep.sanahuja    - 22-11-2019 - us153 - Add closeIcon
// josep.sanahuja    - 30-09-2019 - us118 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
	sfvContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'#131833'
    },
    closeIcon: {
        marginRight: widthPercentageToPx(5.33),
        marginBottom: heightPercentageToPx(2.46),
        marginTop: heightPercentageToPx(2.46),
        alignSelf: 'flex-end'
    },
})