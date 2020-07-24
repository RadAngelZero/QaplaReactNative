import { StyleSheet } from 'react-native';

import { widthPercentageToPx } from '../../../utilities/iosAndroidDim';
import Colors from '../../../utilities/Colors';

export default styles = StyleSheet.create({
  writeMessageContainer: {
    marginLeft: 14,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  writeMessageTextInput: {
    backgroundColor: Colors.textInputBackground,
    borderRadius: 10,
    height: 50,
    width: widthPercentageToPx(80),
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
    marginLeft: 8,
    width: 46,
    height: 46
  }
});