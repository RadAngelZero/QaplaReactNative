// josep.sanahuja    - 05-01-2020 - us187 - Added HEADER_SIZE import
// diego             - 23-12-2019 - us182 - Replaced container by topNavBarView
// diego             - 11-12-2019 - us164 - discordIcon flexDirection changed
// diego             - 22-11-2019 - us148 - unreadNotificationsIcon added

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim';
import { HEADER_SIZE } from '../../utilities/Constants';

export const styles = StyleSheet.create({
    sfvContainer: {
        justifyContent: 'center',
        backgroundColor:'#0e1222',
        paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    topNavBarView: {
        backgroundColor: "transparent",
        height: heightPercentageToPx(HEADER_SIZE),
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
