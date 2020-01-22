// josep.sanahuja  - 13-11-2019 - us147 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx, paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim'

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#0d1021',
        paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    container: {
        flex: 1,
        backgroundColor:'#0d1021',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    headerText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold'
    },
    littleText: {
        color: '#FFF',
        fontSize: 12,
        marginTop: heightPercentageToPx(2),
        marginBottom: heightPercentageToPx(5)
    },
    menuHeaderText: {
        color: '#E1E1E3',
        fontSize: 12,
        marginLeft: widthPercentageToPx(5)
    },
    menuItemRowText: {
        color: '#F5F5F6',
        fontSize: 12,
        marginLeft: widthPercentageToPx(5)
    },
    menuHeader: {
        width: widthPercentageToPx(100),
        height: widthPercentageToPx(20),
        backgroundColor: '#0E1222',
        justifyContent: 'center'
    },
    menuItemRow: {
        width: widthPercentageToPx(100),
        height: widthPercentageToPx(20),
        justifyContent: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: '#F5F5F6',
    },
    mainImage: {
        resizeMode: 'contain',
        width: widthPercentageToPx(20),
        height: widthPercentageToPx(20),
        marginTop: heightPercentageToPx(2)
    }

});
