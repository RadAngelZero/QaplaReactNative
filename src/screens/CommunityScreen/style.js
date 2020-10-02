import { StyleSheet } from 'react-native';

import Colors from '../../utilities/Colors';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import { SHEET_MAX_HEIGHT } from '../../utilities/Constants';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    communityIcon: {
        position: 'absolute',
        alignItems: 'center',
        top: 20,
        zIndex: 9999,
        left: 0,
        right: 0
    },
    bottomSheetContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    bottomSheet: {
        height: SHEET_MAX_HEIGHT,
        paddingTop: 125,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35
    },
    bottomSheetBody: {
        flex: 1,
        marginHorizontal: 48.5
    },
    comingSoon: {
        fontSize: 30,
        textAlign: 'center',
        color: '#FFF'
    },
    description: {
        marginTop: 24,
        fontSize: 22,
        textAlign: 'center',
        color: '#FFF'
    },
    feedbackRequest: {
        marginTop: 24,
        alignSelf: 'center',
        maxWidth: '75%',
        fontSize: 17,
        textAlign: 'center',
        color: Colors.greenQapla
    },
    buttonContainer: {
        marginTop: 54,
        backgroundColor: Colors.greenQapla,
        borderRadius: 100
    },
    buttonText: {
        fontSize: 17,
        marginVertical: 27,
        textAlign: 'center'
    }
});