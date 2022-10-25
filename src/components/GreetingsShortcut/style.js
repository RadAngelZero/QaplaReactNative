import { StyleSheet } from 'react-native';

import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    mainContainer: {
        width: widthPercentageToPx(91.46),
        height: undefined,
        aspectRatio: .8695
    },
    imageBackground: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    backgroundGif: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 34,
        resizeMode: 'cover'
    },
    title: {
        width: '80%',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 23.87,
        letterSpacing: 1,
        color: '#FFF'
    },
    subtitle: {
        marginTop: 4,
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 16.71,
        color: '#FFF'
    },
    button: {
        marginTop: 16,
        backgroundColor: '#3B4BF9',
        borderRadius: 100,
        paddingHorizontal: 26,
        paddingVertical: 12
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 22,
        letterSpacing: -.41,
        color: '#FFF'
    }
});