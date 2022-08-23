import { StyleSheet } from 'react-native';
import { getScreenSizeMultiplier, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1021',
    },
    innerConatiner: {
        flex: 1,
        paddingHorizontal: widthPercentageToPx(4.26),
        paddingTop: heightPercentageToPx(2),
    },
    backButton: {
    },
    backButtonIconOffset: {
        marginLeft: widthPercentageToPx(-0.65),
        marginTop: heightPercentageToPx(-0.05),
    },
    feedBackButtonPos: {
        position: 'absolute',
        right: widthPercentageToPx(4.8),
    },
    feedLiveIcon: {
        backgroundColor: '#FF006B',
        width: widthPercentageToPx(3.2),
        height: widthPercentageToPx(3.2),
        borderRadius: widthPercentageToPx(1.6),
        marginLeft: widthPercentageToPx(2.13),
        marginTop: heightPercentageToPx(0.49),
    },
    whiteText: {
        color: '#fff',
    },
    accentTextColor: {
        color: '#00FFDD',
    },
    semitransparentText: {
        color: '#FFFFFF99',
    },
    feedMainContainer: {
    },
    feedBrowserBottomVisible: {
        height: heightPercentageToPx(24.63),
    },
    feedSectionHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: widthPercentageToPx(4.26),
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerMargins: {
        marginTop: heightPercentageToPx(3.94),
        marginBottom: heightPercentageToPx(2.95),
    },
    feedSectionHeader: {
        fontWeight: '700',
        fontSize: 22,
        lineHeight: heightPercentageToPx(3.44),
        letterSpacing: 1,
    },
    feedSectionHeaderMarginTop: {
        marginTop: heightPercentageToPx(2.46),
    },
    widthMax: {
        width: widthPercentageToPx(100),
    },
    screenHeaderText: {
        fontSize: 22,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(3.94),
    },
    headerMaxWidth: {
        maxWidth: widthPercentageToPx(56.8),
    },
    addVisualHeaderMaxWidth: {
        maxWidth: widthPercentageToPx(62.66),
    },
    screenHeaderTextAddTTS: {
        maxWidth: widthPercentageToPx(68.26),
    },
    helpButton: {
        backgroundColor: '#22272F',
        width: widthPercentageToPx(5.33),
        height: widthPercentageToPx(5.33),
        borderRadius: widthPercentageToPx(2.66),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: widthPercentageToPx(2.66),
    },
    personalizeButtonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: heightPercentageToPx(0.98),
    },
    gridMainContainer: {
        position: 'absolute',
        backgroundColor: '#141539',
        bottom: 0,
        borderTopLeftRadius: widthPercentageToPx(10.66),
        borderTopRightRadius: widthPercentageToPx(10.66),
        width: widthPercentageToPx(100),
    },
    gridSearchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: heightPercentageToPx(4.92),
        marginTop: heightPercentageToPx(1.97),
        paddingHorizontal: widthPercentageToPx(4.26),
        justifyContent: 'space-between',
    },
    gridElementContainer: {
        borderRadius: widthPercentageToPx(2.66),
        marginBottom: heightPercentageToPx(0.98),
        marginHorizontal: widthPercentageToPx(1.06),
        overflow: 'hidden',
    },
    searchBar: {
        flexDirection: 'row',
        height: heightPercentageToPx(4.92),
        borderRadius: widthPercentageToPx(13.33),
        paddingHorizontal: widthPercentageToPx(4.8),
        alignSelf: 'center',
        alignItems: 'center',
    },
    gridSearchBar: {
        backgroundColor: '#0D1021',
        width: widthPercentageToPx(91.46),
    },
    streamerSearchBar: {
        backgroundColor: '#141539',
        width: widthPercentageToPx(78.66),
        marginLeft: widthPercentageToPx(2.13),
    },
    searchIcon: {
        transform: [{ scale: getScreenSizeMultiplier() }]
    },
    gridSearchBarTextInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 1,
        textAlignVertical: 'center',
        marginLeft: widthPercentageToPx(2.66),
    },
    gridPoweredbyGiphy: {
        flex: 1,
        width: widthPercentageToPx(27.66),
        maxWidth: widthPercentageToPx(27.66),
        height: heightPercentageToPx(1.23),
    },
    memesContainer: {
        position: 'absolute',
        backgroundColor: '#141539',
        height: heightPercentageToPx(85),
        bottom: 0,
        borderTopLeftRadius: widthPercentageToPx(10.66),
        borderTopRightRadius: widthPercentageToPx(10.66),
        width: widthPercentageToPx(100),
        overflow: 'hidden',
    },
    gridMemeContainer: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        // marginTop: heightPercentageToPx(1.97),
        paddingHorizontal: widthPercentageToPx(1.6),
    },
    gridMemeSubContainer: {
        paddingTop: heightPercentageToPx(1.6),
        paddingBottom: heightPercentageToPx(10),
    },
    gridMasonryContainer: {
        flex: 1,
        marginTop: heightPercentageToPx(1.97),
        paddingHorizontal: widthPercentageToPx(1.6),
    },
    gridMasonrySubContainer: {
        paddingBottom: heightPercentageToPx(10),
    },
    gridBottomSectionSelector: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#141539',
        height: heightPercentageToPx(9.23),
        width: widthPercentageToPx(100),
        borderTopLeftRadius: widthPercentageToPx(8),
        borderTopRightRadius: widthPercentageToPx(8),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    gridBottomSelectionSelectorButton: {
        paddingHorizontal: widthPercentageToPx(3.46),
        paddingVertical: heightPercentageToPx(0.73),
        borderRadius: widthPercentageToPx(1.6),
        marginHorizontal: widthPercentageToPx(1.06),
    },
    gridBottomSelectionSelectorButtonText: {
        fontSize: 17,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.21),
    },
    personalizeButtonContainer: {
        marginTop: heightPercentageToPx(2.21),
    },
    personalizeButtonBackgroundImage: {
        width: widthPercentageToPx(43),
        height: widthPercentageToPx(43),
        borderRadius: widthPercentageToPx(5),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    personalizeButtonIconContainer: {
        display: 'flex',
        transform: [{ scale: getScreenSizeMultiplier() }],
    },
    personalizeButtonIconText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.5),
        marginTop: heightPercentageToPx(0.73),
    },
    qoin: {
        maxWidth: widthPercentageToPx(6.6),
        maxHeight: widthPercentageToPx(6.6),
    },
    personalizeButtonDisplayQoinsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#141833',
        borderRadius: widthPercentageToPx(2.66),
        paddingHorizontal: widthPercentageToPx(3.46),
        paddingVertical: heightPercentageToPx(0.73),
        marginBottom: heightPercentageToPx(3.07),
        shadowColor: '#000',
        shadowOffset: { width: widthPercentageToPx(1), height: heightPercentageToPx(1.23) },
        shadowOpacity: 0.5,
        shadowRadius: widthPercentageToPx(2.66),
        elevation: widthPercentageToPx(2.66),
    },

    personalizeButtonDisplayQoinsText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.58),
        letterSpacing: -0.3199999928474426,
        marginLeft: widthPercentageToPx(2.13),
    },
    interactionSelectedScreenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: heightPercentageToPx(30.04),
    },
    interactionSelectedConatiner: {
        borderRadius: widthPercentageToPx(2.66),
        overflow: 'hidden',
        overlayColor: '#00f',
    },
    interactionSelectedBorderRadius: {
        borderRadius: widthPercentageToPx(2.66),
        maxHeight: heightPercentageToPx(40),
        maxWidth: widthPercentageToPx(80),
        overflow: 'hidden',
    },
    addTTSContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },
    chatBubbleContainer: {
        backgroundColor: '#141539',
        paddingHorizontal: widthPercentageToPx(6.4),
        paddingVertical: heightPercentageToPx(1.97),
        borderRadius: widthPercentageToPx(5.33),
        borderTopLeftRadius: widthPercentageToPx(1.06),
        marginTop: heightPercentageToPx(1.97),
        alignSelf: 'flex-start',
    },
    userChatBubbleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3D42DF',
        paddingHorizontal: widthPercentageToPx(6.4),
        paddingVertical: heightPercentageToPx(1.97),
        borderRadius: widthPercentageToPx(5.33),
        borderTopLeftRadius: widthPercentageToPx(1.06),
        marginTop: heightPercentageToPx(1.97),
        alignSelf: 'flex-end',
    },
    chatBubbleText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: heightPercentageToPx(2.95),
        maxWidth: widthPercentageToPx(66.66),
    },
    chatBubbleTextAccent: {
        fontWeight: '500',
    },
    buttonsContainer: {
        maxWidth: widthPercentageToPx(69.33),
        alignSelf: 'center',
        paddingBottom: heightPercentageToPx(4.06),
    },
    bottomButton: {
        width: widthPercentageToPx(69.33),
        height: heightPercentageToPx(9.11),
        borderRadius: widthPercentageToPx(9.86),
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomButtonBackground: {
        backgroundColor: '#3B4BF9',
    },
    bottomButtonText: {
        fontSize: 17,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.71),
        letterSpacing: 0.492000013589859,
    },
    noBottomButton: {
        alignSelf: 'center',
    },
    noBottomButtomText: {
        color: '#FFFFFF99',
        letterSpacing: 1,
    },
    noBottomButtonTextAccent: {
        fontWeight: '700',
    },
    chatContainer: {
        flex: 1,
        position: 'absolute',
        width: widthPercentageToPx(100),
        justifyContent: 'flex-end',
        paddingHorizontal: widthPercentageToPx(4.26),
    },
    chatSenderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatSenderImage: {
        width: widthPercentageToPx(8.53),
        height: widthPercentageToPx(8.53),
        borderRadius: widthPercentageToPx(4.26),
    },
    chatSenderText: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.46),
        marginLeft: widthPercentageToPx(2.13),
    },
    chatBottomContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: heightPercentageToPx(4.43),
    },
    chatInputContainer: {
        flex: 1,
        backgroundColor: '#141539',
        borderRadius: widthPercentageToPx(4.8),
        height: heightPercentageToPx(4.92),
        paddingHorizontal: widthPercentageToPx(4.53),
    },
    chatTextInput: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: heightPercentageToPx(2.95),
    },
    chatSendIcon: {
        marginLeft: widthPercentageToPx(4.26),
        minWidth: widthPercentageToPx(8),
        minHeight: widthPercentageToPx(8),
        maxWidth: widthPercentageToPx(8),
        maxHeight: widthPercentageToPx(8),
    },
    checkoutItemContainer: {
        borderRadius: widthPercentageToPx(2.66),
        maxHeight: heightPercentageToPx(20),
        maxWidth: widthPercentageToPx(60),
        overflow: 'hidden',
        justifyContent: 'center',
    },
    checkoutChatBubble: {
        backgroundColor: '#3B4BF9',
        borderRadius: widthPercentageToPx(5.33),
        borderTopLeftRadius: widthPercentageToPx(1.06),
        paddingHorizontal: widthPercentageToPx(6.4),
        paddingVertical: heightPercentageToPx(1.97),
        marginTop: heightPercentageToPx(0.98),
        alignSelf: 'flex-start',
    },
    checkoutChatBubbleText: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.95),
    },
    checkoutContainer: {
        marginTop: heightPercentageToPx(1.97),
    },
    checkoutDataDisplayMainContainer: {
        backgroundColor: '#141539',
        padding: widthPercentageToPx(6.4),
        borderRadius: widthPercentageToPx(6.66),
    },
    checkoutDataDisplayContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    checkoutDataDisplayText: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.33),
        letterSpacing: 1,
    },
    checkoutDataDisplayTextRegular: {
        fontWeight: '500',
        lineHeight: heightPercentageToPx(3.94),
    },
    checkoutMarginDisplay: {
        height: heightPercentageToPx(5),
    },
    marginTop8: {
        marginTop: heightPercentageToPx(0.98),
    },
    marginTop16: {
        marginTop: heightPercentageToPx(1.97),
    },
    marginTop30: {
        marginTop: heightPercentageToPx(3.69),
    },
    sentContainer: {
        marginTop: heightPercentageToPx(12.31),
        alignItems: 'center',
    },
    sentCircle: {
        height: heightPercentageToPx(17.24),
    },
    sentText: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: heightPercentageToPx(2.95),
        maxWidth: widthPercentageToPx(54.4),
        marginTop: heightPercentageToPx(3.69),
    },
    onlyQoinsText: {
        maxWidth: widthPercentageToPx(71.4),
    },
    onlySendQoinsContainer: {
        position: 'absolute',
        display: 'flex',
        alignSelf: 'center',
        bottom: heightPercentageToPx(4.92),
    },
    onlySendQoinsTouchable: {
        display: 'flex',
        alignSelf: 'center',
    },
    onlySendTTS: {
        bottom: heightPercentageToPx(12.93),
    },
    onlySendQoinsText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: heightPercentageToPx(3.44),
        letterSpacing: 1,
    },
    onlyQoinsImage: {
        width: widthPercentageToPx(44.73),
        height: widthPercentageToPx(44.73),
    },
    loadingDots: {
        backgroundColor: '#3D42DF',
        width: widthPercentageToPx(3.2),
        height: widthPercentageToPx(3.2),
        borderRadius: widthPercentageToPx(1.6),
        marginHorizontal: widthPercentageToPx(1.33),
    },
    noMarginLeft: {
        marginLeft: 0,
    },
    noMarginRight: {
        marginRight: 0,
    },
    loadingDotsContainer: {
        flexDirection: 'row',
    },
    transparentText: {
        color: '#0000',
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
    marginRight16: {
        marginRight: widthPercentageToPx(4.26),
    },
    smallQoin: {
        maxWidth: widthPercentageToPx(4.26),
        maxHeight: widthPercentageToPx(4.26),
    },
    optionQoinsMargin: {
        marginRight: widthPercentageToPx(1.06),
    },
    optionOutIconMargin: {
        marginRight: widthPercentageToPx(4),
    },
    optionPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: widthPercentageToPx(8.53),
    },
    optionOuterConainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    prepaidReactionsContainer: {
        backgroundColor: '#1C1E64',
        marginTop: heightPercentageToPx(2.95),
        padding: widthPercentageToPx(2.13),
        flexDirection: 'row',
        alignItems: 'center',
    },
    interactionIconMargin: {
        marginRight: widthPercentageToPx(1.6),
        maxWidth: widthPercentageToPx(4.26),
        maxHeight: widthPercentageToPx(4.26),
    },
    marginTop24: {
        marginTop: heightPercentageToPx(2.95),
    },
    checkoutTotalText: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 1,
    },
    messageSentContainer: {
        backgroundColor: '#4D00FB',
        marginTop: heightPercentageToPx(0.98),
        justifyContent: 'flex-start',
        paddingVertical: heightPercentageToPx(1.97),
        paddingHorizontal: widthPercentageToPx(6.4),
        alignSelf: 'flex-start',
        borderRadius: widthPercentageToPx(5.33),
        zIndex: 100,
    },
    messageSentTextAccent: {
        color: '#0AFFD2',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.3499999940395355,
        alignSelf: 'flex-start',
    },
    messageSent: {
        color: '#fff',
        fontWeight: '500',
    },
    messageSentMessageContainer: {
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        paddingVertical: heightPercentageToPx(1.97),
        paddingHorizontal: widthPercentageToPx(6.4),
        marginLeft: widthPercentageToPx(1.86),
        borderRadius: widthPercentageToPx(5.33),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: heightPercentageToPx(-1.97),
    },
    messageSentMessageText: {
        color: '#0D1021',
        fontSize: 16,
        fontWeight: '700',
    },
    checkoutSectionHeaderText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(3.94),
    },
    addOnsContainer: {
        flexDirection: 'row',
        width: widthPercentageToPx(91.2),
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: heightPercentageToPx(1.97),
    },
    AddonContainer: {
        borderRadius: widthPercentageToPx(5.33),
        overflow: 'hidden',
    },
    checkoutAddonImageContainer: {
        flexDirection: 'column',
        width: widthPercentageToPx(44.53),
        height: heightPercentageToPx(16),
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: widthPercentageToPx(5.33),
    },
    addonEmojiText: {
        fontSize: 26,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(6.52),
    },
    addonText: {
        color: '#0D1021',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.33),
        marginBottom: heightPercentageToPx(1.35),
    },
    checkoutAddonQoinDisplayCointainer: {
        flexDirection: 'row',
        backgroundColor: '#141833',
        marginBottom: heightPercentageToPx(1.23),
        paddingHorizontal: widthPercentageToPx(3.46),
        paddingVertical: heightPercentageToPx(0.73),
        alignItems: 'center',
        borderRadius: widthPercentageToPx(2.66),
    },
    addonQoin: {
        maxWidth: widthPercentageToPx(4.26),
        maxHeight: widthPercentageToPx(4.26),
    },
    addonQoinText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.33),
        marginLeft: widthPercentageToPx(1.06),
    },
    extraTipOptionsContainer: {
        flexDirection: 'row',
        width: widthPercentageToPx(91.2),
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    extraTipContainer: {
        flexDirection: 'row',
        backgroundColor: '#141833',
        width: widthPercentageToPx(21.33),
        height: widthPercentageToPx(21.33),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: widthPercentageToPx(5.33),
    },
    extraTipText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.33),
        marginLeft: widthPercentageToPx(1.06),
    },
    totalArrow: {
        maxWidth: 32,
        maxHeight: 32,
        marginLeft: 8,
    },
    checkoutSendButton: {
        backgroundColor: '#00FFDD',
        marginTop: heightPercentageToPx(2.95),
        alignItems: 'center',
        paddingVertical: heightPercentageToPx(3.2),
        borderRadius: widthPercentageToPx(9.86),
    },
    checkoutSendButtonText: {
        color: '#000',
        fontSize: 17,
        fontWeight: '700',
        lineHeight: heightPercentageToPx(2.41),
        letterSpacing: 0.492000013589859,
    },
    /**
     * PrepaidInteractionsInsertGiphyText
     */
     insertGiphyTextContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },
    insertGiphyTextHeader: {
        marginTop: 32,
        marginLeft: 16
    },
    insertGiphyTextLimit: {
        color: '#FFF',
        textAlign: 'center',
        flexWrap: 'wrap',
        fontSize: 16,
        maxWidth: 250
    },
    insertGiphyTextTextInputContainer: {
        backgroundColor: '#141539',
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    insertGiphyTextTextInput: {
        flex: 1,
        backgroundColor: '#0D1021',
        color: '#FFF',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 8,
        borderRadius: 18,
        fontSize: 16,
        marginRight: 8
    }
});