// diego          - 12-09-2019 - us99 - Added close icon styles
// diego          - 21-08-2019 - us89 - File creation

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
    modalContainer: {
        width: getDimensions().width * .8,
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
    modalControls: {
        marginTop: 20,
        alignSelf: 'flex-end'
    },
    closeIcon: {
        marginRight: 20,
        marginBottom: 20,
        marginTop: '2.56%',
        alignSelf: 'baseline'
    },
    modalBody: {
        marginTop: '1%',
        marginBottom: 24,
        marginRight: 5,
        marginLeft: 5,
        alignItems: 'center'
    },
    gamerTagTextInput : {
        fontSize: 14,
        letterSpacing: .5,
        elevation: 6,
        borderRadius: 100,
        borderColor: '#36E5CE',
        borderWidth: 1,
        width: 200,
        justifyContent: 'center',
        marginBottom: 10,
        textAlign: 'center',
        color: 'white'
    },
    modalText: {
        fontSize: 14,
        marginTop: 20,
        marginBottom: 18,
        color: '#FFF',
        textAlignVertical: 'center',
        justifyContent:'center',
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center'
    },
    confirmButton: {
        borderRadius: 100,
        backgroundColor: '#6D7DDE',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65
    },
    confirmButtonText: {
    	color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: .5,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 36,
        marginRight: 36
    }
});