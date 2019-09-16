// diego           - 20-08-2019 - us89 - File creation

import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    sfvContainer: {
        backgroundColor:'#131833',
        flex: 1
    },
    userInfoContainer: {
        backgroundColor: '#0e1222',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
    imageAndNameContainer: {
        flexDirection: 'column',
        marginRight: 30,
        marginLeft: 86,
        marginBottom: 36
    },
    avatarImage: {
        height: 60,
        width: 60,
        borderRadius: 100,
        backgroundColor: '#131833',
        marginBottom: 8
    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF'
    },
    manageQaploinsContainer: {
        flexDirection: 'column',
        marginBottom: 25
    },
    qaploinInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18
    },
    qaploinImage: {
        marginRight: 10,
        height: 30,
        width: 30
    },
    qaploinsAmount: {
        fontSize: 24,
        color: '#FFF',
        textAlign: 'right'
    },
    addQaploinsButton: {
        borderRadius: 100,
        backgroundColor: '#FA2D79'
    },
    addQaploinsButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 22,
        marginRight: 22
    },
    fab: {
        bottom: 16,
        right: 16,
        borderRadius: 100,
        position: 'absolute',
        backgroundColor: '#FA2D79',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    },
    fabImage: {
        width: 48,
        height: 48
    }
});