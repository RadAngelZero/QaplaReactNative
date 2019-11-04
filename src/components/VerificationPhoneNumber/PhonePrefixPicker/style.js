// josep.sanahuja  - 17-10-2019 - us134 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, getDimensions } from '../../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    sfvContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor:'#131833'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: widthPercentageToPx(20),
        marginRight: widthPercentageToPx(2) 
    },
    modalMainContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(100),
        backgroundColor: '#141833',
    },
    modalContainer: {
      	height: heightPercentageToPx(70),
        width: getDimensions().width * 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#141833',
        borderRadius: 20,
        zIndex: 1000,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginRight: widthPercentageToPx(5.33),
        marginLeft: widthPercentageToPx(5.33),
        paddingTop: heightPercentageToPx(20)
    },
    prefixCardItem: {
        backgroundColor: '#11152D',
        height: heightPercentageToPx(7),
        width: widthPercentageToPx(80),
        borderBottomColor: '#6D7DDE',
        color: '#FFF',
        borderRadius: 4,
        borderBottomWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    prefixCardTxt: {
        color: 'white'
    },
    prefixAlphaCode: {
        marginRight: widthPercentageToPx(2),
        color: 'white'
    },
    prefixNumCode: {
        marginRight: widthPercentageToPx(5),
        color: 'white'
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
});
