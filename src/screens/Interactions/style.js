import { StyleSheet } from 'react-native';
import { widthPercentageToPx, heightPercentageToPx, getScreenSizeMultiplier } from '../../utilities/iosAndroidDim'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1021'
    },
    personalizeButtonContainer: {
        marginTop: 18 * getScreenSizeMultiplier(),
    },
    personalizeButtonBackgroundImage: {
        width: 165 * getScreenSizeMultiplier(),
        height: 165 * getScreenSizeMultiplier(),
        borderRadius: 20 * getScreenSizeMultiplier(),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    personalizeButtonIconContainer: {
        display: 'flex',
        transform: [{ scale: getScreenSizeMultiplier() }]
    },
    personalizeButtonIconText: {
        color: '#fff',
        fontSize: 18 * getScreenSizeMultiplier(),
        fontWeight: '600',
        lineHeight: 21 * getScreenSizeMultiplier(),
        marginTop: 4 * getScreenSizeMultiplier(),
    },
    personalizeButtonDisplayQoinsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#141833',
        borderRadius: 10 * getScreenSizeMultiplier(),
        paddingHorizontal: 13 * getScreenSizeMultiplier(),
        paddingVertical: 6 * getScreenSizeMultiplier(),
        marginTop: 11.5 * getScreenSizeMultiplier(),
        shadowColor: '#000',
        shadowOffset: { width: 4 * getScreenSizeMultiplier(), height: 10 * getScreenSizeMultiplier() },
        shadowOpacity: 0.5,
        shadowRadius: 10 * getScreenSizeMultiplier(),
        elevation: 10 * getScreenSizeMultiplier(),
    },

    personalizeButtonDisplayQoinsText: {
        color: '#fff',
        fontSize: 18 * getScreenSizeMultiplier(),
        fontWeight: '600',
        lineHeight: 21 * getScreenSizeMultiplier(),
        letterSpacing: -0.3199999928474426 * getScreenSizeMultiplier(),
        marginLeft: 8 * getScreenSizeMultiplier(),
    }
});