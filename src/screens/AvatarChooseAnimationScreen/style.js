import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00020E',
        paddingBottom: 0
    },
    backIcon: {
        position: 'absolute',
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
    selectorContainer: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    changeViewButton: {
        backgroundColor: '#3B4BF9',
        borderRadius: 100,
        marginBottom: 16,
        shadowColor: 'rgba(59, 75, 249, 0.65)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    changeViewContainer: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    changeViewText: {
        marginLeft: 8,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        color: '#FFF'
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
        height: 60,
        width: 60,
        borderRadius: 10
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