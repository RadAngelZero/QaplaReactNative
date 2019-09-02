// josep.sanahuja - 17-08-2019 - us90 - File creation

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
    mainContainer2: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        height: '50%',
    },
	container: {
        height: getDimensions().height*.5,
        width: getDimensions().width,
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        marginLeft: 20,
        paddingTop: '20%'
    },
    firstView: {
        height: getDimensions().height*.5,
        width: getDimensions().width,
    },
    secondView: {
        position: 'absolute',
        height: getDimensions().height*.5,
        width: getDimensions().width,
    },
    highlightTopContainer: {
        position: 'absolute',
        height: getDimensions().height*0.5,
        width: getDimensions().width,
        top: 0,
        //backgroundColor: '#141833',
        backgroundColor: 'rgba(0, 0, 0, 0.80)',
    },
    highlightBottomContainer: {
        position: 'absolute',
        height: getDimensions().height*0.5,
        width: getDimensions().width,
        bottom:0,

        //backgroundColor: '#141833',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    comp: {
        color: 'pink',
        marginTop: 40
    },
    headerText: {
        marginBottom: '15%',
        color: '#FFF',
        fontSize: 40,
        textAlign: 'center'
    },
    text: {
    	color: 'white'
    },
    paragraph: {
        marginTop: 5,
        marginRight: 30,
        marginLeft: 30,
        color: '#CFD1DB',
        fontSize: 16,
        textAlign: 'center'
    },
    okButton: {
        marginTop: 40,
        paddingLeft: '20%',
        paddingRight: '20%',
        paddingTop: '3%',
        paddingBottom: '3%',
        borderRadius: 100,
        backgroundColor: '#6D7DDE'
    },
    m: {
       height: getDimensions().height,
       width: getDimensions().width, 

    },
    removeOffsets: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 0,
        marginLeft: 0,
        marginBottom: 0,
        marginRight: 0,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0 
    }
})