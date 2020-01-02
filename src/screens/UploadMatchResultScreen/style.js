// diego          - 12-09-2019 - us99 - Added close icon styles
// diego          - 13-08-2019 - us77 - Upload result and other result buttons styles updated
// josep.sanahuja - 05-08-2019 - us78 - File creation

import { StyleSheet, Platform } from 'react-native';
import { heightPercentageToPx, getDimensions, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import {
    NAV_TOPBAR_ICON_LEFT_MARGIN,
    NAV_TOPBAR_ICON_RIGHT_MARGIN,
    NAV_TOPBAR_ICON_TOP_MARGIN
} from '../../utilities/Constants';

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        backgroundColor:'#131833',
    },
    container: {
        backgroundColor:'#131833',
        alignItems: 'center',
        flex: 1
    },
    closeIcon: {
        marginTop: heightPercentageToPx(NAV_TOPBAR_ICON_TOP_MARGIN),
        marginRight: widthPercentageToPx(NAV_TOPBAR_ICON_RIGHT_MARGIN),
        marginBottom: heightPercentageToPx(2.46),
        alignSelf: 'flex-end'
    },
    winLooseContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: heightPercentageToPx(2)
    },
    resultDecription: {
        color: '#B3B3B3',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center'
    },
    winLooseSeparator: {
        width: widthPercentageToPx(6)
    },
    uploadEvidence: {
        marginTop: heightPercentageToPx(10),
        alignItems: 'center'
    },
    footerEvidence: {
        color: '#FFF',
        fontSize: 20
    },
    otherResultButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-start',
        borderRadius: 100,
        borderWidth: 3,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        marginTop: heightPercentageToPx(5),
        marginRight: widthPercentageToPx(10.67),
        marginLeft: widthPercentageToPx(10.67)
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '900',
        textAlign: 'center',
        letterSpacing: .5,
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.46),
        marginLeft: widthPercentageToPx(8.53),
        marginRight: widthPercentageToPx(8.53),
        width: widthPercentageToPx(40)
    },
    uploadResultButton: {
        marginTop: heightPercentageToPx(3.01),
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: heightPercentageToPx(0.37),
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        marginRight: widthPercentageToPx(10.67),
        marginLeft: widthPercentageToPx(10.67),
        marginBottom: heightPercentageToPx(2.95)
    }
});