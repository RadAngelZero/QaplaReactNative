import { StyleSheet } from 'react-native';

import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .5)'
    },
    mainContainer: {
        position: 'absolute',
        backgroundColor: '#141539',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(89.5)
    },
    webViewContainer: {
        backgroundColor: '#141539',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 32
    },
    selectorContainer: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    optionsContainer: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#0D1021',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 32
    },
    optionButtonContainer: {
        marginRight: 8,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#141539',
        height: widthPercentageToPx(16),
        width: widthPercentageToPx(16),
        borderRadius: 10
    },
    optionButton: {
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#141539',
        height: widthPercentageToPx(14.4),
        width: widthPercentageToPx(14.4),
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
        borderRadius: 1000,
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    confirmButtonText: {
        fontSize: 16,
        letterSpacing: -0.32,
        fontWeight: '700',
        color: '#0D1021',
        textAlign: 'center'
    }
});