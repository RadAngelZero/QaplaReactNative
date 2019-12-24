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
    },
    highlightedExterior: {
        paddingVertical: heightPercentageToPx(1.48),
        paddingHorizontal: widthPercentageToPx(12),
        backgroundColor: '#3DF9DF',
        position: 'absolute',
        bottom: heightPercentageToPx(1.97),
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        paddingRight: widthPercentageToPx(10.66),
        paddingLeft: widthPercentageToPx(10.66)
    },
    highlightedInterior: {
        paddingVertical: heightPercentageToPx(1.48),
        paddingHorizontal: widthPercentageToPx(12),
        backgroundColor: '#6D7DDE',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        paddingRight: widthPercentageToPx(10.66),
        paddingLeft: widthPercentageToPx(10.66)
    }
});