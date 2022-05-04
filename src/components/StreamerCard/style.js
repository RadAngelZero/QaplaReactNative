import { StyleSheet } from 'react-native';

import { widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    card: {
        width: widthPercentageToPx(91.46),
        alignSelf: 'center',
        borderRadius: 25,
        backgroundColor: '#141833',
        justifyContent: 'flex-start',
        paddingRight: 18,
        paddingLeft: 18,
        overflow: 'hidden',
        paddingBottom: 40,
        marginBottom: 30
    },
    coverImage: {
        display: 'flex',
        alignSelf: 'center',
        width: widthPercentageToPx(91.46),
        height: heightPercentageToPx(13)
    },
    streamerImage: {
        height: heightPercentageToPx(12),
        width: heightPercentageToPx(12), // We use height to get a circular Image component
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: heightPercentageToPx(-6) // Margin with (negative) half of height/width to center the streamerImage with coverImage
    },
    streamerNameContainer: {
        height: heightPercentageToPx(3),
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    streamerName: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 22,
        marginRight: 6
    },
    bio: {
        height: heightPercentageToPx(10),
        marginTop: 24,
        color: '#FFF',
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '500'
    },
    viewMore: {
        color: '#3366BB',
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '500'
    },
    tagsContainer: {
        height: heightPercentageToPx(3.7) * 2 + 10, // Double the size of the tag + the marginBottom
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        marginTop: 24,
        overflow: 'hidden'
    },
    tags: {
        height: heightPercentageToPx(3.7),
        marginRight: 6,
        marginBottom: 10
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
        height: heightPercentageToPx(13) + heightPercentageToPx(12) + heightPercentageToPx(3) + heightPercentageToPx(10) + (heightPercentageToPx(3.7) * 2 + 10) + heightPercentageToPx(3.7) + 24 + 24 + 15 + heightPercentageToPx(-6) + 10,
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
    }
});