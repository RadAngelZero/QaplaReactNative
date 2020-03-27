// diego           - 17-12-2019 - us172 - inputTextTaken style removed
// josep.sanahuja - 05-08-2019 - us84 - + sfvContainer
// josep.sanahuja - 08-07-2019 - us83 - + inputTextTaken

import { StyleSheet } from 'react-native'
import { heightPercentageToPx, widthPercentageToPx, paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim'

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#131833',
        paddingTop: paddingTopForAndroidDevicesWithNotch()
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
        color: '#000',
        backgroundColor: '#FFF',
        paddingHorizontal: widthPercentageToPx(4.27),
        paddingVertical: heightPercentageToPx(1.48)
    },
    buttonText: {
        color: '#FFF',
        alignSelf: 'center'
    },
    validatingText: {
        color: '#FFF',
        alignSelf: 'center',
        fontSize: 20,
        marginTop: heightPercentageToPx(1),
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
    },
    modalText: {
        fontSize: 14,
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.28),
        lineHeight: 21,
        color: '#FFF',
        textAlignVertical: 'center',
        justifyContent:'center',
        marginLeft: widthPercentageToPx(2.67),
        marginRight: widthPercentageToPx(2.67),
        textAlign: 'center'
    },
    hyperlinkText: {
        color: '#3df9df',
        fontWeight: 'bold'
    },
    bottomCheckBox: {
        marginTop: heightPercentageToPx(1.33)
    },
    confirmButton: {
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(0.34),
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        marginTop: heightPercentageToPx(1.66),
    },
    confirmButtonText: {
    	color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: .5,
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.46),
        marginLeft: widthPercentageToPx(9.6),
        marginRight: widthPercentageToPx(9.6)
    }
});