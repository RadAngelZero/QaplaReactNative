import { StyleSheet } from 'react-native';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';
import Colors from '../../utilities/Colors';

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    titleText: {
        color: '#FFF',
        marginLeft: 24,
        fontSize: 32,
        fontWeight: 'bold',
        width: widthPercentageToPx(70),
        lineHeight: 38,
        letterSpacing: 0.51,
        paddingTop: 1
    },
    settingsContainer: {
        marginTop: 32
    },
    setting: {
        marginLeft: 32,
        flexDirection: 'row',
        marginBottom: 48
    },
    settingDescription: {
        color: '#FFF',
        fontSize: 16,
        lineHeight: 16,
        maxWidth: widthPercentageToPx(60)
    },
    permissionSwitch: {
        position: 'absolute',
        right: 16,
        top: 0,
        bottom: 0
    }
});