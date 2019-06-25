import { StyleSheet, Platform } from 'react-native';

<<<<<<< HEAD
export const styles = StyleSheet.create({
    container: {
        height: 90,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'flex-start',
        marginTop: Platform.OS == 'ios' ? 20 : 0,
=======
import {isIphoneX, isIPhoneXSize, getDimensions, hasSafeAreaView} from '@utilities/iosAndroidDim'

export const styles = StyleSheet.create({
    container: {
        height: hasSafeAreaView() ? 100 : 90,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'flex-start',
        marginTop: ((Platform.OS == 'ios') && !hasSafeAreaView()) ? 20 : 0,
        paddingTop: hasSafeAreaView() ? 20 : 0,
>>>>>>> jm-dev-25-06-2019
        backgroundColor: '#0e1222'
    },
    imageContainer: {
        flex: 1,
        marginLeft: 20,
        marginTop: 24
    },
    imageAndButtonDimensions: {
        height: 28,
        width: 28
    },
    textContainer: {
        flexGrow: 1,
        marginTop: 20,
        justifyContent: 'flex-start'
    },
    textStyle: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff'
    },
    invisibleView: {
        flex: 1,
        marginRight: 20
    }
});