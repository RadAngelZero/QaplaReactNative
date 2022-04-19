import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, getPercentWidth, getPercentHeight } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        marginTop: 60,
        backgroundColor: '#14183300',
        marginRight: 30,
        // alignSelf: 'center',
        width: widthPercentageToPx(getPercentWidth(260)),
        // height: heightPercentageToPx(getPercentHeight(360)),
        borderRadius: 20,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27,
        // elevation: 10,
    },
    backgroundImageContainer: {
        // width: '100%',
        // width: widthPercentageToPx(getPercentWidth(260)),
        height: widthPercentageToPx(getPercentWidth(195)),
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
        marginLeft: widthPercentageToPx(getPercentWidth(5)),
        marginRight: widthPercentageToPx(getPercentWidth(5)),
        marginTop: 16,
        // width: widthPercentageToPx(95),
        // alignItems: 'flex-end'
    },
    title: {
        // maxWidth: widthPercentageToPx(35),
        fontSize: heightPercentageToPx(getPercentHeight(22)),
        fontWeight: '500',
        letterSpacing: 1,
        color: '#FFF',
        lineHeight: heightPercentageToPx(getPercentHeight(24)),
        minHeight: heightPercentageToPx(getPercentHeight(48)),
        // textAlign: 'right',
    },
    body: {
        display: 'flex',
        // justifyContent: 'space-between',
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
        // height: heightPercentageToPx(getPercentHeight(16.5)),
    },
    dateSubContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
    },
    dateText: {
        color: '#FFF',
        marginLeft: widthPercentageToPx(getPercentWidth(8)),
    },
    streamerDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        width: widthPercentageToPx(getPercentWidth(190)),
        height: heightPercentageToPx(getPercentHeight(64)),
        padding: 12,
        borderRadius: 20,
        backgroundColor: '#f0f'

    },
    streamPlatformText: {
        fontSize: heightPercentageToPx(getPercentHeight(18)),
        fontWeight: '700',
        lineHeight: heightPercentageToPx(getPercentHeight(18)),
        color: '#FFF',
        marginLeft: widthPercentageToPx(getPercentWidth(10)),
    },
    streamerPhoto: {
        borderRadius: 30,
        height: 35,
        width: 35,
    },
});

function defineCardHeight() {
    if (heightPercentageToPx(100) >= 700) {
        return heightPercentageToPx(100) / 5;
    } else if (heightPercentageToPx(100) < 700) {
        return heightPercentageToPx(100) / 4;
    }
}