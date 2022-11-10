import { StyleSheet } from 'react-native';
import { getScreenSizeMultiplier, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1021',
    },
    gridMainContainer: {
        position: 'absolute',
        backgroundColor: '#141539',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: widthPercentageToPx(100),
    },
    gridSearchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: heightPercentageToPx(4.92),
        marginTop: 16,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
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
        width: widthPercentageToPx(80),
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
        paddingVertical: 8,
        marginLeft: 8,
    },
    gridPoweredbyGiphy: {
        flex: 1,
        width: widthPercentageToPx(25.5),
        maxWidth: widthPercentageToPx(25.5),
        height: heightPercentageToPx(1.23),
    },
    gridMasonryContainer: {
        flex: 1,
        marginTop: 16,
        paddingHorizontal: 10,
    },
});