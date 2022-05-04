import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#0C1021',
        paddingBottom: 8,
    },
    tabStyle: {
        borderRadius: 6,
        paddingLeft: 13,
        paddingRight: 13,
        paddingTop: 6,
        paddingBottom: 6,
        marginLeft: 20,
    },
    activeTab: {
        backgroundColor: '#29326B',
        paddingVertical: 6,
        paddingHorizontal: 13,
    },
    inactiveTab: {
        backgroundColor: 'transparent',
        paddingVertical: 6,
        paddingHorizontal: 13,
    },
    inactiveTabText: {
        color: '#FFFFFF99',
    },
    tabLabelStyle: {
        color: '#FFF',
        fontSize: 17,
        textAlign: 'center',
        fontWeight: '600',
        lineHeight: 22,
        letterSpacing: -0.33764705061912537,
        textAlignVertical: 'center',
    }
});