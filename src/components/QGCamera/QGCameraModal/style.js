// josep.sanahuja - 22-09-2019 - us122 - Added picture
// josep.sanahuja - 22-09-2019 - us123 - File creation

import { StyleSheet } from 'react-native';
import { hasSafeAreaView, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(100),
	},
	container: {
        height: heightPercentageToPx(100),
        width: widthPercentageToPx(100),
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#141833',
        borderRadius: 20,
        zIndex: 1000,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(0.25),
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginRight: widthPercentageToPx(5.33),
        marginLeft: widthPercentageToPx(5.33),
        paddingTop: heightPercentageToPx(20)
    },
    headerText: {
        marginBottom: heightPercentageToPx(15),
        color: '#FFF',
        fontSize: 40,
        textAlign: 'center'
    },
    text: {
    	color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.46),
        marginLeft: widthPercentageToPx(8.53),
        marginRight: widthPercentageToPx(8.53)
    },
    paragraph: {
        marginTop: heightPercentageToPx(0.62),
        marginRight: widthPercentageToPx(8),
        marginLeft: widthPercentageToPx(8),
        color: '#CFD1DB',
        fontSize: 16,
        textAlign: 'center'
    },
    okButton: {
        marginTop: heightPercentageToPx(4.93),
        borderRadius: 100,
        backgroundColor: '#6D7DDE'
    },
    closeIcon: {
        marginRight: widthPercentageToPx(5.33),
        marginBottom: heightPercentageToPx(2.46),
        marginTop: heightPercentageToPx(8),
        alignSelf: 'flex-end'
    },
    picture: {
        flex: 1,
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(60),
        resizeMode: 'contain'
    }
})