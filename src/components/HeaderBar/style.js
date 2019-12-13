// diego             - 11-12-2019 - us164 - discordIcon flexDirection changed
// diego             - 22-11-2019 - us148 - unreadNotificationsIcon added

import { StyleSheet, Platform } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, hasSafeAreaView } from '../../utilities/iosAndroidDim';

export const styles = StyleSheet.create({
    container: {
        height: hasSafeAreaView() ? 100 : 90,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'flex-start',
        marginTop: ((Platform.OS == 'ios') && !hasSafeAreaView()) ? heightPercentageToPx(2.46) : heightPercentageToPx(0),
        paddingTop: hasSafeAreaView() ? heightPercentageToPx(2.46) : heightPercentageToPx(0),
        backgroundColor: '#0e1222'
    },
    imageContainer: {
        flex: 1,
        marginLeft: widthPercentageToPx(5.33),
        marginTop: heightPercentageToPx(2.96),
    },
    imageAndButtonDimensions: {
        height: 28,
        width: 28
    },
    unreadNotificationsIcon: {
        position: 'absolute',
        right: widthPercentageToPx(.75),
        bottom: 0
    },
    textContainer: {
        flexGrow: 1,
        marginTop: heightPercentageToPx(2.46)
    },
    textStyle: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff'
    },
    discordIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: heightPercentageToPx(2.96)
    }
});