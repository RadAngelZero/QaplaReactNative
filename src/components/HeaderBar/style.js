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
        width: 48,
        height: 48
    },
    editImg: {
        position: 'absolute',
        bottom: -2,
        right: widthPercentageToPx(-1)
    },
    userName: {
        color: '#FFF',
        marginLeft: 10,
        fontSize: 24
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