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
        paddingTop: heightPercentageToPx(3.94),
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
        height: heightPercentageToPx(85),
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
        width: widthPercentageToPx(70),
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
        width: widthPercentageToPx(20.53),
        maxWidth: widthPercentageToPx(20.53),
        height: heightPercentageToPx(3.44),
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
        lineHeight: heightPercentageToPx(2.71),
    },
    personalizeButtonContainer: {
        marginTop: 18 * getScreenSizeMultiplier(),
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
        marginTop: heightPercentageToPx(1.41),
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
        paddingHorizontal: 24 * getScreenSizeMultiplier(),
        paddingVertical: 16 * getScreenSizeMultiplier(),
        borderRadius: 20 * getScreenSizeMultiplier(),
        borderTopLeftRadius: 4 * getScreenSizeMultiplier(),
        marginTop: 16 * getScreenSizeMultiplier(),
        alignSelf: 'flex-start',
    },
    chatBubbleText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24 * getScreenSizeMultiplier(),
        maxWidth: 250 * getScreenSizeMultiplier(),
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
        paddingHorizontal: 17 * getScreenSizeMultiplier(),
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
        height: heightPercentageToPx(42),
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
});