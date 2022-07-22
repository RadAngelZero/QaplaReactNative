
import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#141833',
        alignSelf: 'center',
        alignItems: 'center',
        width: widthPercentageToPx(100)
    },
    gifStatusContainer: {
        position: 'absolute',
        zIndex: -1,
        left: 0,
        bottom: heightPercentageToPx(20),
        borderColor: '#FF0000',
        borderWidth: 1
    },
    gifStatus: {
        resizeMode: 'contain'
    },
    gradientContainer: {
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: heightPercentageToPx(25.24),
        width: widthPercentageToPx(100),
        zIndex: 9999,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressContainer: {
        width: widthPercentageToPx(87.2)
    },
    statusText: {
        marginTop: 32,
        fontSize: 24,
        fontWeight: '700',
        color: '#FFF'
    }
});