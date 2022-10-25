import { StyleSheet } from "react-native";
import { heightPercentageToPx, widthPercentageToPx } from "../../utilities/iosAndroidDim";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1021',
        paddingTop: 8
    },
    innerContainer: {
        paddingHorizontal: 16,
        alignItems: 'center'
    },
    searchBarContainer: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    searchBar: {
        flexDirection: 'row',
        borderRadius: 50,
        paddingHorizontal: 16,
        alignSelf: 'center',
        alignItems: 'center'
    },
    streamerSearchBar: {
        backgroundColor: '#141539',
        marginLeft: 8,
    },
    gridSearchBarTextInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 1,
        textAlignVertical: 'center',
        marginLeft: 8,
        paddingVertical: 8,
    },
    resultsList: {
        marginTop: 18,
        width: '100%',
        alignSelf: 'center'
    },
    // Modals
    successImage: {
        height: widthPercentageToPx(40),
        width: widthPercentageToPx(40) // widthPercentageToPx used because we want a square image
    },
    modalsTitle: {
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: -.72,
        textAlign: 'center',
        color: '#FFF'
    },
    modalsDescriptions: {
        marginTop: 32,
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: .25,
        textAlign: 'center',
        color: '#FFF'
    },
    modalButton: {
        paddingVertical: 26,
        width: '100%',
        marginTop: 40,
        backgroundColor: '#3B4BF9',
        borderRadius: 40
    },
    modalButtonText: {
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: .49,
        textAlign: 'center',
        color: '#FFF'
    },
    streamerOfflineImage: {
        height: heightPercentageToPx(13.5),
        width: widthPercentageToPx(57.6)
    }
});