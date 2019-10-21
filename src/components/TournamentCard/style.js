import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        marginTop: heightPercentageToPx(2.83),
        backgroundColor: '#0E1222',
        alignSelf: 'center',
        width: widthPercentageToPx(95),
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10,
        justifyContent: 'space-between'
    },
    disabledContainer: {
        marginTop: heightPercentageToPx(2.83),
        backgroundColor: '#0E1222',
        alignSelf: 'center',
        width: widthPercentageToPx(95),
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10,
        justifyContent: 'space-between',
        opacity: 0.1
    },
    contentContainer: {
        marginLeft: widthPercentageToPx(4),
        marginRight: widthPercentageToPx(4),
        marginBottom: heightPercentageToPx(2),
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    colASocialContainer: {
        width: widthPercentageToPx(23),
    },
    colBContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 18
    },
    colBSocialContainer: {
        width: widthPercentageToPx(37),
        marginRight: widthPercentageToPx(2)
    },
    picture: {
        marginTop: 20,
        width: 60,
        height: 60 
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    description: {
        fontSize: 10,
        fontWeight: '500',
        letterSpacing: .1,
        lineHeight: 10,
        color: '#ACACAC',
        marginTop: heightPercentageToPx(1)
    },
    redimirButton: {
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: heightPercentageToPx(2),
        maxWidth: widthPercentageToPx(33),
        marginBottom: heightPercentageToPx(1)
    },
    redimirTextButton: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: .15,
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 12
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: .2,
        color: '#FFF',
        marginTop: 18,
        maxWidth: '85%',
        alignSelf: 'flex-start'
    },
    description: {
        fontSize: 10,
        fontWeight: '500',
        letterSpacing: .1,
        lineHeight: 10,
        color: '#ACACAC',
        marginTop: heightPercentageToPx(1)
    },
    progressContainer: {
        flexDirection: 'row',
        width: widthPercentageToPx(95),
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 18
    },
    progressBar: {
        marginTop: 12,
        width: widthPercentageToPx(70),
        backgroundColor: '#1A1D34',
        height: 4,
        marginLeft: 16,
        marginBottom: 15,
        borderRadius: 18,
        alignSelf: 'baseline'
    },
    progressBarContent: {
        backgroundColor: '#6D7DDE',
        height: 4,
        borderRadius: 18
    },
    progressBarCounter: {
        fontSize: 10,
        fontWeight: '700',
        color: '#3DF9DF',
        marginLeft: 8
    },
});