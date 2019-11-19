import { StyleSheet } from 'react-native';

import { getDimensions, widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim';

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
        maxWidth: getDimensions().width * .8,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#141833',
        borderRadius: 20,
        zIndex: 1000,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginRight: widthPercentageToPx(5.33),
        marginLeft: widthPercentageToPx(5.33)
    },
    headerText: {
        marginTop: heightPercentageToPx(5),
        marginBottom: heightPercentageToPx(1.48),
        color: '#FFF',
        fontSize: 24,
        fontWeight: '900',
        textAlign: 'center'
    },
    paragraph: {
        marginTop: 5,
        marginRight: widthPercentageToPx(8),
        marginLeft: widthPercentageToPx(8),
        color: '#CFD1DB',
        fontSize: 16,
        textAlign: 'center'
    },
    okButton: {
        marginTop: heightPercentageToPx(4.93),
        borderRadius: 100,
        backgroundColor: '#6D7DDE',
        marginBottom: heightPercentageToPx(2.28)
    },
    textButton: {
    	color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.46),
        marginLeft: widthPercentageToPx(8.53),
        marginRight: widthPercentageToPx(8.53)
    }
});