// josep.sanahuja - 05-01-2020 - us187 - Standarized marginRight & marginTop for CloseIcon
// josep.sanahuja - 22-09-2019 - us123 - File creation

import { StyleSheet } from 'react-native';
import { hasSafeAreaView, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import {
    NAV_TOPBAR_ICON_RIGHT_MARGIN,
    NAV_TOPBAR_ICON_TOP_MARGIN
} from '../../utilities/Constants';

export default styles = StyleSheet.create({
    container: {
		flex:1,
		justifyContent:'center',
  	},
    buttonContainer: {
    	bottom: heightPercentageToPx(4.30),
        alignSelf: 'center',
        position: 'absolute',
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        elevation: 10
    },
    textStyle: {
        color: '#FFF',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.46),
        marginLeft: widthPercentageToPx(8.53),
        marginRight: widthPercentageToPx(8.53),
        letterSpacing: .57
    },
	preview: {
	    flex: 1,
	    justifyContent: 'flex-end',
	    alignItems: 'center'
  	},
    buttonDimensions: {
        height: hasSafeAreaView() ? 60 : 50
    },
    closeIconContainer: {
        position: 'absolute',
        right: widthPercentageToPx(NAV_TOPBAR_ICON_RIGHT_MARGIN),
        top: heightPercentageToPx(NAV_TOPBAR_ICON_TOP_MARGIN),
        
    }
});