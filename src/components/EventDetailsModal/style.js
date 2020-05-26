import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';

export default styles = StyleSheet.create({
    // Event Details Modal
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
    // Event Details
    backgroundImageContainer: {
        height: heightPercentageToPx(20),
        width: widthPercentageToPx(100),
        justifyContent: 'center'
    },
    backgroundImage: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    eventTitle: {
        alignSelf: 'flex-end',
        maxWidth: '30%',
        marginTop: 8,
        marginRight: 36,
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'right'
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
        width: widthPercentageToPx(95),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20
    },
    waitingAnswerFeedback: {
        marginTop: 26,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.greenQapla,
        maxWidth: '60%'
    },
    streamerGameDataCard: {
        marginTop: 20
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
    streamerGameInfoContainer: {
        justifyContent: 'center',
        marginTop: 8
    },
    streamerGameInfoKey: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.greenQapla
    },
    streamerGameInfoValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    streamerGameInfoValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF'
    },
    copyIconContainer: {
        borderRadius: 30,
        height: 30,
        width: 30,
        backgroundColor: Colors.modals.bttnColor
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
        width: 65,
        resizeMode: 'contain'
    },
    streamerChannelName: {
        fontSize: 8,
        color: '#FFF',
        textAlign: 'left'
    },
    followButtonContainer: {
        width: widthPercentageToPx(25),
        borderRadius: 30,
        backgroundColor: Colors.modals.bttnColor
    },
    followButtonText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 12
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
    eventChatCard: {
        marginTop: 20
    },
    chatInfoContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    joinDiscordText: {
        fontSize: 18,
        color: '#FFF',
        maxWidth: '60%'
    },
    chatButtonContainer: {
        width: widthPercentageToPx(25),
        borderRadius: 30,
        backgroundColor: Colors.modals.bttnColor
    },
    chatButtonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 12,
        marginBottom: 12
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
    },
    // Event Registration
    fullHeightDialog: {
        minHeight: heightPercentageToPx(86)
    },
    nickNameTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 36,
        marginLeft: 40
    },
    registrationFieldsContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nickNameCard: {
        marginTop: 26
    },
    cardError: {
        borderColor: '#FF0000',
        borderWidth: 1
    },
    registerContainer: {
        width: '100%'
    },
    nickNameBody: {
        fontSize: 18,
        color: '#FFF',
        marginTop: 8,
        lineHeight: 22,
        maxWidth: widthPercentageToPx(75)
    },
    gameIdentifierTextInput: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'rgba(28,32,106,0.6)',
        borderRadius: 10,
        marginTop: 16,
        minHeight: 40,
        paddingLeft: 10,
        paddingRight: 8,
        color: '#FFF',
        marginBottom: 12
    },
    eventSponsorImageLarge: {
        height: 125,
        width: 250,
        resizeMode: 'contain'
    },
    continueButtonContainer: {
        backgroundColor: Colors.pinkQapla,
        borderRadius: 30,
        marginBottom: 36
    },
    continueButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 40,
        marginLeft: 40
    },
    smallErrorText: {
        fontSize: 12,
        lineHeight: 20,
        color: 'rgba(235,235,245,0.6)'
    },
    // EventRegistrationSuccessful
    mainFeedbackContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sentIconContainer: {
        alignSelf: 'center',
        marginTop: 24
    },
    endProcessFeedbackTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
        marginTop: 48
    },
    endProcessFeedbackDescription: {
        maxWidth: '95%',
        fontSize: 18,
        textAlign: 'center',
        color: '#FFF',
        marginTop: 16
    },
    streamerNameLink: {
        color: Colors.greenQapla
    },
    finishButtonContainer: {
        backgroundColor: Colors.modals.bttnColor,
        borderRadius: 30,
        marginBottom: 36
    },
    finishButtonText: {
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