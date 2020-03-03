// josep.sanahuja - 05-01-2020 - us187 - Standarized marginRight & marginTop for CloseIcon

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
    closeIcon: {
        marginRight: widthPercentageToPx(NAV_TOPBAR_ICON_RIGHT_MARGIN),
        marginBottom: heightPercentageToPx(2.46),
        marginTop: heightPercentageToPx(NAV_TOPBAR_ICON_TOP_MARGIN),
        alignSelf: 'flex-end'
    },
    modalTitle: {
        color: '#FFF',
        fontSize: 24,
        maxWidth: widthPercentageToPx(70)
    },
    qaplaTextInput: {
        color: '#FFF',
        marginTop: heightPercentageToPx(1.97),
        width: widthPercentageToPx(70),
        borderBottomWidth: 2
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: heightPercentageToPx(1.97)
    },
    cancelTextButton: {
        marginTop: heightPercentageToPx(1.97),
        marginBottom: heightPercentageToPx(1.97),
        alignSelf: 'flex-end'
    },
    textOfButtons: {
        color: '#3DF9DF',
        margin: heightPercentageToPx(1.97)
    },
    saveTextButton: {
        marginTop: heightPercentageToPx(1.97),
        marginBottom: heightPercentageToPx(1.97),
        marginRight: heightPercentageToPx(1.97),
        alignSelf: 'flex-end'
    }
});