import { StyleSheet } from 'react-native';
import { SHEET_MAX_HEIGHT } from '../../utilities/Constants';

import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1021',
        alignItems: 'center'
    },
    topNav: {
        position: 'absolute',
        top: 48,
        left: 16,
        zIndex: 9999
    },
    title: {
        width: widthPercentageToPx(78.66),
        marginTop: heightPercentageToPx(15),
        fontSize: 24,
        color: '#FFF',
        textAlign: 'center'
    },
    body: {
        height: SHEET_MAX_HEIGHT,
        width: widthPercentageToPx(100),
        marginTop: 48,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    allowButton: {
        backgroundColor: '#00FFDD',
        width: widthPercentageToPx(70),
        height: heightPercentageToPx(9.11),
        borderRadius: 36,
        justifyContent: 'center'
    },
    allowButtonText: {
        fontSize: 17,
        color: '#0D1021',
        alignSelf: 'center'
    }
});