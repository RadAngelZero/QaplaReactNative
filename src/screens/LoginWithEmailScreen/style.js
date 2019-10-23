// josep.sanahuja    - 05-08-2019 - us84 - + sfvContainer

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim'

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#131833'
    },
    container: {
        flex:1,
        backgroundColor:'#131833',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputText: {
        marginTop: heightPercentageToPx(1.72),
        borderRadius: 6,
        backgroundColor: '#FFF',
        paddingHorizontal: widthPercentageToPx(4.27),
        paddingVertical: heightPercentageToPx(1.97),
        marginLeft: widthPercentageToPx(19.2),
        marginRight: widthPercentageToPx(19.2)
    },
    buttonContainer: {
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        paddingVertical: heightPercentageToPx(1.97),
        paddingHorizontal: widthPercentageToPx(10.67),
        marginTop: heightPercentageToPx(1.72)
    },
    buttonText: {
        color: '#FFF',
        alignSelf: 'center'
    },
    forgotPasswordText: {
        color: '#3DF9DF',
        textAlign: 'right',
        marginRight: widthPercentageToPx(19.8),
        fontSize: 12,
        marginTop: heightPercentageToPx(1.72)
    },
    backgroundImage: {
        position: 'absolute',
        left: widthPercentageToPx(0),
        bottom: heightPercentageToPx(0),
        zIndex: -1,
        opacity: .68,
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(50)
    }
});
