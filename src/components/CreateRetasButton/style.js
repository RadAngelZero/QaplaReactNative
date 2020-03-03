// josep.sanahuja - 30-12-2019 - us183 - Removed highlightedExterior && highlightedInterior

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        bottom: heightPercentageToPx(4.30),
        alignSelf: 'center',
        position: 'absolute',
    },
    buttonContainer: {
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        elevation: 10
    },
    textStyle: {
        color: '#FFF',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.46),
        marginLeft: widthPercentageToPx(8.53),
        marginRight: widthPercentageToPx(8.53),
        letterSpacing: .57
    }
});
