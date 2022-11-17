import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    contentContainer: {
        alignItems: 'center'
    },
    title: {
        marginTop: 24,
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: -.72,
        color: '#FFF'
    },
    instructions: {
        marginTop: 8,
        fontSize: 16,
        letterSpacing: .25,
        textAlign: 'center',
        color: '#FFF'
    },
    bold: {
        fontWeight: '700'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 24
    },
    upgradeButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 1000,
        backgroundColor: '#3B4BF9',
        paddingVertical: 26,
    },
    upgradeButtonText: {
        marginRight: 4,
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: .49
    },
    secondButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center'
    },
    secondButtonText: {
        fontSize: 16,
        letterSpacing: .49,
        fontWeight: '700',
        color: 'rgba(255, 255, 255, .8)'
    }
});