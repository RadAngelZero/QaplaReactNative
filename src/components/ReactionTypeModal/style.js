import { StyleSheet } from 'react-native';

import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .5)'
    },
    mainContainer: {
        padding: 16,
        position: 'absolute',
        backgroundColor: '#141539',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(90)
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '500',
        color: '#FFF'
    },
    reactionsContainer: {
        flexDirection: 'column',
        marginTop: 8
    },
    reactionType: {
        marginTop: 24,
        width: widthPercentageToPx(91.46),
        height: heightPercentageToPx(19.95),
        backgroundColor: '#141539',
        borderRadius: 25,
        overflow: 'hidden'
    },
    reactionTypeContent: {
        flex: 1,
        flexDirection: 'row',
        padding: 24
    },
    descriptionContainer: {
        justifyContent: 'space-between'
    },
    perksContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    reactionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFF'
    },
    priceContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    price: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 10,
        backgroundColor: '#141833',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    priceNumber: {
        marginLeft: 8,
        fontSize: 20,
        fontWeight: '700',
        color: '#FFF'
    }
});