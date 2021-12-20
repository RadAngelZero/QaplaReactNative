import { StyleSheet } from 'react-native';

import { widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    card: {
        width: widthPercentageToPx(91.46),
        height: heightPercentageToPx(48.76),
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
        flexDirection: 'row',
        alignSelf: 'center',
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        marginTop: 24
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
    }
});