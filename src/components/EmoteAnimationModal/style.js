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
    emotesContainer: {
        flexDirection: 'column',
        marginBottom: 8,
        flex: 1
    },
});