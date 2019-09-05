// diego          - 04-09-2019 - us106 - Added styles for react native modal
// diego          - 06-08-2019 - us68 - File creation

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
    container: {
        width: getDimensions().width * .9,
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
    paragraph: {
        marginTop: 36,
        marginRight: 20,
        marginLeft: 20,
        color: '#CFD1DB',
        fontSize: 16,
        textAlign: 'center'
    },
    gotItButton: {
        marginTop: 24,
        marginBottom: 24,
        borderRadius: 100,
        backgroundColor: '#6D7DDE'
    },
    gotItButtonText: {
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
        marginTop: 18,
        color: '#909299',
        fontSize: 10,
        textAlign: 'justify'
    }
});