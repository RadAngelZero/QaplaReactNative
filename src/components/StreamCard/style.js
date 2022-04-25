import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        marginTop: 60,
        backgroundColor: '#14183300',
        marginRight: 30,
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
        justifyContent:'center',
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
        minHeight: heightPercentageToPx(5.91),
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
        flexDirection: 'row'
    },
    dateText: {
        color: '#FFF',
        marginLeft: widthPercentageToPx(2.1),
    },
    streamerDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        width: widthPercentageToPx(50.66),
        height: heightPercentageToPx(7.88),
        padding: 12,
        borderRadius: 20,
        backgroundColor: '#f0f'

    },
    streamPlatformText: {
        fontSize: heightPercentageToPx(2.22),
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.22),
        color: '#FFF',
        marginLeft: widthPercentageToPx(2.67),
    },
    streamerPhoto: {
        borderRadius: 30,
        height: 35,
        width: 35,
    },
});