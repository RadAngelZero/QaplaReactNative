// diego              - 12-09-2019 - us99 - Added back icon styles
// diego              - 16-08-2019 - us77 - File creation

import { StyleSheet } from 'react-native';
import { getDimensions } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    scrollContainer: {
        height: getDimensions().height / 2.25
    },
    backIconContainer: {
        justifyContent: 'center',
        width: '100%' 
    },
    backIcon: {
        alignSelf: 'flex-start',
        marginTop: 24,
        marginLeft: 30,
        marginBottom: 18
    },
    carrouselContainer: {
        flexWrap: 'wrap'
    },
    image: {
        resizeMode: 'contain',
        width: getDimensions().width - 20,
        height: getDimensions().height / 3,
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