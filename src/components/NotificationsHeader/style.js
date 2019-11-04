// diego             - 12-09-2019 - us99 - Updated closeIcon styles to make it consistent with new
//                                         closeIcon implementation (changed text icon for SVG icon)
// josep.sanahuja    - 05-08-2019 - us84 - Changed container to identify notch area
// diego             - 01-08-2019 - us58 - File creation

import { StyleSheet, Platform } from 'react-native';
import { hasSafeAreaView } from './../../utilities/iosAndroidDim'
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        backgroundColor: '#0E1222',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: hasSafeAreaView() ? 100 : 90, 
        alignItems:'flex-start',
        marginTop: ((Platform.OS == 'ios') && !hasSafeAreaView()) ? heightPercentageToPx(2.46) : heightPercentageToPx(0),
        paddingTop: hasSafeAreaView() ? heightPercentageToPx(2.46) : heightPercentageToPx(0),
        
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: widthPercentageToPx(4),
        color: '#FFF',
        marginBottom: heightPercentageToPx(2.28),
        marginTop: heightPercentageToPx(2.28)
    },
    closeIcon: {
        marginRight: widthPercentageToPx(5.33),
        marginBottom: heightPercentageToPx(2.46),
        marginTop: heightPercentageToPx(2.46),
        alignSelf: 'baseline'
    }
})