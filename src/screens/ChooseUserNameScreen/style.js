// josep.sanahuja - 05-08-2019 - us84 - + sfvContainer
// josep.sanahuja - 08-07-2019 - us83 - + inputTextTaken

import { StyleSheet } from 'react-native'
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
    formContainer: {
        marginLeft: widthPercentageToPx(8),
        marginRight: widthPercentageToPx(8)
    },
    title: {
        color: '#FFF',
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    inputText: {
        marginTop: heightPercentageToPx(1.72),
        borderRadius: 6,
        backgroundColor: '#FFF',
        paddingHorizontal: widthPercentageToPx(4.27),
        paddingVertical: heightPercentageToPx(1.48)
    },
    buttonContainer: {
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        paddingVertical: heightPercentageToPx(1.97),
        paddingHorizontal: widthPercentageToPx(10.66),
        marginTop: heightPercentageToPx(5.17)
    },
    buttonText: {
        color: '#FFF',
        alignSelf: 'center'
    },
    backgroundImage: {
        flex: 1,
        position: 'absolute',
        left: widthPercentageToPx(0),
        bottom: heightPercentageToPx(0),
        zIndex: -1,
        opacity: .68,
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(50)
    }
});