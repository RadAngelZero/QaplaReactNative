import { StyleSheet } from 'react-native';

import { heightPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        height: heightPercentageToPx(5),
        backgroundColor: 'rgba(64, 64, 255, .30859)',
        borderRadius: 20.5,
        justifyContent: 'center'
    },
    text: {
        color: 'rgba(255, 255, 255, .6529)',
        fontSize: 17,
        fontWeight: '600',
        marginRight: 10,
        marginLeft: 12
    }
});