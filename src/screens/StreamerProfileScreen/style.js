import { StyleSheet } from 'react-native';

import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1021'
    },
    topNav: {
        position: 'absolute',
        top: 24,
        left: 16,
        zIndex: 9999
    },
    backgroundImage: {
        height: heightPercentageToPx(20),
        width: '100%',
        zIndex: -1
    },
    photoContainer: {
        width: widthPercentageToPx(28),
        height: heightPercentageToPx(12.93),
        borderRadius: (widthPercentageToPx(28) + heightPercentageToPx(12.93)) / 2,
        position: 'absolute',
        left: 16,
        top: heightPercentageToPx(15),
        backgroundColor: '#0D1021',
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo: {
        width: widthPercentageToPx(24),
        height: heightPercentageToPx(11),
        borderRadius: (widthPercentageToPx(24) + heightPercentageToPx(11)) / 2
    },
    profileContainer: {
        marginRight: 16,
        marginLeft: 16
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        height: heightPercentageToPx(12.93) / 2 + 6,
        alignItems: 'flex-end'
    },
    followButton: {
        borderRadius: 20,
        backgroundColor: '#3B4BF9',
        width: widthPercentageToPx(28),
        height: heightPercentageToPx(5),
        justifyContent: 'center'
    },
    followButtonText: {
        color: '#FFF',
        textAlign: 'center'
    },
    iconContainer: {
        marginRight: 24,
        marginBottom: 16
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    streamerName: {
        marginTop: 8,
        color: '#FFF',
        fontSize: 21,
        marginRight: 8
    },
    bio: {
        marginTop: 20,
        color: '#FFF',
        fontSize: 16
    },
    tagsContainer: {
        marginTop: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: widthPercentageToPx(100)
    },
    tagsMargin: {
        marginRight: 8,
        marginBottom: 10
    },
    moreTags: {
        backgroundColor: '#4040FF'
    },
    upcomingStreamsContainer: {
        marginTop: 52
    },
    upcomingStreamsTitle: {
        fontSize: 22,
        color: '#FFF'
    },
    upcomingStreamImageLinearGradientBackground: {
        borderRadius: 24,
        marginTop: 32,
    },
    upcomingStreamImage: {
        width: widthPercentageToPx(91.5),
        height: heightPercentageToPx(23.5),
        borderRadius: 20
    },
    upcomingStreamTitle: {
        marginTop: 16,
        fontSize: 18,
        color: '#FFF'
    },
    nextStreamTimeContainer: {
        flexDirection: 'row',
        marginTop: 16
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: 12
    },
    timeText: {
        fontSize: 14,
        color: '#FFF',
        marginTop: 2,
        marginLeft: 8
    },
    streamerCommunityContainer: {
        marginTop: 60
    },
    streamerCommunityTitle: {
        color: '#FFF',
        fontSize: 22
    },
    socialButtonsContainer: {
        marginTop: 20
    },
    socialButton: {
        marginTop: 16
    }
});