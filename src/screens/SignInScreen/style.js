// josep.sanahuja    - 05-08-2019 - us84 - + sfvContainer

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
    socialMediaSignInButton: {
        flexDirection: 'row',
        borderRadius: 100,
        justifyContent: 'center'
    },
    socialMediaIconStyle: {
        marginLeft: 12,
        alignSelf: 'center'
    },
    facebookSignInButton: {
        backgroundColor: '#364FE2',
        marginTop: heightPercentageToPx(5.41)
    },
    whiteColor: {
        color: '#FFF'
    },
    alignSelfCenter: {
        alignSelf: 'center'
    },
    textButton: {
        textAlign: 'center',
        textAlignVertical: 'center',
        marginLeft: 8,
        marginRight: 16,
        marginTop: 18,
        marginBottom: 18
    },
    googleSignInButton: {
        backgroundColor: '#FFFFFF',
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
        color: '#3DF9DF',
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