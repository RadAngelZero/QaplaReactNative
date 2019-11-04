// diego           - 18-09-2019 - us119 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        backgroundColor:'#131833'
    },
    backAndCloseOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: heightPercentageToPx(2.22)
    },
    backIconContainer: {
        marginLeft: widthPercentageToPx(8),
        marginTop: heightPercentageToPx(2.22),
        alignSelf: 'flex-end'
    },
    buttonDimensions: {
        height: heightPercentageToPx(5)
    },
    closeIconContainer: {
        marginRight: widthPercentageToPx(8),
        marginTop: heightPercentageToPx(2.22),
        alignSelf: 'flex-end'
    },
    scrollViewContainer: {
        height: heightPercentageToPx(60)
    },
    button: {
        marginTop: heightPercentageToPx(10),
        marginBottom: heightPercentageToPx(2),
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        alignSelf: 'center'
    },
    buttonText: {
        color: '#FFF',
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: heightPercentageToPx(2),
        marginBottom: heightPercentageToPx(2),
        marginLeft: widthPercentageToPx(10),
        marginRight: widthPercentageToPx(10),
        textAlign: 'center',
        letterSpacing: .57
    },
    smsWarning: {
        fontSize: 10,
        color: '#FFF',
        textAlign: 'center'
    }
});