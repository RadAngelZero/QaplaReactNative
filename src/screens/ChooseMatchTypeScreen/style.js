// diego             - 03-09-2019 - us96 - Update titleText marginTop to be the same in all the match wizard
// josep.sanahuja    - 05-08-2019 - us84 - + sfvContainer

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim'

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        backgroundColor:'#0d1021'
    },
    container: {
        flex: 1
    },
    titleText: {
        color: '#FFF',
        marginLeft: 24,
        fontSize: 32,
        fontWeight: 'bold',
        width: widthPercentageToPx(70),
        lineHeight: 38,
        letterSpacing: 0.51,
        alignSelf: 'flex-start',
    },
    lightningImage: {
        marginTop: heightPercentageToPx(8.74),
        alignItems: 'center'
    },
    publicMatchButton: {
        marginTop: heightPercentageToPx(8.13),
        marginBottom: 24,
        borderRadius: 30,
        backgroundColor: '#FA2D79',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: heightPercentageToPx(0.34),
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        alignSelf: 'center',
        width: widthPercentageToPx(60)
    },
    publicMatchButtonText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: .5,
        textAlign: 'center',
        marginTop: 18,
        marginBottom: 18
    },
    directMatchButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 100,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#6D7DDE',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        width: widthPercentageToPx(60),
        marginBottom: 16
    },
    directMatchButtonSearchIcon: {
        alignSelf: 'center',
        marginLeft: 12
    },
    directMatchButtonText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: .5,
        textAlign: 'center',
        marginTop: 18,
        marginBottom: 18,
        marginLeft: 8
    }
});