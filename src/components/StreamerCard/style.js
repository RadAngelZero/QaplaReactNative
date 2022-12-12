import { StyleSheet } from 'react-native';

import { widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        borderRadius: 25,
        backgroundColor: '#141833',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        paddingBottom: 32,
        marginBottom: 30,
    },
    smallCard: {
        width: 168,
        alignSelf: 'center',
        borderRadius: 25,
        backgroundColor: '#141833',
        justifyContent: 'flex-start',
        paddingHorizontal: 18,
        overflow: 'hidden',
        paddingBottom: 20,
        marginBottom: 30,
    },
    coverImage: {
        display: 'flex',
        alignSelf: 'center',
        width: '100%',
        height: 90,
    },
    smallCoverImage: {
        display: 'flex',
        alignSelf: 'center',
        width: 168,
        height: 64,
    },
    streamerImage: {
        height: 90,
        width: 90, // We use height to get a circular Image component
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: -45, // Margin with (negative) half of height/width to center the streamerImage with coverImage
    },
    smallStreamerImage: {
        height: 65,
        width: 65, // We use height to get a circular Image component
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: -30, // Margin with (negative) half of height/width to center the streamerImage with coverImage
    },
    streamerNameContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    streamerName: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 22,
        marginRight: 6,
    },
    miniStreamerName: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 22,
        marginRight: 6,
        letterSpacing: -0.41
    },
    bio: {
        marginTop: 24,
        color: '#FFF',
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '500',
        paddingHorizontal: 18,
    },
    viewMore: {
        color: '#3366BB',
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '500'
    },
    tagsContainer: {
        maxHeight: 80,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        marginTop: 24,
        overflow: 'hidden',
        paddingHorizontal: 18,
    },
    tags: {
        height: 30,
        marginRight: 6,
        marginBottom: 10,
    },
    tagText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 14
    },
    loadingCard: {
        width: widthPercentageToPx(91.46),
        /**
         * Sum of all the heights, margin tops and margin bottoms from the elements inside the card, so the
         * loadingCard has the same height than a normal card
         */
        height: 396,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#141833',
        overflow: 'hidden',
        marginBottom: 30,
    },
    loadingText: {
        fontSize: 18,
        lineHeight: 22,
        color: 'rgba(255, 255, 255, .7)',
        fontWeight: '600',
        textAlign: 'center'
    },
    streamerDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        width: widthPercentageToPx(51.47),
        height: heightPercentageToPx(7.27),
        padding: 12,
        borderRadius: 20
    },
    streamerPhoto: {
        borderRadius: 30,
        height: 35,
        width: 35,
    },
    streamPlatformText: {
        fontSize: 16,
        flexShrink: 1,
        fontWeight: '700',
        lineHeight: 20,
        color: '#FFF',
        marginLeft: 8,
        letterSpacing: 0.5
    },
});