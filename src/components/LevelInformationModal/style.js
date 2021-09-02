import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

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
        height: heightPercentageToPx(68),
        width: widthPercentageToPx(93),
        shadowColor: "#000",
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(1.48),
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24
    },
    levelBenefitsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24
    },
    levelContainer: {
        justifyContent: 'space-between'
    },
    userImage: {
		resizeMode: 'cover',
		height: 120,
		width: 120
	},
    expTextContainer: {
        alignSelf: 'center',
        borderRadius: 100,
        backgroundColor: '#4040FF',
        position: 'absolute',
        bottom: 0
    },
	expText: {
		color: '#FFF',
		fontSize: 12,
		alignSelf: 'center',
		marginTop: 5,
        marginBottom: 5,
        marginRight: 14,
        marginLeft: 14
	},
    title: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    },
    benefitsDetailsContainer: {
        flexDirection: 'row',
        marginTop: 12
    },
    benefitsDetails: {
        flex: 1,
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    qoinValue: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    levelValueContainer: {
        marginTop: 12,
        backgroundColor: '#4040FF'
    },
    levelValue: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 8
    },
    bodyContainer: {
        height: heightPercentageToPx(48),
        backgroundColor: '#141539',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingHorizontal: 36,
        paddingVertical: 24
    },
    bodyTextContainer: {
        flex: 1,
        marginTop: 24,
        justifyContent: 'center'
    },
    bodyText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 26
    },
    buttonContainer: {
        marginTop: 48,
        backgroundColor: Colors.greenQapla,
        borderRadius: 100,
        marginBottom: 24
    },
    buttonText: {
        fontSize: 18,
        marginVertical: 28,
        textAlign: 'center'
    }
});