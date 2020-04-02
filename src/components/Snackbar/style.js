import { StyleSheet } from 'react-native';
import { widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 4,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        justifyContent: 'center',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        position: 'absolute',
        alignItems: 'center',
        width: widthPercentageToPx(85),
        height: heightPercentageToPx(12),
        /**
         * The left value is given by the width of the snackbar (widthPercentageToPx(85))
         * and the next operation
         * 100 - 85 (these are values of the screen, all the width from the screen less the width of the snackbar)
         * (100 - 85) / 2 we divide the result between two, in this way we add only the necessary margin for the snackbar
         * In other words, we have the 85% of the screen filled with the snackbar so we make a margin of 7.5% from the left
         * so we have a centered snackbar
         */
        left: widthPercentageToPx(7.5)
    },
    message: {
        fontSize: 14,
        color: '#000',
        textAlignVertical: 'center',
        marginRight: widthPercentageToPx(5),
        marginLeft: widthPercentageToPx(5)
    },
    messageWithAction: {
        fontSize: 14,
        color: '#000',
        textAlignVertical: 'center',
        maxWidth: '65%',
        marginRight: widthPercentageToPx(5),
        marginLeft: widthPercentageToPx(5)
    },
    actionTextButton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#36E5CE',
        textAlignVertical: 'center',
        marginRight: widthPercentageToPx(2.5),
        marginLeft: widthPercentageToPx(2.5)
    }
});