// diego           - 22-11-2019 - us151 - File creation

import { StyleSheet } from 'react-native';

import { widthPercentageToPx, heightPercentageToPx, paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#FFF',
        marginLeft: widthPercentageToPx(3),
        marginRight: widthPercentageToPx(1),
        paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
        marginBottom: heightPercentageToPx(2)
    },
    paragraph: {
        marginBottom: heightPercentageToPx(2),
        color: '#626262'
    },
    strongText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000'
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: heightPercentageToPx(2),
        color: '#000'
    },
    numericList: {
        marginLeft: widthPercentageToPx(4),
        marginRight: widthPercentageToPx(1)
    },
    underline: {
        textDecorationLine: 'underline'
    }
});