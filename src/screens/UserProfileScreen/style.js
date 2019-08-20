import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
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
        marginBottom: 25
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
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 6,
        marginTop: 6,
        marginRight: 28,
        marginLeft: 28,
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    fab: {
        bottom: 16,
        right: 16,
        width: 48,
        height: 48,
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
    fabText: {
        fontSize: 52,
        fontWeight: '400',
        color: '#FFF',
        marginBottom: 6
    }
});