// diego             - 23-12-2019 - us182 - Replaced container by topNavBarView
// diego             - 11-12-2019 - us164 - discordIcon flexDirection changed
// diego             - 22-11-2019 - us148 - unreadNotificationsIcon added

import { StyleSheet, Platform } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, hasSafeAreaView } from '../../utilities/iosAndroidDim';

export const styles = StyleSheet.create({
    sfvContainer: {
        justifyContent: 'center',
        backgroundColor:'#0e1222',
        flex: 1
    },
    topNavBarView: {
        backgroundColor: "transparent",
        height: 25,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 20,
        marginBottom: 30,
        flexDirection: "row",
        alignItems: "center",
    },
    qaplaImage: {
        backgroundColor: "transparent",
        resizeMode: 'contain',
        width: 80,
        height: 32,
    },
    notificationsImage: {
        backgroundColor: "transparent",
        resizeMode: "center",
        width: 25,
        height: 25,
        marginRight: 9,
    },
    unreadNotificationsIcon: {
        position: 'absolute',
        right: widthPercentageToPx(.75),
        bottom: 0
    },
    discordImage: {
        backgroundColor: "transparent",
        resizeMode: "center",
        width: 25,
        height: 25,
        marginLeft: widthPercentageToPx(2)
    },
    settingsIcon: {
        marginLeft: widthPercentageToPx(1.8)
    },
    settingsButtonDimensions: {
        height: 23,
        width: 23
    },
    imageAndButtonDimensions: {
        height: 28,
        width: 28
    },

});