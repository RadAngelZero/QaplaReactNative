// diego             - 12-09-2019 - us99 - Updated closeIcon styles to make it consistent with new
//                                         closeIcon implementation (changed text icon for SVG icon)
// diego             - 20-08-2019 - us89 - +getDimensions & closeIcon

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import {
    NAV_TOPBAR_ICON_RIGHT_MARGIN,
    NAV_TOPBAR_ICON_TOP_MARGIN
} from '../../utilities/Constants';

export default styles = StyleSheet.create({
    mainContainer: {
		flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(100),
    },
    closeIcon: {
        marginRight: widthPercentageToPx(NAV_TOPBAR_ICON_RIGHT_MARGIN),
        marginBottom: heightPercentageToPx(2.46),
        marginTop: heightPercentageToPx(NAV_TOPBAR_ICON_TOP_MARGIN),
        alignSelf: 'flex-end'
    },
    container: {
        width: widthPercentageToPx(80),
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#141833',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(1.48),
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        alignItems: 'center'
    },
    qaploinsToBuyText: {
        marginTop: heightPercentageToPx(0.67),
        color: '#FFF',
        fontSize: 40
    },
    qaploinsText: {
        color: '#6D7DDE',
        fontSize: 16
    },
    paragraph: {
        marginTop: heightPercentageToPx(0.62),
        marginLeft: widthPercentageToPx(3.13),
        marginRight: widthPercentageToPx(3.13),
        color: '#CFD1DB',
        fontSize: 16,
        textAlign: 'center'
    },
    buyButton: {
        marginTop: heightPercentageToPx(1.31),
        borderRadius: 100,
        backgroundColor: '#6D7DDE',
        marginBottom: heightPercentageToPx(2.96)
    },
    priceText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 2.65,
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.46),
        marginLeft: widthPercentageToPx(8.53),
        marginRight: widthPercentageToPx(8.53)
    }
});