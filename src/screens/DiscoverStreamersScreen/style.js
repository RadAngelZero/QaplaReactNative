import { StyleSheet } from 'react-native';

import Colors from '../../utilities/Colors';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    searchBar: {
        width: widthPercentageToPx(91.46),
        flexDirection: 'row',
        marginRight: 10,
        borderRadius: 50,
        paddingHorizontal: 16,
        alignSelf: 'center',
        alignItems: 'center',
    },
    streamerSearchBar: {
        backgroundColor: '#141539',
    },
    gridSearchBarTextInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 1,
        textAlignVertical: 'center',
        marginLeft: 8,
        paddingVertical: 8
    },
});