import { StyleSheet } from 'react-native';

import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .5)'
    },
    gridMainContainer: {
        position: 'absolute',
        backgroundColor: '#141539',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: widthPercentageToPx(100),
        maxHeight: heightPercentageToPx(55)
    },
    gridSearchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: heightPercentageToPx(4.92),
        marginTop: 16,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    closeIcon: {
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    searchBar: {
        flexDirection: 'row',
        borderRadius: 50,
        paddingHorizontal: 16,
        alignSelf: 'center',
        alignItems: 'center',
    },
    gridSearchBar: {
        backgroundColor: '#0D1021',
        width: widthPercentageToPx(80) - 16,
    },
    gridSearchBarTextInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 1,
        textAlignVertical: 'center',
        paddingVertical: 8,
        marginLeft: 8,
    },
    listContainer: {
        marginTop: 32,
        paddingHorizontal: 16,
        marginBottom: 40
    },
    recents: {
        marginTop: 24,
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: .5,
        color: '#C2C2C2'
    },
    noContentGifContainer: {
        alignItems: 'center'
    },
    noContentGif: {
        height: heightPercentageToPx(18.5)
    },
    noContentText: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 21.48,
        textAlign: 'center',
        color: '#FFF'
    },
    streamerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    streamerImageAndNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    streamerImage: {
        borderRadius: 100,
        height: 48,
        width: 48
    },
    streamerName: {
        marginLeft: 14,
        fontSize: 16,
        fontWeight: '500',
        color: '#FFF'
    },
    numberOfReactionsContainer: {
        marginVertical: 8,
        width: 60,
        backgroundColor: '#1C1E64',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    numberOfReactions: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: '500',
        color: '#FFF'
    }
});