// diego          - 04-09-2019 - us106 - Removed height property for UI issue
// josep.sanahuja - 08-08-2019 - us85 - File creation

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
        width: widthPercentageToPx(80),
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#141833',
        borderRadius: 20,
        zIndex: 1000,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(0.25),
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginRight: widthPercentageToPx(5.33),
        marginLeft: widthPercentageToPx(5.33)
    },
    headerText: {
        marginTop: 16,
        marginBottom: 8,
        color: '#FFF',
        fontSize: 24,
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
    smallText: {
        marginTop: heightPercentageToPx(1.23),
        marginBottom: 16,
        color: '#909299',
        fontSize: 10,
        textAlign: 'center'
    },
    okButton: {
        marginTop: heightPercentageToPx(1.31),
        borderRadius: 100,
        backgroundColor: '#6D7DDE'
    },

})