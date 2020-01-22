// diego          - 05-09-2019 - us104 - Added style for displayed text if the user has already sended their result
// diego          - 03-09-2019 - us96 - Margins updated for new size of the screen
// josep.sanahuja - 05-08-2019 - us84 - + sfvContainer
// diego          - 29-07-2019 - us55 - Update styles to make screen look like the mockup of inVision iOS
// josep.sanahuja - 15-07-2019 - us25 - Remv. cancelButton

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim'

export default StyleSheet.create({
    sfvContainer: {
      flex: 1,
      backgroundColor: '#0d1021'
    },
    mainContainer: {
        flex:1,
        justifyContent: 'flex-start'
    },
    rowContainer: {
        marginRight: widthPercentageToPx(8),
        marginLeft: widthPercentageToPx(8),
        alignSelf: 'center'
    },
    imageHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: heightPercentageToPx(10)
    },
    headerRow1: {
    	flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: heightPercentageToPx(5)
    },
    hr1: {
       marginRight: widthPercentageToPx(25),
       width: widthPercentageToPx(6.67),
       height: heightPercentageToPx(3.08)
    },
    gameName: {
        fontSize: 16,
        color: '#FFF',
        textAlignVertical: 'center'
    },
    hr3: {
        marginLeft: widthPercentageToPx(25),
        alignSelf: 'flex-end'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: heightPercentageToPx(2.46),
        borderBottomWidth: 1,
        borderBottomColor: '#3DF9DF',
    },
    rowIcon: {
        width: widthPercentageToPx(5.33),
        height: heightPercentageToPx(2.46),
        marginRight: widthPercentageToPx(6)
    },
    infoContainer: {
    	flexDirection: 'row',
        marginBottom: heightPercentageToPx(0.98)
    },
    elemR1: {
    	marginRight: widthPercentageToPx(10),
        color: '#FFF',
        textAlignVertical: 'top',
        fontSize: 12
    },
    rightTextStyle: {
        color: '#FFF',
        textAlignVertical: 'top',
        fontSize: 12
    },
    gamertag: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 12,
        marginTop: heightPercentageToPx(1.23)
    },
    activeColor: {
        color: '#3DF9DF'
    },
    bottomButton: {
        backgroundColor: '#FA2D79',
        borderRadius: 100,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: heightPercentageToPx(0.37),
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        position: 'absolute',
        alignSelf: 'center',
        bottom: heightPercentageToPx(4)
    },
    bottomButtonText: {
        color: '#FFF',
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.46),
        marginRight: widthPercentageToPx(21.33),
        marginLeft: widthPercentageToPx(21.33),
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFF',
    },
    alreadyHaveResult: {
        marginTop: heightPercentageToPx(4.43),
        fontSize: 16,
        textAlign: 'center',
        color: '#FFF'
    }
});