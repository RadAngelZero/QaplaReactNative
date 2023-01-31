import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    streamerOfflineImage: {
        height: heightPercentageToPx(13.5),
        width: widthPercentageToPx(57.6)
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: -.72,
        textAlign: 'center',
        color: '#FFF'
    },
    modalDescriptions: {
        marginTop: 32,
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: .25,
        textAlign: 'center',
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