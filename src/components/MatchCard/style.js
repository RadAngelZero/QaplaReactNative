// diego          - 09-08-2019 - bug4 - styles for icons on the match card added

import { StyleSheet } from 'react-native';
import { getDimensions } from '../../utilities/iosAndroidDim';

export const styles = StyleSheet.create({
    container: {
        height: getDimensions().height/6,
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
        elevation: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 20
    },
    col: {
        flexDirection: 'column',
    },
    marginBottom10: {
        marginBottom: 10
    },
    gameContainer: {
        marginLeft: 12,
        flexDirection: 'row'
    },
    leftTextStyle: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
        textAlignVertical: 'center',
        marginLeft: 12
    },
    rightTextStyle: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
        textAlignVertical: 'center'
    },
    matchDetailInfoContainer: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginRight: 12
    },
    betContainer: {
        flexDirection: 'row',
        marginLeft: 6
    },
    hourContainer: {
        flexDirection: 'row',
        marginLeft: 6
    },
    leftFooterTextStyle: {
        color: '#FFF',
        fontSize: 11,
        marginLeft: 6,
        textAlignVertical: 'center'
    },
    rightFooterTextStyle: {
        color: '#FFF',
        fontSize: 11,
        marginRight: 12
    },
    adversaryDataContainer: {
        flexDirection: 'row',
        marginLeft: 12
    },
    avatarImage: {
        height: 24,
        width: 24,
        borderRadius: 100,
        backgroundColor: '#131833',
        marginRight: 12
    },
    qaploinIcon: {
        marginRight: 6
    }
});