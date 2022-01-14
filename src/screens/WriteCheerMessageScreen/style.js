import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1021'
    },
    headerBar: {
        flexDirection: 'row',
        marginLeft: 24,
    },
    sendAMessageText: {
        marginTop: 12,
        marginLeft: 24,
        fontSize: 22,
        fontWeight: '500',
        lineHeight: 32,
        color: '#FFF',
        width: widthPercentageToPx(50)
    },
    skipButton: {
        marginRight: 24,
        borderRadius: 100,
        backgroundColor: 'rgba(64, 64, 255, 0.3)',
        width: widthPercentageToPx(23.5),
        height: heightPercentageToPx(5.05),
        justifyContent: 'center',
        marginLeft: 'auto'
    },
    skipButtonText: {
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.65);'
    },
    scrollViewContainer: {
        paddingRight: 16,
        paddingLeft: 16,
        flexGrow: 1,
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    botInformation: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    botName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFF',
        marginLeft: 8
    },
    botMessageBubble: {
        marginTop: 10,
        borderRadius: 20,
        borderTopLeftRadius: 4,
        backgroundColor: '#141539',
        paddingTop: 16,
        paddingRight: 24,
        paddingLeft: 24,
        paddingBottom: 10,
        maxWidth: widthPercentageToPx(75),
        marginBottom: 12
    },
    botMessageText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        color: '#FFF'
    },
    userMessageText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        color: '#FFF',
        textAlign: 'right'
    },
    botWrittingBubble: {
        flexDirection: 'row',
        marginTop: 10,
        borderRadius: 20,
        borderTopLeftRadius: 4,
        backgroundColor: '#141539',
        paddingTop: 16,
        paddingRight: 24,
        paddingLeft: 24,
        paddingBottom: 15,
        width: widthPercentageToPx(25.6),
        marginBottom: 12
    },
    userMessageBubble: {
        alignSelf: 'flex-end',
        borderRadius: 20,
        borderTopRightRadius: 4,
        backgroundColor: '#3D42DF',
        paddingTop: 16,
        paddingRight: 24,
        paddingLeft: 24,
        paddingBottom: 10,
        maxWidth: widthPercentageToPx(75),
        marginBottom: 12
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    messageInput: {
        minHeight: heightPercentageToPx(5),
        flex: 1,
        borderRadius: 18,
        marginRight: 8,
        marginLeft: 16,
        marginTop: 12,
        marginBottom: 12,
        backgroundColor: '#141539',
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 50,
        paddingBottom: 8,
        fontSize: 16,
        fontWeight: '400',
        color: '#FFF',
        lineHeight: 24
    },
    sendCheersButton: {
        backgroundColor: '#00FFDC',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(11),
        justifyContent: 'center'
    },
    sendCheersText: {
        fontSize: 17,
        fontWeight: '800',
        color: '#0D1022',
        letterSpacing: .5,
        textAlign: 'center'
    },
    backButtonContainer: {
        backgroundColor: '#0D1021'
    }
});