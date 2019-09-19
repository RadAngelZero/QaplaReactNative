// diego           - 18-09-2019 - us119 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        backgroundColor:'#131833'
    },
    scrollViewContainer: {
        height: heightPercentageToPx(70)
    },
    button: {
        marginTop: heightPercentageToPx(10),
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
    }
});