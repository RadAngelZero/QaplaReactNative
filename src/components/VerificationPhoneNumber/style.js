// josep.sanahuja  - 17-10-2019 - us134 - Added prefixContainer
// diego           - 19-09-2019 - us126 - File creation

import { StyleSheet } from 'react-native';
import { widthPercentageToPx, heightPercentageToPx, getDimensions } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        backgroundColor:'#131833'
    },
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
    phoneContainer: {
        justifyContent: 'center',
        marginLeft: widthPercentageToPx(6),
        marginRight: widthPercentageToPx(12),
    },
    prefixContainer: {
        borderColor: '#6D7DDE',
        color: '#FFF',
        borderRadius: 4,
        borderWidth: 2
    },
    qaplaTextInput: {
        flex: 1, 
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