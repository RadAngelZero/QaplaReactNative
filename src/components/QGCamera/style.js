// josep.sanahuja - 22-09-2019 - us123 - File creation

import { StyleSheet } from 'react-native';
import { hasSafeAreaView } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
		flex:1,
		justifyContent:'center',
  	},
    buttonContainer: {
    	bottom: 35,
        alignSelf: 'center',
        position: 'absolute',
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        elevation: 10
    },
    textStyle: {
        color: '#FFF',
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 32,
        marginRight: 32,
        letterSpacing: .57
    },
	preview: {
	    flex: 1,
	    justifyContent: 'flex-end',
	    alignItems: 'center'
  	},
    buttonDimensions: {
        height: hasSafeAreaView() ? 60 : 50
    },
    closeIconContainer: {
        position: 'absolute',
        right: 35,
        top: 45,
        
    }
});