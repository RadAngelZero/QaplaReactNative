import { StyleSheet } from 'react-native';

import Colors from '../../utilities/Colors';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
	GroupChatContainer: {
		flex: 1,
		backgroundColor: Colors.backgroundColor
	},
	chatMessagesContainer: {
		marginBottom: 12
	},
	ovalView: {
		backgroundColor: 'rgb(255, 64, 129)',
		borderRadius: 22.5,
		position: 'absolute',
		right: 0,
		width: 45,
		bottom: 0,
		minHeight: 45
	},
	send24pxImage: {
		resizeMode: 'center',
		backgroundColor: 'transparent',
		position: 'absolute',
		right: 10,
		width: 24,
		bottom: 11,
		height: 24,
	},
	// UnreadMessages
	unreadMessagesContainer: {
		justifyContent: 'center',
		alignSelf: 'center',
		position: 'absolute',
		right: 16,
		bottom: heightPercentageToPx(14),
		borderRadius: 100,
		backgroundColor: '#2F2F2F',
		height: 35,
		width: 35
	}
});