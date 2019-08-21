// diego           - 20-08-2019 - us89 - Removed custom Modal component and change to react native modal

import { StyleSheet } from 'react-native';
import { getDimensions } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    mainContainer: {
		flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        height: '100%',
    },
    closeIcon: {
        fontSize: 20,
        flexDirection: 'row',
        alignSelf: 'flex-end',
		textAlignVertical: 'top',
		width: 30,
		height: 30,
        marginRight: 10,
        marginTop: 20,
        color: '#FFF',
    },
    container: {
        width: getDimensions().width * .8,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#141833',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        alignItems: 'center'
    },
    qaploinsToBuyText: {
        marginTop: 5.5,
        color: '#FFF',
        fontSize: 40
    },
    qaploinsText: {
        color: '#6D7DDE',
        fontSize: 16
    },
    paragraph: {
        marginTop: 5,
        marginLeft: 12,
        marginRight: 12,
        color: '#CFD1DB',
        fontSize: 16,
        textAlign: 'center'
    },
    buyButton: {
        marginTop: 11,
        borderRadius: 100,
        backgroundColor: '#6D7DDE'
    },
    priceText: {
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
        marginLeft: 24,
        marginRight: 24,
        color: '#909299',
        fontSize: 10,
        textAlign: 'center',
        marginBottom: 23
    }
});