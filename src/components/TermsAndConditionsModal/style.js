// diego           - 22-11-2019 - us151 - File creation

import { StyleSheet } from 'react-native';

import { widthPercentageToPx, paddingTopForAndroidDevicesWithNotch } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141833',
        alignSelf: 'center',
        paddingLeft: 16,
        paddingRight: 8,
        width: widthPercentageToPx(100),
        paddingTop: paddingTopForAndroidDevicesWithNotch()
    },
    scrollViewContainer: {
        paddingLeft: 16,
        paddingRight: 8,
    },
    closeIcon: {
        alignSelf: 'flex-end'
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFF',
        marginBottom: 8
    },
    paragraph: {
        marginBottom: 8,
        color: '#FFF'
    },
    strongText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF'
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#FFF'
    },
    numericList: {
        marginLeft: 16,
        marginRight: 12
    },
    underline: {
        textDecorationLine: 'underline'
    }
});