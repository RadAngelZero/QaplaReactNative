// diego          - 09-08-2019 - bug4 - styles for icons on the match card added

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    matchMainContainer: {
        backgroundColor: '#141833',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.14)',
        shadowRadius: 5,
        shadowOpacity: 1,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 16,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 12,
        paddingRight: 12,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    matchContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    gameLogoImage: {
        backgroundColor: 'transparent',
        resizeMode: 'center'
    },
    gameText: {
        color: '#FFF',
        // fontFamily: 'SFProRounded-Regular',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'left',
        lineHeight: 21,
        marginLeft: 12
    },
    betContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    betText: {
        color: '#FFF',
        // fontFamily: 'SFProRounded-Regular',
        fontSize: 32,
        fontWeight: 'bold',
        marginRight: 12
    },
    timeText: {
        width: '100%',
        color: '#ebebf5',
        // fontFamily: 'SFProText-Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'right',
        alignSelf: 'flex-end',
        marginTop: 24,
        lineHeight: 16
    },
    matchDetailInfoContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    avatarImage: {
        height: 24,
        width: 24,
        borderRadius: 24 / 2,
        backgroundColor: '#0E1222',
        resizeMode: 'cover'
    },
    usernameText: {
        backgroundColor: 'transparent',
        color: '#ebebf5',
        // fontFamily: 'SFProRounded-Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlignVertical: 'center',
        lineHeight: 16,
        marginLeft: 8
    },
    idRetaText: {
        backgroundColor: 'transparent',
        color: '#ebebf5',
        // fontFamily: 'SFProRounded-Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlignVertical: 'center',
        lineHeight: 16
    }
});
