import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: '#0e1222',
        alignSelf: 'center',
        width: '95%',
        marginTop: 15,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 20,
    },
    col: {
        flexDirection: 'column',
    },
    marginBottom10: {
        marginBottom: 10
    },
    leftTextStyle: {
        color: '#FFF',
        marginLeft: 22
    },
    rightTextStyle: {
        color: '#FFF',
        marginRight: 22
    },
    listContainer: {
        flex: 1
    }
});