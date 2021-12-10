import { StyleSheet } from 'react-native';

import { heightPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        height: heightPercentageToPx(11.45),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 36,
        paddingBottom: 36,
        backgroundColor: '#051AFF',
        borderRadius: 20
    },
    socialIcon: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 26,
        justifyContent: 'center'
    },
    text: {
        color: '#FFF',
        fontSize: 21,
        textAlign: 'center',
        flex: 1
    }
});