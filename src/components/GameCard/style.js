// diego          - 17-07-2019 - NA   - update images styles and remove unnecesary code
import {StyleSheet} from 'react-native'
import { getDimensions } from '../../utilities/iosAndroidDim';

export default StyleSheet.create({
  	container:{
        marginTop: 12,
        marginHorizontal: 10,
        borderRadius: 10,
        width: getDimensions().width-20,
        alignSelf: 'center'
	},
	titleContainer: {
		flexDirection: 'row',
		marginTop: 24
    },
    imageStyle: {
        height: getDimensions().height/4,
        width: getDimensions().width-20,
        alignSelf: 'center',
        resizeMode: 'cover'
    },
	detailsContainer: {
        backgroundColor: '#0E1222',
        flexDirection: 'row',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    iconContainer: {
        marginLeft: 16,
        marginTop: 20,
        marginBottom: 23
    },
    gameName: {
        fontSize: 18,
        color: '#FFF',
        textAlignVertical: 'center',
        marginLeft: 10
    }
});