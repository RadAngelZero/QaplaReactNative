import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';

export default styles = StyleSheet.create({
    mainContainer: {
		flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(100),
    },
    container: {
        width: widthPercentageToPx(92),
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#0D1022',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(1.48),
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        alignItems: 'center'
    },
    closeIcon: {
        position: 'absolute',
        top: 24,
        right: 16
    },
    dogAssImage: {
        marginTop: 24
    },
    headerText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 30,
        letterSpacing: -.72,
        textAlign: 'center',
        width: widthPercentageToPx(75)
    },
    paragraph: {
        marginTop: 32,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
        letterSpacing: .25,
        color: '#FFF',
        textAlign: 'center',
        width: widthPercentageToPx(80)
    },
    eventsButton: {
        marginTop: 34,
        borderRadius: 100,
        backgroundColor: '#3B4BF9',
        marginBottom: 40
    },
    bttnText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: .49,
        lineHeight: 22,
        marginTop: 26,
        marginBottom: 26,
        marginLeft: 70,
        marginRight: 70
    }
});