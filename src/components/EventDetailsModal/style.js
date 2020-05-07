import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';

export default styles = StyleSheet.create({
    mainContainer: {
		flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(100)
    },
    closeIcon: {
        position: 'absolute',
        top: heightPercentageToPx(7),
        right: widthPercentageToPx(4),
        borderRadius: 100
    },
    container: {
        marginTop: heightPercentageToPx(14),
        width: widthPercentageToPx(100),
        backgroundColor: Colors.modals.backgroundDarkModal,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(1.48),
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        alignItems: 'center'
    },
    eventInfoContainer: {
        alignItems: 'center'
    },
    backgroundImageContainer: {
        height: heightPercentageToPx(20),
        width: widthPercentageToPx(100)
    },
    backgroundImage: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    eventTitle: {
        alignSelf: 'flex-end',
        maxWidth: '40%',
        marginTop: 12,
        marginRight: 36,
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'right'
    },
    eventSponsorContainer: {
        marginTop: 24
    },
    eventSponsorImage: {
        height: 46,
        width: 92,
        alignSelf: 'flex-end',
        marginRight: 36,
        resizeMode: 'contain'
    },
    eventCard: {
        backgroundColor: Colors.eventCardBackground,
        borderRadius: 20,
        paddingTop: 14,
        paddingBottom: 16,
        paddingLeft: 24,
        paddingRight: 24,
        width: '95%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20
    },
    streamerCard: {
        marginTop: 20
    },
    eventCardTitle: {
        fontSize: 15,
        lineHeight: 20,
        color: 'rgba(235,235,245,0.6)'
    },
    divider: {
        marginTop: 8,
        backgroundColor: '#1B1D49',
        height: 1,
        borderRadius: 30
    },
    streamerInfoContainer: {
        marginTop: 12,
        marginRight: 2,
        marginLeft: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    streamerDataContainer: {
        flexDirection: 'row'
    },
    streamerPhoto: {
        height: 55,
        width: 55,
        backgroundColor: Colors.eventCardBackground,
        borderRadius: 100
    },
    streamerDetails: {
        marginLeft: 8,
        justifyContent: 'space-evenly'
    },
    streamerName: {
        fontSize: 16,
        lineHeight: 22,
        color: '#FFF'
    },
    streamerChannelContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    streamingPlatformImage: {
        height: 20,
        width: 20
    },
    streamerChannelName: {
        fontSize: 8,
        color: '#FFF',
        textAlign: 'left'
    },
    followButtonContainer: {
        borderRadius: 18,
        backgroundColor: '#6C7AE5'
    },
    followButtonText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        marginTop: 7,
        marginBottom: 7,
        marginLeft: 20,
        marginRight: 20
    },
    dateCard: {
        marginTop: 20
    },
    dateInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 4,
        paddingRight: 4,
        marginTop: 12
    },
    dateText: {
        fontSize: 34,
        color: '#FFF',
        fontWeight: 'bold'
    },
    dayContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    dayText: {
        fontSize: 12,
        color: '#FFF'
    },
    descriptionCard: {
        marginTop: 26
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
        marginTop: 14
    },
    descriptionBody: {
        fontSize: 18,
        color: '#FFF',
        marginTop: 8,
        lineHeight: 22
    },
    descriptionPrize: {
        fontSize: 18,
        color: '#FFF',
        lineHeight: 22
    },
    instructionsCard: {
        marginTop: 26
    },
    instructionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
        marginTop: 14
    },
    instructionBody: {
        fontSize: 18,
        color: '#FFF',
        marginTop: 8
    },
    participateButtonContainer: {
        backgroundColor: Colors.pinkQapla,
        borderRadius: 30,
        marginTop: 40,
        marginBottom: 36
    },
    participateButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 40,
        marginLeft: 40
    }
});