// diego           - 11-09-2019 - us107 - Updated card margins to make visible for the user
//                                        that he can scroll
// diego           - 20-08-2019 - us89 - File creation

import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        backgroundColor: '#141833',
        borderRadius: 10,
        opacity: .82,
        elevation: 1,
        marginLeft: 12,
        marginTop: 16,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: 'row'
    },
    gameData: {
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    descriptionText: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        color: '#FFF',
        marginTop: 8
    },
    gamerInfo: {
        marginLeft: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    indicatorContainer: {
        marginLeft: 8
    }
});
