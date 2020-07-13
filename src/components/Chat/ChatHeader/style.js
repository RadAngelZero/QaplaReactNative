import { StyleSheet } from 'react-native';

import Colors from '../../../utilities/Colors';
import { paddingTopForAndroidDevicesWithNotch, heightPercentageToPx } from '../../../utilities/iosAndroidDim';
import { HEADER_SIZE } from '../../../utilities/Constants';

export default styles = StyleSheet.create({
    container: {
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
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    eventImage: {
        height: 35,
        width: 35,
        borderRadius: 100
    },
    eventTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8
    }
});