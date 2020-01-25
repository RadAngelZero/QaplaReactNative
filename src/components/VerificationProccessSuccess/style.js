// diego           - 24-09-2019 - us128 - File creation

import { StyleSheet } from 'react-native';
import { widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#0D1021',
        marginLeft: widthPercentageToPx(4),
        marginTop: heightPercentageToPx(10),
        width: widthPercentageToPx(100)
    },
    greetingContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        marginLeft: widthPercentageToPx(6),
        marginRight: widthPercentageToPx(12)
    },
    title: {
        fontSize: 32,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: heightPercentageToPx(6.65)
    },
    body: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        width: widthPercentageToPx(75),
        fontWeight: '700',
        lineHeight: 19,
        marginTop: heightPercentageToPx(7)
    }
});