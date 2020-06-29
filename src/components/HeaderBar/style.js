// josep.sanahuja    - 05-01-2020 - us187 - Added HEADER_SIZE import
// diego             - 23-12-2019 - us182 - Replaced container by topNavBarView
// diego             - 11-12-2019 - us164 - discordIcon flexDirection changed
// diego             - 22-11-2019 - us148 - unreadNotificationsIcon added

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim';
import { HEADER_SIZE } from '../../utilities/Constants';
import Colors from '../../utilities/Colors';

export const styles = StyleSheet.create({
    sfvContainer: {
        justifyContent: 'center',
        backgroundColor: Colors.backgroundColor,
        paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    topNavBarView: {
        height: heightPercentageToPx(HEADER_SIZE),
        marginLeft: 16,
        marginTop: 20,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qaplaImage: {
        backgroundColor: "transparent",
        resizeMode: 'contain',
        width: 80,
        height: 32,
    },
    iconsContainer: {
        flexDirection: 'row'
    },
    unreadNotificationsIcon: {
        position: 'absolute',
        right: widthPercentageToPx(.75),
        bottom: 0
    }
});
