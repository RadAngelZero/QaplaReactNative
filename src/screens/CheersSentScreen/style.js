import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1021'
    },
    card: {
        position: 'absolute',
        bottom: 0,
        height: heightPercentageToPx(86.20),
        width: widthPercentageToPx(100),
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heartHandsImage: {
        position: 'absolute',
        zIndex: 9999,
        alignSelf: 'center',
        top: -16,
        width: heightPercentageToPx(31),
        height: heightPercentageToPx(31),
        resizeMode: 'contain'
    },
    thankTitle: {
        fontSize: 30,
        fontWeight: '600',
        lineHeight: 30,
        letterSpacing: -.72,
        color: '#FFF'
    },
    cheersSentMessage: {
        textAlign: 'center',
        marginTop: 24,
        fontSize: 22,
        fontWeight: '500',
        lineHeight: 22,
        letterSpacing: .35,
        color: '#FFF'
    },
    streamerName: {
        color: '#00FFDD'
    },
    cheersBar: {
        width: widthPercentageToPx(60),
        height: heightPercentageToPx(13.5),
        marginTop: 48,
        backgroundColor: '#15143B',
        borderRadius: 20,
        justifyContent: 'center',
        paddingRight: 16,
        paddingLeft: 16
    },
    rewardsHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    lifesContainer: {
        flexDirection: 'row',
        marginTop: 8
    },
    currentPoints: {
        color: '#FFF',
        fontSize: 12,
        alignSelf: 'center'
    },
    barUpdated: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18,
        textAlign: 'center',
        color: '#00FFDC'
    },
    backButton: {
        borderRadius: 100,
        marginTop: 80,
        backgroundColor: '#00FFDD',
        justifyContent: 'center',
        alignItems: 'center',
        height: heightPercentageToPx(9.11),
        width: widthPercentageToPx(69.33)
    },
    finish: {
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: .49,
        textAlign: 'center'
    }
});