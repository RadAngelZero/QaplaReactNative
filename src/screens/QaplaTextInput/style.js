import { StyleSheet } from 'react-native';

import { getPercentHeight, getPercentWidth, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    textInput: {
        color: '#00FFDC',
        fontSize: heightPercentageToPx(getPercentHeight(16)),
        textAlign: 'left',
        letterSpacing: widthPercentageToPx(getPercentWidth(0.25)),
        marginHorizontal: '7.2%',
        width: widthPercentageToPx(70),
        borderRadius: heightPercentageToPx(getPercentHeight(12)),
        backgroundColor: '#0D1022',
        height: heightPercentageToPx(getPercentHeight(48)),
        paddingLeft: widthPercentageToPx(getPercentWidth(18)),
        paddingRight: widthPercentageToPx(getPercentWidth(12)),
    }
});