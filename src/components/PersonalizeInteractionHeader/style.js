import { StyleSheet } from 'react-native';
import { widthPercentageToPx, heightPercentageToPx, getScreenSizeMultiplier } from '../../utilities/iosAndroidDim'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1021',
        paddingHorizontal: widthPercentageToPx(4.26),
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: heightPercentageToPx(4.92),
        marginTop: heightPercentageToPx(3.94),
    },
    backButtonContainer: {
        backgroundColor: '#141539',
        justifyContent: 'center',
        alignItems: 'center',
        width: heightPercentageToPx(4.92),
        height: heightPercentageToPx(4.92),
        borderRadius: widthPercentageToPx(5.33),
        marginRight: widthPercentageToPx(4.26),
        paddingTop: heightPercentageToPx(0.49),
    },
    streamerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    streamerImage: {
        width: heightPercentageToPx(4.92),
        height: heightPercentageToPx(4.92),
        borderRadius: heightPercentageToPx(2.46),
    },
    streamerName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 0.5,
        lineHeight: heightPercentageToPx(2.46),
        marginLeft: widthPercentageToPx(2.13),
    },
    streamerLive: {
        backgroundColor: '#FF006B',
        width: widthPercentageToPx(3.2),
        height: widthPercentageToPx(3.2),
        borderRadius: widthPercentageToPx(1.6),
        marginLeft: widthPercentageToPx(1.6),
    },
});