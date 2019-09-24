// diego           - 19-09-2019 - us126 - File creation

import { StyleSheet } from 'react-native';
import { widthPercentageToPx, heightPercentageToPx, getDimensions } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor:'#131833',
        marginLeft: widthPercentageToPx(4),
        width: getDimensions().width
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF',
        width: widthPercentageToPx(80)
    },
    divider: {
        marginTop: heightPercentageToPx(2.5)
    },
    selfieContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        marginLeft: widthPercentageToPx(6),
        marginRight: widthPercentageToPx(12),
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        fontWeight: '700',
        color: '#8A8D92'
    },
    smallText: {
          color: '#FFF',
          fontSize: 16,
          lineHeight: 18,
          textAlign: 'center',
          marginTop: heightPercentageToPx(2.5)
    }

});