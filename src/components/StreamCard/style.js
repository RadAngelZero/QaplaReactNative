import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        marginTop: 60,
        backgroundColor: '#14183300',
        marginHorizontal: 13,
        width: widthPercentageToPx(72),
        borderRadius: 20,
    },
    backgroundImageContainer: {
        height: widthPercentageToPx(53.33),
        justifyContent: 'center',
        borderRadius: 20,
    },
    backgroundImage: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },
    titleContainer: {
        marginLeft: widthPercentageToPx(1.33),
        marginRight: widthPercentageToPx(1.33),
        marginTop: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 1,
        color: '#FFF',
        lineHeight: 22,
        minHeight: heightPercentageToPx(5.42),
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 8,
    },
    eventSponsorImage: {
        height: 46,
        width: 92,
        alignSelf: 'flex-end',
        marginRight: 36,
        resizeMode: 'contain',
    },
    dateContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 13.5,
        marginBottom: 20,
    },
    dateSubContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        color: '#FFF',
        marginLeft: widthPercentageToPx(2.13),
        fontSize: 11,
        fontWeight: '500',
        lineHeight: 26,
        letterSpacing: 0.5

    },
    streamerDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        width: widthPercentageToPx(51.47),
        height: heightPercentageToPx(7.27),
        borderRadius: 20
    },
    streamerDetailsTouchable: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        padding: 12
    },
    streamPlatformText: {
        fontSize: 16,
        flexShrink: 1,
        fontWeight: '700',
        lineHeight: 20,
        color: '#FFF',
        marginLeft: 8,
        letterSpacing: 0.5
    },
    streamerPhoto: {
        borderRadius: 30,
        height: 35,
        width: 35,
    },
});