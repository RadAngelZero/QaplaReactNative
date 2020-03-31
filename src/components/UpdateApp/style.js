import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim'

export default styles = StyleSheet.create({
     sfvContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'#131833',
      paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    updateContainer: {
        alignItems: 'center'
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
    bttnContainer: {
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        elevation: 10,
        width: 200,
        marginTop: 50
    },
    txtHeader:
    {
        marginTop: 50,
        color: 'white',
        width: 250,
        textAlign: 'center'
    },
    txtBttn: {
        color: '#FFF',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.46),
        marginLeft: widthPercentageToPx(8.53),
        marginRight: widthPercentageToPx(8.53),
        letterSpacing: .57
    }
});