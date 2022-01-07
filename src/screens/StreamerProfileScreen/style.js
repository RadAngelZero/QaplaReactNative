import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1021'
    },
    topNav: {
        position: 'absolute',
        top: 36,
        left: 16,
        zIndex: 9999,
    },
    backgroundImage: {
        height: heightPercentageToPx(20),
        width: '100%',
        zIndex: -1
    },
    photoContainer: {
        width: heightPercentageToPx(12.93),
        height: heightPercentageToPx(12.93),
        borderRadius: (heightPercentageToPx(12.93) * 2) / 2,
        position: 'absolute',
        left: 16,
        top: heightPercentageToPx(15),
        backgroundColor: '#0D1021',
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo: {
        width: heightPercentageToPx(11),
        height: heightPercentageToPx(11),
        borderRadius: (heightPercentageToPx(11) * 2) / 2
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
        borderRadius: 100,
        backgroundColor: '#3B4BF9',
        width: widthPercentageToPx(28),
        height: heightPercentageToPx(5),
        justifyContent: 'center'
    },
    unfollowButton: {
        borderRadius: 20,
        backgroundColor: 'transparent',
        width: widthPercentageToPx(28),
        height: heightPercentageToPx(5),
        justifyContent: 'center',
        borderColor: '#3B4BF9',
        borderWidth: 2
    },
    followButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    },
    unfollowButtonText: {
        color: 'rgba(255, 255, 255, .6)',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    },
    iconContainer: {
        marginRight: 24,
        height: heightPercentageToPx(5),
        justifyContent: 'center'
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    streamerName: {
        marginTop: 8,
        color: '#FFF',
        fontSize: 21,
        marginRight: 8,
        fontWeight: '600',
        lineHeight: 22
    },
    bio: {
        marginTop: 20,
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22
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
    sectionTitle: {
        fontSize: 22,
        color: '#FFF',
        fontWeight: '700',
        lineHeight: 28
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
        color: '#FFF',
        fontWeight: '500',
        lineHeight: 22
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
        fontWeight: '500',
        marginTop: 2,
        marginLeft: 8
    },
    streamerCommunityContainer: {
        marginTop: 60
    },
    socialButtonsContainer: {
        marginTop: 20
    },
    socialButton: {
        marginTop: 16
    },
    creatorCodesContainer: {
        marginTop: 60
    },
    creatorCodeImage: {
        width: widthPercentageToPx(91.5),
        height: heightPercentageToPx(23.5),
        borderRadius: 20,
        marginTop: 16
    },
    createrCodeButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    creatorCodeButton: {
        position: 'absolute',
        bottom: 16
    },
    codeButton: {
        width: widthPercentageToPx(50),
        height: heightPercentageToPx(7.14),
        borderRadius: 20,
        backgroundColor: '#141539',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2.62,
        elevation: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 16,
        paddingLeft: 16
    },
    codeText: {
        flex: 1,
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22,
        textAlign: 'left',
        marginRight: 8
    },
    copyCode: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: 'rgba(64, 64, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    }
});