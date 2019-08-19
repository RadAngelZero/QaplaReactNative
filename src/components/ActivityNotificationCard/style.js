// diego             - 14-08-2019 - us80 - File creation

import { StyleSheet } from 'react-native';
import { getDimensions } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        height: getDimensions().height/7,
        backgroundColor: '#0e1222',
        alignSelf: 'center',
        width: getDimensions().width*.9,
        marginTop: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10,
        flexDirection: 'row'
    },
    readStateContainer: {
        alignSelf: 'center',
        marginLeft: 3,
        width: (getDimensions().width*.9)*.15
    },
    unreadNotification: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 18,
        height: 18,
        width: 18,
        borderRadius: 100,
        backgroundColor: '#3DF9DF'
    },
    readNotification: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 18,
        height: 18,
        width: 18,
        borderRadius: 100,
        backgroundColor: '#FA2D79'
    },
    infoContainer: {
        flexDirection: 'column',
        marginLeft: 3,
        justifyContent: 'center',
        width: (getDimensions().width*.9)*.75
    },
    infoText: {
        color: '#FFF',
        fontSize: 14
    }
});