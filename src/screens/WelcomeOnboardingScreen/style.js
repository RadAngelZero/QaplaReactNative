// diego	  	     - 03-09-2019 - us92 - Update Welcome styles according to inVision design
// josep.sanahuja    - 05-08-2019 - us84 - + sfvContainer

import {StyleSheet} from 'react-native'
import { getDimensions } from '../../utilities/iosAndroidDim';

export default StyleSheet.create({
    sfvContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#131833'
    },
    text: {
        marginTop: '2%',
        marginBottom: '10%',
        color: '#36E5CE'
    },
    progressContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 16
    },
    progressRow: {
        width: getDimensions().width / 3
    },
    progressCircleIndicator: {
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginRight: 11,
        width: 9,
        height: 9
    },
    finishTextButton: {
        fontSize: 14,
        letterSpacing: .5,
        color: '#3DF9DF',
        textAlign: 'right',
        marginRight: 16
    }
});