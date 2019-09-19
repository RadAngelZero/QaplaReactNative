import { StyleSheet } from 'react-native';
import { getDimensions } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    overlay: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, .5)',
        flex: 1,
        position: 'absolute',
        zIndex: 2
    },
    mainContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        maxHeight: getDimensions().height*.8,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#141833',
        borderRadius: 20,
        zIndex: 1000,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginRight: 20,
        marginLeft: 20
    },
    modalBody: {
        justifyContent: 'center',
        alignItems: 'center'
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
    }
})