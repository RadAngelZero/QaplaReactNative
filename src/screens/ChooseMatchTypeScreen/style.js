// diego             - 03-09-2019 - us96 - Update titleText marginTop to be the same in all the match wizard
// josep.sanahuja    - 05-08-2019 - us84 - + sfvContainer

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim'

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor:'#0d1021'
    },
    container: {
        flex: 1
    },
    titleText: {
        color: '#FFF',
        marginLeft: widthPercentageToPx(6.4),
        fontSize: 32,
        fontWeight: 'bold',
        width: widthPercentageToPx(70),
        lineHeight: 38,
        letterSpacing: 0.51,
        alignSelf: "flex-start",
    },
    lightningImage: {
        marginTop: heightPercentageToPx(8.74),
        alignItems: 'center'
    },
    publicMatchButton: {
        marginTop: heightPercentageToPx(8.13),
        borderRadius: 30,
        backgroundColor: '#FA2D79',
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: heightPercentageToPx(0.34),
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        marginRight: widthPercentageToPx(21.33),
        marginLeft: widthPercentageToPx(21.33)
    },
    publicMatchButtonText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: .5,
        textAlign: 'center',
        lineHeight: 22,
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.46),
        marginLeft: widthPercentageToPx(8.53),
        marginRight: widthPercentageToPx(8.53)
    },
    directMatchButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-start',
        borderRadius: 100,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#6D7DDE',
        backgroundColor: 'transparent',
        marginTop: heightPercentageToPx(3.08),
        marginRight: widthPercentageToPx(21.33),
        marginLeft: widthPercentageToPx(21.33)
    },
    directMatchButtonSearchIcon: {
        alignSelf: 'center',
        marginLeft: widthPercentageToPx(6.4)
    },
    directMatchButtonText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: .5,
        lineHeight: 22,
        textAlign: 'center',
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.46),
        marginLeft: widthPercentageToPx(2.26),
        marginRight: widthPercentageToPx(8.53)
    }
});