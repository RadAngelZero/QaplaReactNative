import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, getPercentHeight, getPercentWidth } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: '#14183300',
        marginHorizontal: 13,
        width: widthPercentageToPx(69.33),
        borderRadius: 20,
    },
    backgroundImageContainer: {
        height: widthPercentageToPx(53.33),
        justifyContent: 'center',
        borderRadius: 20,
    },
    backgroundImage: {
        borderRadius: 20,
        justifyContent:'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },
    thumbnailContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center'
    },
    thumbnail: {
        height: heightPercentageToPx(16.12)
    },
    titleContainer: {
        marginLeft: widthPercentageToPx(1.33),
        marginRight: widthPercentageToPx(1.33),
        marginTop: 16
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 1,
        color: '#FFF',
        lineHeight: heightPercentageToPx(2.95),
        minHeight: heightPercentageToPx(5.91)
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 8
    },
    eventSponsorImage: {
        height: 46,
        width: 92,
        alignSelf: 'flex-end',
        marginRight: 36,
        resizeMode: 'contain'
    },
    dateContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 13.5,
        marginBottom: 20
    },
    dateSubContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%'
    },
    dateText: {
        color: '#FFF',
        marginLeft: widthPercentageToPx(2.13),
    },
    streamerDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        width: widthPercentageToPx(getPercentWidth(193)),
        height: heightPercentageToPx(getPercentHeight(59)),
        padding: 12,
        borderRadius: 20,
        backgroundColor: '#f0f'

    },
    streamPlatformText: {
        fontSize: heightPercentageToPx(2.2),
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.2),
        color: '#FFF',
        marginLeft: widthPercentageToPx(2.66),
    },
    streamerPhoto: {
        borderRadius: 30,
        height: 35,
        width: 35,
    },
});