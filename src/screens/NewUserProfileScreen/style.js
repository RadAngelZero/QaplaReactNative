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
		marginLeft: 40,
		flexDirection: 'row',
		alignItems: 'center'
	},
	qoinsImage: {
		width: 24,
		height: 24
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
		width: widthPercentageToPx(40)
	},
	infoImage: {
		width: 24,
		height: 24,
		marginLeft: 12,
		marginTop: 12
    },
    bitsValueContainer: {
        marginLeft: 16,
        marginTop: 12
    },
	bitsTitle: {
		color: '#FFF',
		fontSize: 16
	},
	bitsNumber: {
		color: '#FFF',
		fontSize: 40
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
		left: widthPercentageToPx(22)
	},
	levelModalView: {
		alignSelf: 'center'
	},
	levelCircleView: {
		borderRadius: 59.5,
		borderWidth: 7,
		borderColor: 'rgb(31, 39, 80)',
		borderStyle: 'solid',
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: 119,
	},
	levelText: {
		color: 'white',
		fontSize: 12,
		fontStyle: 'normal',
		fontWeight: 'normal',
		textAlign: 'left',
		lineHeight: 16,
		position: 'absolute',
		alignSelf: 'center',
		top: 70,
	},
	levelValueText: {
		color: 'white',
		fontSize: 48,
		fontStyle: 'normal',
		fontWeight: 'normal',
		textAlign: 'left',
		lineHeight: 60,
		alignSelf: 'center',
		marginBottom: 16
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