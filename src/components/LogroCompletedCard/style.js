import { StyleSheet } from 'react-native';

import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        height: heightPercentageToPx(20),
        marginTop: heightPercentageToPx(2.83),
        backgroundColor: '#0E1222',
        alignSelf: 'center',
        width: widthPercentageToPx(95),
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(0.62),
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10,
        justifyContent: 'center'
    },
    contentContainer: {
        marginLeft: widthPercentageToPx(4),
        marginRight: widthPercentageToPx(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    prizeContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    prizeNumber: {
        fontSize: 36,
        color: '#FFF',
        letterSpacing: .45,
        textAlign: 'center',
        marginLeft: widthPercentageToPx(2.13)
    },
    description: {
        fontSize: 14,
        letterSpacing: .17,
        lineHeight: 16,
        textAlignVertical: 'center',
        color: '#FFF',
        marginLeft: widthPercentageToPx(2.13),
        width: widthPercentageToPx(60)
    }
}); 