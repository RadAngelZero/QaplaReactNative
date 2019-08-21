// diego           - 20-08-2019 - us89 - File creation

import { StyleSheet } from 'react-native';
import { getDimensions } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        height: getDimensions().height / 5,
        width: (getDimensions().width-20) * .95,
        backgroundColor: '#0D1021',
        borderRadius: 10,
        opacity: .82,
        elevation: 1,
        marginLeft: 20,
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
        flexDirection: 'row'
    },
    indicatorContainer: {
        marginLeft: 15
    }
});