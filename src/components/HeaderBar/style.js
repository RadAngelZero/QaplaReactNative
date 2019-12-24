// diego             - 23-12-2019 - us182 - Header reordered, letters on left, icons on right
// diego             - 11-12-2019 - us164 - discordIcon flexDirection changed
// diego             - 22-11-2019 - us148 - unreadNotificationsIcon added

import { StyleSheet, Platform } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, hasSafeAreaView } from '../../utilities/iosAndroidDim';

export const styles = StyleSheet.create({
    container: {
        height: hasSafeAreaView() ? 100 : 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-start',
        marginTop: ((Platform.OS == 'ios') && !hasSafeAreaView()) ? heightPercentageToPx(2.46) : heightPercentageToPx(0),
        paddingTop: hasSafeAreaView() ? heightPercentageToPx(2.46) : heightPercentageToPx(0),
        backgroundColor: '#0e1222'
    },
    textContainer: {
        marginLeft: widthPercentageToPx(1.97),
        marginTop: heightPercentageToPx(2.46)
    },
    textStyle: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff'
    },
    rightIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: widthPercentageToPx(2.09)
    },
    notificationsIconContainer: {
        marginLeft: widthPercentageToPx(5.33),
        marginTop: heightPercentageToPx(2.96)
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
    discordIcon: {
        marginTop: heightPercentageToPx(2.96),
        marginLeft: widthPercentageToPx(1.74)
    }
});