// josep.sanahuja  - 25-09-2019 - us122 - File creation

import { StyleSheet } from 'react-native';
import { widthPercentageToPx, heightPercentageToPx, paddingTopForAndroidDevicesWithNotch } from './../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        backgroundColor:'#131833',
        paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
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
    },
    selfiePreview: {
        position: 'absolute', 
        top: 0, 
        left: 0,
        height: 115, 
        width: 115, 
        borderRadius: 115 / 2, 
        resizeMode: 'cover', 
        backgroundColor: 'transparent'
    }
});