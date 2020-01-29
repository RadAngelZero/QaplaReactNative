// diego	  	     - 03-09-2019 - us92 - Update Welcome styles according to inVision design
// josep.sanahuja    - 05-08-2019 - us84 - + sfvContainer

import { StyleSheet } from 'react-native'
import { heightPercentageToPx, widthPercentageToPx, paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim';

export default StyleSheet.create({
    sfvContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#131833',
        paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    text: {
        marginTop: heightPercentageToPx(2),
        marginBottom: heightPercentageToPx(10),
        color: '#36E5CE'
    },
    progressContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        position: 'absolute',
        bottom: heightPercentageToPx(5)
    },
    progressRow: {
        width: widthPercentageToPx(100) / 3
    },
    indicatorsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    progressCircleIndicator: {
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginRight: 16,
        width: widthPercentageToPx(2.4),
        height:  widthPercentageToPx(2.4)
    },
    finishTextButton: {
        fontSize: 14,
        letterSpacing: .5,
        color: '#3DF9DF',
        textAlign: 'right',
        marginRight: widthPercentageToPx(4.27)
    }
});