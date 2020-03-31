// josep.sanahuja - 05-01-2020 - us187 - Standarized marginRight & marginTop for CloseIcon
// diego          - 12-09-2019 - us99 - Added close icon styles
// diego          - 21-08-2019 - us89 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

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
    modalBody: {
        marginTop: heightPercentageToPx(1),
        marginBottom: heightPercentageToPx(2.96),
        marginRight: widthPercentageToPx(1.33),
        marginLeft: widthPercentageToPx(1.33),
        alignItems: 'center'
    },
    gamerTagTextInput : {
        fontSize: 14,
        letterSpacing: .5,
        elevation: 6,
        borderRadius: 100,
        borderColor: '#36E5CE',
        borderWidth: 1,
        width: 200,
        justifyContent: 'center',
        marginBottom: heightPercentageToPx(1.23),
        textAlign: 'center',
        color: 'white'
    },
    smallText: {
        fontSize: 12,
        color: '#909299',
        marginBottom: heightPercentageToPx(1.14),
        textAlign: 'center'
    },
    modalText: {
        fontSize: 14,
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.28),
        color: '#FFF',
        textAlignVertical: 'center',
        justifyContent:'center',
        marginLeft: widthPercentageToPx(2.67),
        marginRight: widthPercentageToPx(2.67),
        textAlign: 'center'
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
        shadowRadius: 4.65
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