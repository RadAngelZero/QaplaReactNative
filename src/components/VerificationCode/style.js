// diego           - 23-09-2019 - us127 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, getDimensions } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor:'#131833',
        marginLeft: widthPercentageToPx(4),
        width: widthPercentageToPx(100)
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
    phoneContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        marginLeft: widthPercentageToPx(6),
        marginRight: widthPercentageToPx(12)
    },
    qaplaTextInput: {
        backgroundColor: '#11152D',
        height: heightPercentageToPx(8),
        borderBottomColor: '#6D7DDE',
        color: '#FFF',
        borderRadius: 4,
        borderBottomWidth: 2
    },
    smallText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#8A8D92'
    }
});