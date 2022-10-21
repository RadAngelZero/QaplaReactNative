import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

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
    avatarImage: {
        position: 'absolute',
        height: heightPercentageToPx(60),
        width: widthPercentageToPx(100)
    },
    createAvatarBackgroundImage: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: heightPercentageToPx(30),
        width: widthPercentageToPx(91),
        paddingVertical: 24,
        justifyContent: 'space-between'
    },
    createAvatarTitle: {
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: -0.41,
        textAlign: 'center',
        color: '#FFF',
        maxWidth: widthPercentageToPx(50)
    },
    createAvatarButton: {
        borderRadius: 100,
        backgroundColor: '#00FFDD',
        paddingHorizontal: 24,
        paddingVertical: 16
    },
    createAvatarButtonText: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: -0.32,
        color: '#0D1022'
    },
    closeIcon: {
        marginTop: 32,
        marginLeft: 16,
        marginBottom: 16
    },
    editAvatarContainer: {
        // 43 is the desired size, the close icon has a margin top of 32 and a margin bottom of 16
        height: heightPercentageToPx(43) - 32 - 16
    },
    editButton: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#00FFDD',
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8
    },
    scrollView: {
        backgroundColor: '#0D1021',
        flex: 1,
        borderTopLeftRadius: widthPercentageToPx(10.66),
        borderTopRightRadius: widthPercentageToPx(10.66),
        paddingHorizontal: widthPercentageToPx(4.26),
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
        width: '100%',
        aspectRatio: 1,
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