// diego          - 06-09-2019 - us93 - File creation

import { StyleSheet } from 'react-native';
import { getDimensions } from '../../utilities/iosAndroidDim';
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
    container: {
        width: getDimensions().width * .9,
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
    containerMsgModal: {
        marginTop: heightPercentageToPx(1.23),
        marginBottom: heightPercentageToPx(2.83),
        marginRight: widthPercentageToPx(14.4),
        marginLeft: widthPercentageToPx(14.4),
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        marginTop: heightPercentageToPx(0.67),
        marginBottom: heightPercentageToPx(1),
        color: '#FFF',
        fontSize: 40
    },
    paragraph: {
        marginTop: heightPercentageToPx(0.62),
        color: '#CFD1DB',
        fontSize: 16,
        textAlign: 'center'
    },
    checkbox: {
        marginTop: heightPercentageToPx(10),
        marginBottom: heightPercentageToPx(5)
    },
    okButton: {
        marginTop: heightPercentageToPx(1.31),
        borderRadius: 100,
        backgroundColor: '#6D7DDE'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        letterSpacing: 2.65,
        marginLeft: widthPercentageToPx(10.66),
        marginRight: widthPercentageToPx(10.66),
        marginTop: heightPercentageToPx(1.72),
        marginBottom: heightPercentageToPx(1.72),
        color: '#FFF'
    }
})