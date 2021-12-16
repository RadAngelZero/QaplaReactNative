import { StyleSheet } from 'react-native';

import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    textInput: {
        color: '#00FFDC',
        fontSize: 16,
        textAlign: 'left',
        letterSpacing: .25,
        marginHorizontal: '7.2%',
        width: widthPercentageToPx(70),
        borderRadius: 23.5,
        backgroundColor: '#0D1022',
        height: heightPercentageToPx(6),
        paddingLeft: 18,
        paddingRight: 12
    }
});