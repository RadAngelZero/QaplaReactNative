// josep.sanahuja - 05-08-2019 - us84 - + sfvContainer
// josep.sanahuja - 01-08-2019 - us57 - + props for 10 minutes Modal Msg

import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    sfvContainer: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor:'#131833'
    },
    container: {
        backgroundColor:'#131833',
        flex: 1
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
        marginLeft: 14,
        marginRight: 14,
        textAlignVertical: 'top'
    },
    betText: {
        fontSize: 26,
        textAlign: 'center',
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
    },
    switch: {
        marginTop: '5%',
        marginBottom: '10%'
    },
    containerMsgModal: {
        marginTop: 10,
        marginBottom: 23,
        marginRight: 54,
        marginLeft: 54,
        alignItems: 'center'
    },
    headerText: {
        marginTop: 5.5,
        marginBottom: '1%',
        color: '#FFF',
        fontSize: 40
    },
    paragraph: {
        marginTop: 5,
        color: '#CFD1DB',
        fontSize: 16,
        textAlign: 'center'
    },
    okButton: {
        marginTop: 11,
        borderRadius: 100,
        backgroundColor: '#6D7DDE'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        letterSpacing: 2.65,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 14,
        marginBottom: 14,
        color: '#FFF'
    },
    smallText: {
        marginTop: 10,
        color: '#909299',
        fontSize: 10,
        textAlign: 'justify'
    },
    marginSmallText: {
        marginBottom: '2%',
        marginTop: '20%'
    }
});