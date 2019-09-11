// diego           - 11-09-2019 - us107 - updated card margins to make visible for the user
//                                        that he can scroll
// diego           - 20-08-2019 - us89 - File creation

import { StyleSheet } from 'react-native';
import { getDimensions } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        height: getDimensions().height / 5,
        backgroundColor: '#0D1021',
        borderRadius: 10,
        opacity: .82,
        elevation: 1,
        marginLeft: 10,
        marginTop: 18,
        flexDirection: 'row'
    },
    gameData: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: 18,
        flexDirection: 'column'
    },
    descriptionText: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        color: '#FFF',
        marginTop: 12
    },
    gamerInfo: {
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 18
    },
    indicatorContainer: {
        marginLeft: 15
    }
});