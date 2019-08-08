// josep.sanahuja    - 05-08-2019 - us84 - Changed container to identify notch area
// diego             - 01-08-2019 - us58 - File creation

import { StyleSheet, Platform } from 'react-native';
import {hasSafeAreaView} from './../../utilities/iosAndroidDim'


export default styles = StyleSheet.create({
    container: {
        backgroundColor: '#0E1222',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: hasSafeAreaView() ? 100 : 90, 
        alignItems:'flex-start',
        marginTop: ((Platform.OS == 'ios') && !hasSafeAreaView()) ? 20 : 0,
        paddingTop: hasSafeAreaView() ? 20 : 0,
        
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
        color: '#FFF',
        marginBottom: 18,
        marginTop: 18
    },
    closeIcon: {
        fontSize: 18,
        fontWeight: '400',
        marginRight: 20,
        color: '#FFF',
        marginBottom: 18,
        marginTop: 18
    }
})