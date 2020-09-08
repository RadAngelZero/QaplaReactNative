import { StyleSheet } from 'react-native'
import { widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim'
import Colors from '../../utilities/Colors'

export default styles = StyleSheet.create({
	profileView: {
		flex: 1,
		backgroundColor: Colors.backgroundColor
	},
	qoinsView: {
		width: widthPercentageToPx(30),
		marginLeft: 16,
		flexDirection: 'row',
		alignItems: 'center'
	},
	qoinsImage: {
		height: 45,
		width: 45
	},
	qoinsValue: {
		color: '#FFF',
		fontSize: 36,
		marginLeft: 8
    },
    bitsCardContainer: {
		marginTop: 12,
        marginLeft: 24,
        marginRight: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
	bitsModuleView: {
		backgroundColor: 'rgb(59, 75, 249)',
		borderRadius: 20,
		shadowColor: 'rgba(0, 0, 0, 0.25)',
		shadowRadius: 10,
        shadowOpacity: 1,
        marginTop: 16,
		width: widthPercentageToPx(45)
	},
	infoImage: {
		width: 24,
		height: 24,
		marginLeft: 12,
		marginTop: 12
	},
	donationValueContainer: {
		marginTop: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
    bitsValueContainer: {
        marginLeft: 16,
        marginTop: 12
	},
	bitsNumber: {
		color: '#FFF',
		fontSize: 48
	},
	bitsTitle: {
		color: '#FFF',
		fontSize: 12
	},
	handleDonationContainer: {
		marginRight: 12
	},
	updateDonationIcon: {
		marginTop: 8
	},
	buttonView: {
		backgroundColor: 'rgb(108, 122, 229)',
		borderRadius: 18.5,
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 0,
        marginTop: 18,
		marginLeft: 18,
		marginRight: 18,
		marginBottom: 16
	},
	supportText: {
		color: '#FFF',
        fontSize: 16,
        marginTop: 8,
        marginBottom: 8,
        textAlign: 'center'
	},
	bits3dIconImage: {
		position: 'absolute',
		bottom: -heightPercentageToPx(2.5),
		left: widthPercentageToPx(25)
	},
	levelModalView: {
		alignSelf: 'center'
	},
	userImage: {
		resizeMode: 'cover',
		height: 120,
		width: 120
	},
	expText: {
		color: '#FFF',
		fontSize: 16,
		alignSelf: 'center',
		marginTop: 12
	},
	donationNavigatorContainer: {
		flex: 1,
		marginTop: 12
	}
})