// diego           - 18-09-2019 - us133 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        marginTop: heightPercentageToPx(2.83),
        backgroundColor: '#0E1222',
        alignSelf: 'center',
        width: widthPercentageToPx(95),
        marginTop: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .34,
        shadowRadius: 6.27,
        elevation: 10,
        justifyContent: 'space-between'
    },
    contentContainer: {
        marginLeft: widthPercentageToPx(4),
        marginRight: widthPercentageToPx(4)
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: .2,
        color: '#FFF',
        marginTop: 18,
        maxWidth: '85%',
        alignSelf: 'flex-start'
    },
    description: {
        fontSize: 10,
        fontWeight: '500',
        letterSpacing: .1,
        lineHeight: 10,
        color: '#ACACAC',
        marginTop: heightPercentageToPx(1)
    },
    verifyButton: {
        borderRadius: 100,
        backgroundColor: '#FA2D79',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: heightPercentageToPx(2),
        maxWidth: '33%',
        marginBottom: heightPercentageToPx(2)
    },
    verifyTextButton: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: .15,
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 12
    }
});