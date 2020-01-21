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
    facebookButtonContainer: {
        borderRadius: 100,
        backgroundColor: '#364fe2',
        paddingVertical: heightPercentageToPx(1.97),
        paddingHorizontal: widthPercentageToPx(4.27),
        marginTop: heightPercentageToPx(5.41)
    },
    whiteColor: {
        color: '#FFF'
    },
    alignSelfCenter: {
        alignSelf: 'center'
    },
    googleButtonContainer: {
        borderRadius: 100,
        backgroundColor: '#FFFFFF',
        paddingVertical: heightPercentageToPx(1.97),
        paddingHorizontal: widthPercentageToPx(4.27),
        marginTop: heightPercentageToPx(2.96)
    },
    googleButtonText: {
        color: 'rgba(0, 0, 0, .541)'
    },
    alreadyHaveAccountTextContainer: {
        flexDirection: 'row',
        marginTop: heightPercentageToPx(3.08)
    },
    enterWithEmailText: {
        color: 'rgba(61,249,223,1)',
        marginLeft: widthPercentageToPx(1.33)
    },
    fontBold: {
        fontSize: 13,
        fontWeight: 'bold'
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