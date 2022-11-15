import { StyleSheet } from 'react-native';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    successImage: {
        height: widthPercentageToPx(40),
        width: widthPercentageToPx(40) // widthPercentageToPx used because we want a square image
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: -.72,
        textAlign: 'center',
        color: '#FFF'
    },
    modalSubtitle: {
        fontSize: 16,
        marginTop: 8,
        color: '#FFF'
    },
    modalButton: {
        paddingVertical: 26,
        width: '100%',
        marginTop: 40,
        backgroundColor: '#3B4BF9',
        borderRadius: 40
    },
    modalButtonText: {
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: .49,
        textAlign: 'center',
        color: '#FFF'
    }
});