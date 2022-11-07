import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00020E',
        paddingBottom: 0
    },
    closeIcon: {
        zIndex: 9999,
        marginTop: 32,
        marginBottom: 20,
        marginLeft: 16
    },
    webViewContainer: {
        backgroundColor: '#00020E',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 64
    },
    webViewPortrait: {
        height: '100%',
        width: '100%'
    },
    webViewLandscape: {
        aspectRatio: 16/9,
        width: '100%'
    },
    modal: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    modalContainer: {
        alignItems: 'center',
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 32
    },
    text: {
        color: '#FFF',
        lineHeight: 22,
        letterSpacing: -0.41,
        textAlign: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
    },
    description: {
        maxWidth: '75%',
        marginTop: 16,
        fontSize: 18,
        fontWeight: '600',
        opacity: .8
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