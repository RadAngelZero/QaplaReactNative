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
        height: 32
    },
    profileImageContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userImage: {
        borderRadius: 100,
        width: 40,
        height: 40
    },
    userName: {
        color: '#FFF',
        marginLeft: 8,
        fontSize: 16
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