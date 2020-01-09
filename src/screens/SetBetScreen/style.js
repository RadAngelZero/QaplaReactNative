// diego          - 03-01-2020 - us191 - Adjust of UI based on supernova mockup
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
      backgroundColor:'#0d1021'
    },
    container: {
		flex: 1,
		alignItems: "center"
    },
    titleContainer: {
        marginTop: heightPercentageToPx(5)
	},
    titleText: {
        color: '#FFF',
        marginLeft: widthPercentageToPx(6.4),
        fontSize: 32,
        fontWeight: 'bold',
        width: widthPercentageToPx(70),
        lineHeight: 38,
        letterSpacing: 0.51,
		paddingTop: 1,
		backgroundColor: "transparent",
		alignSelf: "flex-start"
    },
    prizeImage: {
        marginTop: heightPercentageToPx(7.97),
        alignItems: 'center'
    },
    winBet: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 54,
        textAlign: 'center',
        marginTop: heightPercentageToPx(4.69),
        marginBottom: heightPercentageToPx(1.56),
        lineHeight: 56,
        letterSpacing: 0.59
    },
    qaploinIconContainer: {
        alignSelf: 'center',
        flexDirection: 'row'
    },
    qaploinIconText: {
        color: '#3DF9DF',
        fontSize: 14,
        marginLeft: widthPercentageToPx(1.33)
    },
    betContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: heightPercentageToPx(5.47)
    },
    betTextContainer: {
        marginLeft: widthPercentageToPx(3.73),
        marginRight: widthPercentageToPx(3.73),
        textAlignVertical: 'top'
    },
    betText: {
        fontSize: 28,
        textAlign: 'center',
        color: '#FFF',
        lineHeight: 34,
        letterSpacing: 0.36
    },
    betEntrada: {
        fontSize: 12,
        color: '#B5B5B5',
        textAlign: 'center'
    },
    changeBetIcon: {
        marginTop: heightPercentageToPx(0.49)
    },
    createButton: {
        borderRadius: 30,
        backgroundColor: '#FA2D79',
        marginLeft: widthPercentageToPx(21.33),
        marginRight: widthPercentageToPx(21.33),
        position: 'absolute',
        alignSelf: 'center',
        bottom: heightPercentageToPx(2.46)
    },
    createButtonText: {
        marginTop: heightPercentageToPx(2.46),
        marginBottom: heightPercentageToPx(2.46),
        marginLeft: widthPercentageToPx(8.53),
        marginRight: widthPercentageToPx(8.53),
        letterSpacing: .5,
        fontSize: 17,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(0.34)
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65
    }
});
