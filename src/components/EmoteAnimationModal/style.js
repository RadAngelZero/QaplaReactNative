import { StyleSheet } from 'react-native';

import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .5)'
    },
    mainContainer: {
        padding: 16,
        position: 'absolute',
        backgroundColor: '#141539',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(90.5)
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    closeIcon: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    title: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF'
    },
    emoteRainGifContainer: {
        borderRadius: 25,
        overflow: 'hidden',
        marginTop: 32
    },
    emoteRainGif: {
        overflow: 'hidden',
        borderRadius: 25,
        width: widthPercentageToPx(91.46),
        height: heightPercentageToPx(23.77),
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    tooltipContainer: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        flexDirection: 'column',
        backgroundColor: '#1C1E64'
    },
    tooltipOptionTouchableContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    },
    tooltipOptionTextContainer: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFF'
    },
    tooltipContentStyle: {
        backgroundColor: '#1C1E64',
        borderRadius: 20
    },
    selectedAnimationButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 16
    },
    selectedAnimationText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: '#FFF',
        textAlignVertical: 'center'
    },
    confirmButtonContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmButton: {
        borderRadius: 100,
        backgroundColor: '#00FFDD',
        paddingVertical: 16,
        paddingHorizontal: 24,
        position: 'absolute',
        bottom: 24,
        width: 126
    },
    confirmText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0D1022',
        textAlign: 'center'
    },
    emotesContainer: {
        flexDirection: 'column',
        marginBottom: 8,
        flex: 1
    },
    // EmotesAnimationSample
    animationSampleImage: {
        borderRadius: 20,
        marginBottom: 16,
        paddingHorizontal: 16,
        height: heightPercentageToPx(22.17),
        backgroundColor: '#0D1021',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    animationSampleText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: '#FFF',
        textAlignVertical: 'bottom',
        paddingBottom: 24
    }
});