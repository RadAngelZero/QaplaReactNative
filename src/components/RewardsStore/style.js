import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center'
    },
    prizeContainer: {
        borderRadius: 20,
        marginLeft: 10,
        marginTop: 10,
        width: widthPercentageToPx(42.5),
        height: heightPercentageToPx(20)
    },
    prizeTitle: {
        height: heightPercentageToPx(6),
		color: '#FFF',
		fontSize: 18,
        letterSpacing: 0.3,
        maxWidth: '85%',
        marginTop: 16,
        marginLeft: 16
	},
    prizeBody: {
        maxWidth: '85%',
        height: heightPercentageToPx(8),
		color: '#FFF',
		fontSize: 12,
        marginLeft: 16
    },
    lifeContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        marginLeft: 10
    },
    lifeIcon: {
        marginLeft: 6
    }
});