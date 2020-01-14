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
    modalContainer: {
        width: widthPercentageToPx(80),
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#141833',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(1.48),
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        alignItems: 'center'
    },
    modalControls: {
        alignSelf: 'flex-end'
    },
    closeIcon: {
        marginRight: widthPercentageToPx(NAV_TOPBAR_ICON_RIGHT_MARGIN),
        marginBottom: heightPercentageToPx(2.46),
        marginTop: heightPercentageToPx(NAV_TOPBAR_ICON_TOP_MARGIN),
        alignSelf: 'baseline'
    },
    modalBody: {
        marginTop: heightPercentageToPx(1),
        marginBottom: heightPercentageToPx(2.96),
        marginRight: widthPercentageToPx(1.33),
        marginLeft: widthPercentageToPx(1.33),
        alignItems: 'center'
    },
    modalText: {
        fontSize: 14,
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.28),
        lineHeight: 21,
        color: '#FFF',
        textAlignVertical: 'center',
        justifyContent:'center',
        marginLeft: widthPercentageToPx(2.67),
        marginRight: widthPercentageToPx(2.67),
        textAlign: 'center'
    },
    hyperlinkText: {
        color: '#3df9df',
        fontWeight: 'bold'
    },
    bottomCheckBox: {
        marginTop: heightPercentageToPx(1.33)
    },
    confirmButton: {
        borderRadius: 100,
        backgroundColor: '#6D7DDE',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(0.34),
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        marginTop: heightPercentageToPx(1.66),
    },
    confirmButtonText: {
    	color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: .5,
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.46),
        marginLeft: widthPercentageToPx(9.6),
        marginRight: widthPercentageToPx(9.6)
    }
});