import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim';
import { HEADER_SIZE } from '../../utilities/Constants';
import Colors from '../../utilities/Colors';

export const styles = StyleSheet.create({
    marginTop16: {
        marginTop: heightPercentageToPx(1.97),
    },
    marginTop24: {
        marginTop: heightPercentageToPx(2.95),
    },
    mainContainer: {
        flex: 1,
    },
    blur: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    closeIcon: {
        marginTop: heightPercentageToPx(3.94),
        marginLeft: widthPercentageToPx(4.26),
    },
    scrollView: {
        backgroundColor: '#0D1021',
        flex: 1,
        marginTop: heightPercentageToPx(1.47),
        borderTopLeftRadius: widthPercentageToPx(10.66),
        borderTopRightRadius: widthPercentageToPx(10.66),
        paddingHorizontal: widthPercentageToPx(4.26),
    },
    scrollViewContentContainer: {
        alignItems: 'center',
    },
    topContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: heightPercentageToPx(3.94),
        paddingHorizontal: widthPercentageToPx(6.4),
        justifyContent: 'space-between',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImageContainer: {
        width: widthPercentageToPx(13.33),
        height: widthPercentageToPx(13.33),
        borderRadius: 20.5,
        overflow: 'hidden',
    },
    userImage: {
        flex: 1,
        height: 50,
        aspectRatio: 1,
        width: 50,
    },
    userUsername: {
        maxWidth: widthPercentageToPx(26.66),
        marginLeft: widthPercentageToPx(3.2),
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 22,
        letterSpacing: -0.40799999237060547,
    },
    twitchLinkedButton: {
        backgroundColor: '#8B46FF',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: widthPercentageToPx(4.26),
        paddingVertical: heightPercentageToPx(1.1),
        borderRadius: 50,
    },
    twitchLinkButton: {
        backgroundColor: '#0D1021',
        borderColor: '#8B46FF',
        borderWidth: widthPercentageToPx(0.08),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: widthPercentageToPx(4.26),
        paddingVertical: heightPercentageToPx(1.1),
        borderRadius: 50,
    },
    twitchLinkedText: {
        marginLeft: 4,
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 14,
    },
    twitchIcon: {
        maxWidth: widthPercentageToPx(4.26),
        maxHeight: widthPercentageToPx(4.26),
    },
    qoinsContainer: {
        width: '100%',
        padding: widthPercentageToPx(6.4),
        marginTop: heightPercentageToPx(2.95),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    myQoinsText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 21,
        letterSpacing: 0.3499999940395355,
    },
    qoinsDisplayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bigQoin: {
        minWidth: widthPercentageToPx(8),
        minHeight: widthPercentageToPx(8),
    },
    qoinsNumber: {
        marginLeft: widthPercentageToPx(2.13),
        color: '#fff',
        fontSize: 36,
        fontWeight: '700',
        lineHeight: 43,
        letterSpacing: 1,
    },
    qoinsSubtext: {
        marginTop: heightPercentageToPx(0.49),
        color: '#FFFFFF99',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 26,
        letterSpacing: 0.3499999940395355,
    },
    getQoinsButton: {
        backgroundColor: '#3B4BF9',
        paddingHorizontal: widthPercentageToPx(6.4),
        paddingVertical: heightPercentageToPx(1.47),
        borderRadius: 20,
    },
    getQoinsText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 21,
        letterSpacing: -0.3199999928474426,
    },
    subCategoryContanier: {
        backgroundColor: '#141539',
        borderRadius: 20,
        width: '100%',
        padding: widthPercentageToPx(6.4),
    },
    mySupportSubContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subCategoryHeaderText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 26,
        letterSpacing: 0.3499999940395355,
    },
    fontSize16: {
        fontSize: 16,
    },
    switchGroupContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    switchTextMaxWidth: {
        maxWidth: widthPercentageToPx(52.26),
    },
    switchHeaderText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 26,
        letterSpacing: 0.3499999940395355,
    },
    switchSubText: {
        color: '#FFFFFF99',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 17,
        letterSpacing: 0.3499999940395355,
        marginTop: heightPercentageToPx(0.24),
    },
    externalLinkIcon: {
        opacity: 0.6,
    },
    finalButtonsText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 26,
        letterSpacing: 0.3499999940395355,
        textAlign: 'center',
    },
    deleteTextColor: {
        color: '#FF2156',
    },
    bottomSeparation: {
        height: heightPercentageToPx(2.95),
    },
    supportDataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});