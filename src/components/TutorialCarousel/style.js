import { StyleSheet } from 'react-native';
import { getDimensions } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    scrollContainer: {
        height: getDimensions().height / 2
    },
    carrouselContainer: {
        flexWrap: 'wrap'
    },
    image: {
        resizeMode: 'contain',
        width: getDimensions().width - 28,
        height: getDimensions().width,
        marginRight: 14,
        marginLeft: 14
    },
    progressContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        top: -30
    },
    progressCircleIndicator: {
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginRight: 11,
        width: 9,
        height: 9
    },
});