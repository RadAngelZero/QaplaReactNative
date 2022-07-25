import { StyleSheet } from 'react-native';
import { widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim'

export default styles = StyleSheet.create({
    container: {
        backgroundColor: '#0D1021'
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
        marginTop: heightPercentageToPx(3.94),
    },
    backButtonContainer: {
        marginRight: widthPercentageToPx(4.26),
    },
    backButtonShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        borderRadius: 100,
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