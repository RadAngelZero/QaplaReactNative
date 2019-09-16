// diego          - 12-09-2019 - us99 - Added close icon styles
// diego          - 13-08-2019 - us77 - Upload result and other result buttons styles updated
// josep.sanahuja - 05-08-2019 - us78 - File creation

import { StyleSheet, Platform } from 'react-native';
import { hasSafeAreaView, getDimensions } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#131833',
        marginTop: ((Platform.OS === 'ios') && !hasSafeAreaView()) ? 20 : 0
    },
    container: {
        backgroundColor:'#131833',
        alignItems: 'center',
        flex: 1
    },
    closeIcon: {
        marginTop: 36,
        marginRight: 30,
        marginBottom: 20,
        alignSelf: 'flex-end'
    },
    winLooseContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '2%'
    },
    resultDecription: {
        color: '#B3B3B3',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center'
    },
    winLooseSeparator: {
        width: '6%'
    },
    uploadEvidence: {
        marginTop: '10%',
        alignItems: 'center'
    },
    footerEvidence: {
        color: '#FFF',
        fontSize: 20
    },
    otherResultButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-start',
        borderRadius: 100,
        borderWidth: 3,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        marginTop: '10%',
        marginRight: 40,
        marginLeft: 40
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '900',
        textAlign: 'center',
        letterSpacing: .5,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 32,
        marginRight: 32,
        width: getDimensions().width * .4
    },
    uploadResultButton: {
        marginTop: 24.5,
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        marginRight: 40,
        marginLeft: 40,
        marginBottom: 24
    }
});