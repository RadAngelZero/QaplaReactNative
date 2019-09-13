// diego          - 13-08-2019 - us77 - File creation

import { StyleSheet } from 'react-native';
import { getDimensions } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#131833'
    },
    urlTextInput: {
        marginLeft: 64,
        marginRight: 64,
        marginTop: 18,
        fontSize: 14,
        color: '#FFF',
        borderBottomWidth: 1
    },
    instructions: {
        color: '#FFF',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 18,
        marginLeft: 28,
        marginRight: 28
    },
    highlightedText: {
        color: '#3DF9DF'
    },
    readyButton: {
        marginTop: 42,
        borderRadius: 100,
        backgroundColor: '#6D7DDE',
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65
    },
    readyButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 32,
        marginRight: 32,
        minWidth: 100
    },
    goToClutchButtonText: {
        marginTop: 20,
        marginBottom: 50,
        fontSize: 14,
        height: 20,
        color: '#828385'
    }
});