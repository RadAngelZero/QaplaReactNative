import { StyleSheet } from 'react-native';
import { widthPercentageToPx } from '../../../utilities/iosAndroidDim';
import Colors from '../../../utilities/Colors';

export default styles = StyleSheet.create({
    adminMessageContainer: {
        marginLeft: 12,
        alignItems: 'flex-end',
        alignSelf: 'center',
        maxWidth: widthPercentageToPx(80),
        marginTop: 24
    },
    adminTitle: {
        color: '#FFF',
        alignSelf: 'flex-start'
    },
    messageContainer: {
        marginTop: 8,
        borderColor: Colors.greenQapla,
        borderWidth: 2,
        justifyContent: 'center',
        borderRadius: 4
    },
    message: {
		color: '#FFF',
		fontSize: 12,
		fontWeight: 'bold',
		textAlign: 'left',
		letterSpacing: 0.38,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 12,
        marginRight: 12,
	},
    hour: {
        marginTop: 8,
		color: Colors.chat.hour,
		fontSize: 8,
		fontWeight: 'bold',
		textAlign: 'center',
		letterSpacing: 0.25,
	}
});