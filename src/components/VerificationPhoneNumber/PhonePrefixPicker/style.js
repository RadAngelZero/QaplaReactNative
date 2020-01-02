// josep.sanahuja  - 18-12-2019 - us176 - Added closeIcon and flex 0.8 to modalContainer
// josep.sanahuja  - 17-10-2019 - us134 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, getDimensions } from '../../../utilities/iosAndroidDim';
import {
    NAV_TOPBAR_ICON_RIGHT_MARGIN,
    NAV_TOPBAR_ICON_TOP_MARGIN
} from '../../../utilities/Constants';

export default styles = StyleSheet.create({
    sfvContainer: {
		justifyContent: 'center',
		backgroundColor:'#131833'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: widthPercentageToPx(20),
        marginRight: widthPercentageToPx(2) 
    },
    modalMainContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(100),
        backgroundColor: '#141833',
    },
    modalContainer: {
      	flex: 0.8,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#141833',
        borderRadius: 20,
        zIndex: 1000,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginRight: widthPercentageToPx(5.33),
        marginLeft: widthPercentageToPx(5.33),
    },
    closeIcon: {
        marginRight: widthPercentageToPx(NAV_TOPBAR_ICON_RIGHT_MARGIN),
        marginBottom: heightPercentageToPx(2.46),
        marginTop: heightPercentageToPx(NAV_TOPBAR_ICON_TOP_MARGIN),
        alignSelf: 'flex-end'
    },
    prefixCardItem: {
        backgroundColor: '#11152D',
        height: heightPercentageToPx(7),
        width: widthPercentageToPx(80),
        borderBottomColor: '#6D7DDE',
        color: '#FFF',
        borderRadius: 4,
        borderBottomWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    prefixCardTxt: {
        color: 'white'
    },
    prefixAlphaCode: {
        marginRight: widthPercentageToPx(2),
        color: 'white'
    },
    prefixNumCode: {
        marginRight: widthPercentageToPx(5),
        color: 'white'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF',
        width: widthPercentageToPx(80)
    },
    divider: {
        marginTop: heightPercentageToPx(2.5),
        marginBottom: heightPercentageToPx(4),
    },
});
