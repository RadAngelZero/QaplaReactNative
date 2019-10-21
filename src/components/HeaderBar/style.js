import { StyleSheet, Platform } from 'react-native';

import { hasSafeAreaView } from './../../utilities/iosAndroidDim'

export const styles = StyleSheet.create({
    container: {
        height: hasSafeAreaView() ? 100 : 90,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'flex-start',
        marginTop: ((Platform.OS == 'ios') && !hasSafeAreaView()) ? 20 : 0,
        paddingTop: hasSafeAreaView() ? 20 : 0,
        backgroundColor: '#0e1222'
    },
    imageContainer: {
        flex: 1,
        marginLeft: 20,
        marginTop: 24,
    },
    imageAndButtonDimensions: {
        height: 28,
        width: 28
    },
    textContainer: {
        flexGrow: 1,
        marginTop: 20
    },
    textStyle: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff'
    },
    discordIcon: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        marginTop: 24
    }
});