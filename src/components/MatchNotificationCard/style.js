// diego -          01-08-2019 - us58 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';


export default styles = StyleSheet.create({
    container: {
        height: heightPercentageToPx(15),
        backgroundColor: '#141833',
        alignSelf: 'center',
        width: widthPercentageToPx(90),
        marginTop: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(0.62),
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10,
        flexDirection: 'row'
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: widthPercentageToPx(6.4)
    },
    avatarImage: {
        height: 48,
        width: 48,
        borderRadius: 48 / 2,    // height = weight = 48 -> borderRadius: height / 2
        backgroundColor: '#131833',
        resizeMode: 'cover'
    },
    infoContainer: {
        flexDirection: 'column',
        marginLeft: widthPercentageToPx(4.8),
        justifyContent: 'center'
    },
    infoText: {
        color: '#ACACAC',
        fontSize: 12,
        textAlign: 'justify',
        width: widthPercentageToPx(50)
    },
    infoButtonsMenu: {
        marginTop: heightPercentageToPx(2.28),
        flexDirection: 'row'
    },
    infoButton: {
        borderRadius: 100,
        width: widthPercentageToPx(24)
    },
    infoAcceptButton: {
        backgroundColor: '#FA2D79',
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(0.34),
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        marginRight: widthPercentageToPx(3.13)
    },
    infoDeclineButton: {
        backgroundColor: 'transparent',
        borderColor: '#FA2D79',
        borderWidth: 1
    },
    infoButtonText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: heightPercentageToPx(0.99),
        marginBottom: heightPercentageToPx(0.99),
        textAlign: 'center'
    },
    arrowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: widthPercentageToPx(6.4)
    },
    arrow: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: '300'
    }
});
