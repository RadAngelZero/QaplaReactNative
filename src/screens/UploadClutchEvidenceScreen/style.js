// diego          - 13-08-2019 - us77 - File creation

import { StyleSheet } from 'react-native';
import { getDimensions, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0D1021'
    },
    urlTextInput: {
        marginLeft: widthPercentageToPx(17.07),
        marginRight: widthPercentageToPx(17.07),
        marginTop: heightPercentageToPx(2.28),
        fontSize: 14,
        color: '#FFF',
        borderBottomWidth: 1
    },
    instructions: {
        color: '#FFF',
        fontSize: 14,
        textAlign: 'center',
        marginTop: heightPercentageToPx(2.28),
        marginLeft: widthPercentageToPx(7.47),
        marginRight: widthPercentageToPx(7.47)
    },
    highlightedText: {
        color: '#3DF9DF'
    },
    readyButton: {
        marginTop: heightPercentageToPx(6.15),
        borderRadius: 100,
        backgroundColor: '#6D7DDE',
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: heightPercentageToPx(0.34),
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65
    },
    readyButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.46),
        marginLeft: widthPercentageToPx(8.53),
        marginRight: widthPercentageToPx(8.53),
        minWidth: widthPercentageToPx(26.67)
    },
    goToClutchButtonText: {
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(5.17),
        fontSize: 14,
        height: heightPercentageToPx(2.46),
        color: '#828385'
    }
});