// diego          - 19-08-2019 - us89 - Responsive behavior added to width and removed height property on container
// josep.sanahuja - 13-08-2019 - us88 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

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
        maxWidth: widthPercentageToPx(80),
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
        backgroundColor: '#6D7DDE',
        marginBottom: heightPercentageToPx(2.28)
    }
})