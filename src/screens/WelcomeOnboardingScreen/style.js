// diego	  	     - 03-09-2019 - us92 - Update Welcome styles according to inVision design
// josep.sanahuja    - 05-08-2019 - us84 - + sfvContainer

import { StyleSheet } from 'react-native'
import { heightPercentageToPx, widthPercentageToPx, paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim';

export default StyleSheet.create({
    sfvContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#131833',
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
        height: heightPercentageToPx(1.2),
        width: '60%',
        marginBottom: 42
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
        height: widthPercentageToPx(2.4)
    },
    finishTextButton: {
        fontSize: 14,
        letterSpacing: .5,
        color: '#3DF9DF',
        textAlign: 'right',
        marginRight: widthPercentageToPx(4.27)
    },
    bottomButtons: {
        flexDirection: 'row',
        alignSelf: 'center',
        height: heightPercentageToPx(9.8),
        width: '80%',
        marginBottom: 16
    },
    skipButton: {
        width: widthPercentageToPx(24),
        height: widthPercentageToPx(10),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(50,50,99,0.5)',
    },
    skipText: {
        color: 'rgba(255, 255, 255, 0.65)',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 22,
        letterSpacing: 0.49,
        opacity: 0.65,
    },
    nextButton: {
        width: widthPercentageToPx(19.2),
        height: widthPercentageToPx(19.2),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3B4BF9',
    },
    startNowText: {
        color: 'white',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'left',
        lineHeight: 22,
        letterSpacing: 0.49,
    }
});