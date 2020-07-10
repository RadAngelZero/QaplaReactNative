import { StyleSheet } from 'react-native';

import { widthPercentageToPx } from '../../../utilities/iosAndroidDim';
import Colors from '../../../utilities/Colors';

export default styles = StyleSheet.create({
    writeMessageContainer: {
        marginLeft: 14,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    writeMessageTextInput: {
		backgroundColor: Colors.textInputBackground,
		borderRadius: 10,
		width: widthPercentageToPx(80),
		height: 50,
		color: '#FFF',
		fontSize: 14,
		textAlign: 'left',
		letterSpacing: 0.44,
		paddingLeft: 12
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.pinkQapla,
        borderRadius: 22.5,
		width: 46,
		minHeight: 46
    }
});