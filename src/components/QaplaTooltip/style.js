import { StyleSheet } from 'react-native';

import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    tooltipContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    packageContentStyle: {
        backgroundColor: 'transparent',
        marginTop: 18
    },
    gradientContainerStyle: {
        width: widthPercentageToPx(75),
        borderRadius: 12
    },
    content: {
        color: '#FFF',
        fontSize: 14,
        marginTop: 24,
        marginBottom: 8,
        marginHorizontal: 12
    },
    buttonText: {
        alignSelf: 'flex-end',
        color: '#FFF',
        fontSize: 14,
        marginBottom: 16,
        marginRight: 16
    }
});