// josep.sanahuja    - 05-01-2020 - us187 - Standarized marginRight & marginTop for CloseIcon
// diego             - 12-09-2019 - us99 - Updated closeIcon styles to make it consistent with new
//                                         closeIcon implementation (changed text icon for SVG icon)
// diego             - 20-08-2019 - us89 - +getDimensions & closeIcon

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
        height: heightPercentageToPx(100),
    },
    closeIcon: {
        alignSelf: 'flex-end',
        marginTop: 16,
        marginRight: 16
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
    headerText: {
        color: '#FFF',
        fontSize: 30
    },
    qaploinsText: {
        color: '#6D7DDE',
        fontSize: 16
    },
    paragraph: {
        marginTop: 16,
        marginLeft: widthPercentageToPx(3.13),
        marginRight: widthPercentageToPx(3.13),
        color: Colors.modals.body,
        fontSize: 16,
        textAlign: 'center'
    },
    eventsButton: {
        marginTop: 24,
        borderRadius: 100,
        backgroundColor: Colors.modals.bttnColor,
        marginBottom: 16
    },
    bttnText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 2.65,
        marginTop: 18,
        marginBottom: 18,
        marginLeft: 26,
        marginRight: 26
    }
});