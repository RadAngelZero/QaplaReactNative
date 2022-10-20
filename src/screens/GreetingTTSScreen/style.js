import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1021'
    },
    closeIcon: {
        position: 'absolute',
        top: 32,
        left: 16
    },
    innerConatiner: {
        paddingHorizontal: widthPercentageToPx(4.26),
        paddingTop: heightPercentageToPx(2),
    },
    addTTSContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },
    chatContainer: {
        flex: 1,
        position: 'absolute',
        width: widthPercentageToPx(100),
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
    },
    chatBottomContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 32,
    },
    chatInputContainer: {
        flex: 1,
        backgroundColor: '#141539',
        borderRadius: 18,
        height: heightPercentageToPx(5.25),
        paddingHorizontal: 16
    },
    chatTextInput: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
    },
    chatSendIcon: {
        marginLeft: 16,
        minWidth: widthPercentageToPx(8),
        minHeight: widthPercentageToPx(8),
        maxWidth: widthPercentageToPx(8),
        maxHeight: widthPercentageToPx(8),
    },
    chatBubbleContainer: {
        backgroundColor: '#141539',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 20,
        borderTopLeftRadius: 4,
        marginTop: 16,
        alignSelf: 'flex-start',
    },
    chatBubbleText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 19,
        maxWidth: widthPercentageToPx(66.66)
    },
    whiteText: {
        color: '#FFF'
    },
    optionOuterConainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    marginTop16: {
        marginTop: 16
    },
    optionOutIconMargin: {
        marginRight: 16
    },
    userChatBubbleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3D42DF',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 20,
        borderTopRightRadius: 4,
        marginTop: 16,
        alignSelf: 'flex-end',
    },
    optionsContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginTop: heightPercentageToPx(0.49),
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: heightPercentageToPx(1.84),
    },
    readyButton: {
        padding: 2,
        borderRadius: 20,
        backgroundColor: '#00FFDD',
        color: '#000',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
});