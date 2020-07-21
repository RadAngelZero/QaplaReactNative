import { StyleSheet } from 'react-native';

import Colors from '../../../utilities/Colors';
import { paddingTopForAndroidDevicesWithNotch, heightPercentageToPx } from '../../../utilities/iosAndroidDim';
import { HEADER_SIZE } from '../../../utilities/Constants';

export default styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
        paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    topNavBarView: {
        height: heightPercentageToPx(HEADER_SIZE),
        marginLeft: 16,
        marginTop: 20,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    eventImage: {
        height: 35,
        width: 35,
        resizeMode: 'contain',
        borderRadius: 100
    },
    eventTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8
    },
    eventSponsorImage: {
        height: 40,
        width: 90,
        marginRight: 16,
        resizeMode: 'cover'
    }
});