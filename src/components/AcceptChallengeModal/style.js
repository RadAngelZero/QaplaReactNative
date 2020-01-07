// josep.sanahuja - 05-01-2020 - us187 - Standarized marginRight & marginTop for CloseIcon
// diego          - 12-09-2019 - us99 - Added close icon styles
// diego          - 06-09-2019 - us93 - Added checkbox style
// diego          - 04-09-2019 - us106 - Added styles for react native modal
// diego          - 06-08-2019 - us68 - File creation

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
    container: {
        width: widthPercentageToPx(90),
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
    closeIcon: {
        marginRight: widthPercentageToPx(NAV_TOPBAR_ICON_RIGHT_MARGIN),
        marginBottom: heightPercentageToPx(2.46),
        marginTop: heightPercentageToPx(NAV_TOPBAR_ICON_TOP_MARGIN),
        alignSelf: 'flex-end'
    },
    paragraph: {
        marginTop: heightPercentageToPx(4.43),
        marginRight: widthPercentageToPx(5.33),
        marginLeft: widthPercentageToPx(5.33),
        color: '#CFD1DB',
        fontSize: 16,
        textAlign: 'center'
    },
    gotItButton: {
        marginTop: heightPercentageToPx(2.96),
        marginBottom: heightPercentageToPx(2.96),
        borderRadius: 100,
        backgroundColor: '#6D7DDE'
    },
    gotItButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: .57,
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.46),
        marginLeft: widthPercentageToPx(8.53),
        marginRight: widthPercentageToPx(8.53)
    },
    checkbox: {
        marginTop: heightPercentageToPx(2.28)
    }
});