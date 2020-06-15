import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';

export default styles = StyleSheet.create({
    mainContainer: {
		flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(100)
    },
    container: {
        width: widthPercentageToPx(80),
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.modals.backgroundDarkModal,
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
    closeIcon: {
        alignSelf: 'flex-end'
    },
    modalTitle: {
        color: '#FFF',
        fontSize: 18,
        maxWidth: widthPercentageToPx(70)
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: 16
    },
    cancelTextButton: {
        marginBottom: 8,
        alignSelf: 'flex-end'
    },
    textOfButtons: {
        color: Colors.greenQapla,
        margin: 16
    },
    saveTextButton: {
        marginBottom: 8,
        marginRight: 8,
        alignSelf: 'flex-end'
    }
});