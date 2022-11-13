import { StyleSheet } from 'react-native';

import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .5)'
    },
    mainContainer: {
        padding: 16,
        position: 'absolute',
        backgroundColor: '#141539',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: widthPercentageToPx(100)
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '500',
        color: '#FFF'
    },
    voicesContainer: {
        flexDirection: 'column',
        marginBottom: 32
    },
    voicesList: {
        maxHeight: heightPercentageToPx(80)
    },
    botVoiceRow: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    voiceBotContainer: {
        borderRadius: 1000,
        padding: 3,
        marginRight: 15,
    },
    voiceBot: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 998,
        paddingHorizontal: 24,
        paddingVertical: 16
    },
    voiceBotLabel: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF'
    },
    sideIconsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});