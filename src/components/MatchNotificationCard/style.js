// diego -          01-08-2019 - us58 - File creation

import { StyleSheet } from 'react-native';
import { getDimensions } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        height: getDimensions().height/5,
        backgroundColor: '#0e1222',
        alignSelf: 'center',
        width: '90%',
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
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 24
    },
    avatarImage: {
        height: 48,
        width: 48,
        borderRadius: 100,
        backgroundColor: '#131833'
    },
    infoContainer: {
        flexDirection: 'column',
        marginLeft: 18,
        justifyContent: 'center'
    },
    infoText: {
        color: '#FFF',
        fontSize: 12,
        textAlign: 'justify',
        width: getDimensions().width*.5
    },
    infoButtonsMenu: {
        marginTop: 18,
        flexDirection: 'row'
    },
    infoButton: {
        borderRadius: 100,
        width: 90
    },
    infoAcceptButton: {
        backgroundColor: '#FA2D79',
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        marginRight: 12
    },
    infoDeclineButton: {
        backgroundColor: 'transparent',
        borderColor: '#FA2D79',
        borderWidth: 1
    },
    infoButtonText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 8,
        textAlign: 'center'
    },
    arrowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 24
    },
    arrow: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: '300'
    }
});