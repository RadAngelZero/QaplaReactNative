// josep.sanahuja  - 18-12-2019 - us176 - Added codeContainer
// josep.sanahuja  - 17-10-2019 - us134 - Added prefixContainer
// diego           - 19-09-2019 - us126 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, getDimensions } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d1021',
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
    phoneMainContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    phoneContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: widthPercentageToPx(6),
        marginRight: widthPercentageToPx(12),
        marginTop: heightPercentageToPx(10),
    },
   codeContainer: { 
        justifyContent: 'center',
        marginLeft: widthPercentageToPx(6),
        marginRight: widthPercentageToPx(12),
        marginTop: heightPercentageToPx(10),
        height: heightPercentageToPx(6),
    },
    prefixContainer: {
        borderColor: '#6D7DDE',
        color: '#FFF',
        borderRadius: 4,
        borderWidth: 2
    },
    qaplaTextInput: {
        flex: 1, 
        height: heightPercentageToPx(5),
        borderBottomColor: '#B5B5B5',
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