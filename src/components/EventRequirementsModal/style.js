import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import {
    NAV_TOPBAR_ICON_RIGHT_MARGIN,
    NAV_TOPBAR_ICON_TOP_MARGIN
} from '../../utilities/Constants';
import Colors from '../../utilities/Colors';

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
        backgroundColor: Colors.modals.backgroundDarkModal,
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
        marginRight: widthPercentageToPx( NAV_TOPBAR_ICON_RIGHT_MARGIN),
        marginBottom: heightPercentageToPx(2.46),
        marginTop: heightPercentageToPx(NAV_TOPBAR_ICON_TOP_MARGIN),
        alignSelf: 'flex-end'
    },
    modalTitle: {
        color: '#FFF',
        fontSize: 24,
        maxWidth: widthPercentageToPx(70)
    },
    description: {
        fontSize: 16,
        marginTop: 12,
        color: Colors.modals.body,
        marginLeft: 16,
        marginRight: 16,
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: 12
    },
    cancelTextButton: {
        marginTop: heightPercentageToPx(1.97),
        marginBottom: heightPercentageToPx(1.97),
        alignSelf: 'flex-end'
    },
    textOfButtons: {
        color: Colors.greenQapla,
        margin: heightPercentageToPx(1.97)
    },
    saveTextButton: {
        marginTop: heightPercentageToPx(1.97),
        marginBottom: heightPercentageToPx(1.97),
        marginRight: heightPercentageToPx(1.97),
        alignSelf: 'flex-end'
    }
});