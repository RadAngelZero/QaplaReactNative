import { StyleSheet } from 'react-native';

import Colors from '../../../utilities/Colors';

import { widthPercentageToPx } from '../../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    userMessageView: {
		marginTop: 12,
		alignSelf: 'flex-end',
		marginRight: 20,
		flexDirection: 'row'
	},
	hour: {
		color: Colors.chat.hour,
		fontSize: 8,
		fontWeight: 'bold',
		textAlign: 'center',
		letterSpacing: 0.25,
        alignSelf: 'flex-end',
        marginRight: 8
	},
	messageContainer: {
		backgroundColor: Colors.chat.userMessageBackground,
		borderRadius: 20,
        justifyContent: 'center'
	},
	messageText: {
		color: '#FFF',
		fontSize: 14,
        marginRight: 12,
        marginLeft: 12,
        marginTop: 10,
		marginBottom: 10,
		maxWidth: widthPercentageToPx(60)
	}
});