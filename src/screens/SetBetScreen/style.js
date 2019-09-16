// diego          - 06-09-2019 - us93 - Removed unused styles of life time match modal (now: MatchExpireRememberModal)
// diego          - 03-09-2019 - us96 - Update titleContainer marginTop to be the same in all the match wizard
// josep.sanahuja - 05-08-2019 - us84 - + sfvContainer
// josep.sanahuja - 01-08-2019 - us57 - + props for 10 minutes Modal Msg

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim'

export default styles = StyleSheet.create({
    sfvContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'#131833'
    },
    container: {
        flex: 1,
        backgroundColor:'#131833'
    },
    titleContainer: {
        marginTop: heightPercentageToPx('5%')
	},
    titleText: {
        color: '#FFF',
        marginLeft: 24,
        fontSize: 32,
        fontWeight: 'bold',
        width: widthPercentageToPx('60%'),
    },
    prizeImage: {
        marginTop: '10%',
        alignItems: 'center'
    },
    winBet: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 60,
        textAlign: 'center',
        marginTop: heightPercentageToPx('4.2%'),
        marginBottom: heightPercentageToPx('1.23%')
    },
    qaploinIconContainer: {
        alignSelf: 'center',
        flexDirection: 'row'
    },
    qaploinIconText: {
        color: '#3DF9DF',
        fontSize: 14,
        marginLeft: 5
    },
    betContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: heightPercentageToPx('7.27%')
    },
    betTextContainer: {
        marginLeft: 14,
        marginRight: 14,
        textAlignVertical: 'top'
    },
    betText: {
        fontSize: 26,
        textAlign: 'center',
        color: '#FFF'
    },
    betEntrada: {
        fontSize: 12,
        color: '#B5B5B5'
    },
    changeBetIcon: {
        marginTop: 4
    },
    createButton: {
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        marginLeft: 80,
        marginRight: 80,
        marginTop: heightPercentageToPx('6.65%')
    },
    createButtonText: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 32,
        marginRight: 32,
        letterSpacing: .57,
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65
    }
});
