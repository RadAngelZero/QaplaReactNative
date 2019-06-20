import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        height: 90,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'flex-start',
        marginTop: Platform.OS == 'ios' ? 20 : 0,
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