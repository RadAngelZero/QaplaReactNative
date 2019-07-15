import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#131833'
    },
    headerOptions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
        top: 0,
        marginTop: 24
	},
    titleText: {
        color: '#FFF',
        marginLeft: 24,
        fontSize: 32,
        fontWeight: 'bold',
        width: '60%',
    },
    closeIcon: {
		fontSize: 20,
		textAlignVertical: 'top',
		width: 24,
		height: 24,
        marginRight: 20,
        marginTop: 10,
		color: '#FFF'
    },
    prizeImage: {
        marginTop: 40,
        alignItems: 'center'
    },
    winBet: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 60,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 10
    },
    qaploinIconContainer: {
        alignSelf: 'center',
        flexDirection: 'row'
    },
    qaploinIconText: {
        color: '#3DF9DF',
        fontSize: 14,
        marginLeft: 5
    },
    betContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 35
    },
    betTextContainer: {
        marginLeft: 10,
        marginRight: 10,
        textAlignVertical: 'top'
    },
    betText: {
        fontSize: 26,
        color: '#FFF'
    },
    betEntrada: {
        fontSize: 12,
        color: '#B5B5B5'
    },
    changeBetIcon: {
        marginTop: 4
    },
    createButton: {
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        marginLeft: 80,
        marginRight: 80,
        marginTop: 40
    },
    createButtonText: {
        marginTop: 12,
        marginBottom: 12,
        marginLeft: 22,
        marginRight: 22,
        fontSize: 14,
        textAlign: 'center',
        color: '#FFF',
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65
    }
});