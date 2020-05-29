import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        marginTop: 14,
        backgroundColor: '#141833',
        alignSelf: 'center',
        width: widthPercentageToPx(95),
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10
    },
    backgroundImageContainer: {
        width: widthPercentageToPx(95),
        height: heightPercentageToPx(100) / (heightPercentageToPx(100) > 850 ? 6 : 5),
        justifyContent: 'space-between'
    },
    backgroundImage: {
        borderRadius: 20
    },
    titleContainer: {
        width: widthPercentageToPx(95),
        alignItems: 'flex-end'
    },
    title: {
        maxWidth: widthPercentageToPx(35),
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: .38,
        color: '#FFF',
        lineHeight: 24,
        textAlign: 'right',
        marginTop: 16,
        marginRight: 28
    },
    body: {
        marginLeft: 14,
        marginRight: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 8
    },
    eventSponsorImage: {
        height: 46,
        width: 92,
        alignSelf: 'flex-end',
        marginRight: 36,
        resizeMode: 'contain'
    },
    streamerDetails: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    streamPlatformText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FFF'
    },
    streamerPhoto: {
        marginLeft: 12,
        borderRadius: 30,
        height: 32,
        width: 32
    }
});