import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1021'
    },
    closeIcon: {
        position: 'absolute',
        top: 32,
        left: 16
    },
    avatarContainer: {
        width: heightPercentageToPx(24.63),
        height: heightPercentageToPx(24.63), // We use heightPercentageToPx because we want a image with same width and height
        borderRadius: 100,
        overflow: 'hidden'
    },
    spacing: {
        height: heightPercentageToPx(20)
    },
    avatarImage: {
        width: heightPercentageToPx(24.63),
        height: heightPercentageToPx(24.63), // We use heightPercentageToPx because we want a image with same width and height
        borderRadius: 100
    },
    instructions: {
        marginTop: 32,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: '#FFF'
    },
    description: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 21.48,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.8)',
        maxWidth: '66.66%',
        marginTop: 12
    },
    selectorContainer: {
        width: '100%',
        alignItems: 'center'
    },
    optionsContainer: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'transparent',
        padding: 32
    },
    optionButtonContainer: {
        marginRight: 8,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#141539',
        height: 60,
        width: 60,
        borderRadius: 14
    },
    optionButton: {
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#141539',
        height: 54,
        width: 54,
        marginLeft: 3,
        marginRight: 3,
        borderRadius: 8
    },
    optionText: {
        fontSize: 11,
        fontWeight: '700',
        lineHeight: 13.13,
        textAlign: 'center',
        color: '#FFF'
    },
    confirmButton: {
        marginTop: 32,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#00FFDD',
        borderRadius: 40,
        width: widthPercentageToPx(69.33),
        height: heightPercentageToPx(9.11)
    },
    confirmButtonText: {
        fontSize: 17,
        letterSpacing: 0.49,
        fontWeight: '700',
        color: '#0D1021',
        textAlign: 'center'
    }
});