import { StyleSheet } from 'react-native';

import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        width: widthPercentageToPx(91),
        backgroundColor: '#141539',
        borderRadius: 40,
        paddingVertical: 56,
        paddingHorizontal: 42,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeModalIcon: {
        position: 'absolute',
        top: 16,
        right: 16
    },
    closeIcon: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
});