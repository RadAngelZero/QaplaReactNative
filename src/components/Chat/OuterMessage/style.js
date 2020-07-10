import { StyleSheet } from 'react-native';
import Colors from '../../../utilities/Colors';
import { widthPercentageToPx } from '../../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    outerMessageContainer: {
        marginLeft: 12,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    userImage: {
		resizeMode: 'center',
		borderRadius: 17.5,
		width: 35,
		height: 35
    },
    messageDetailsContainer: {
        marginLeft: 6,
        marginRight: 8
    },
    userName: {
        marginTop: 12,
		color: Colors.chat.hour,
		fontSize: 12,
		fontWeight: 'bold',
		textAlign: 'center',
		letterSpacing: 0.38,
        alignSelf: 'flex-start',
        marginLeft: 16,
		marginBottom: 2
	},
	messageContainer: {
        backgroundColor: Colors.chat.OuterMessageBackground,
        borderRadius: 29,
        justifyContent: 'center'
	},
	message: {
		color: Colors.chat.OuterMessageText,
		fontSize: 12,
		fontWeight: 'bold',
		textAlign: 'left',
		letterSpacing: 0.38,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 12,
        marginRight: 12,
        maxWidth: widthPercentageToPx(50)
	},
	hour: {
		color: Colors.chat.hour,
		fontSize: 8,
		fontWeight: 'bold',
		textAlign: 'center',
		letterSpacing: 0.25,
	},
});