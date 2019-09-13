// diego          - 06-09-2019 - us93 - File creation

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
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#141833',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        alignItems: 'center'
    },
    containerMsgModal: {
        marginTop: 10,
        marginBottom: 23,
        marginRight: 54,
        marginLeft: 54,
        alignItems: 'center',
        justifyContent: 'center'
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
    checkbox: {
        marginTop: '10%',
        marginBottom: '5%'
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
    }
})