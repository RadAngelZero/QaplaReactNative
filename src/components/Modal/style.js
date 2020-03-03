import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    overlay: {
        height: heightPercentageToPx(100),
        width: widthPercentageToPx(100),
        backgroundColor: 'rgba(0, 0, 0, .5)',
        flex: 1,
        position: 'absolute',
        zIndex: 2
    },
    mainContainer: {
        position: 'absolute',
        top: heightPercentageToPx(0),
        left: widthPercentageToPx(0),
        right: widthPercentageToPx(0),
        bottom: heightPercentageToPx(0),
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        maxHeight: heightPercentageToPx(80),
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#141833',
        borderRadius: 20,
        zIndex: 1000,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: widthPercentageToPx(0),
            height: heightPercentageToPx(0.25),
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginRight: widthPercentageToPx(5.33),
        marginLeft: widthPercentageToPx(5.33)
    },
    modalBody: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    closeIcon: {
        fontSize: 20,
        flexDirection: 'row',
        alignSelf: 'flex-end',
		textAlignVertical: 'top',
		width: 30,
		height: 30,
        marginRight: widthPercentageToPx(2.67),
        marginTop: heightPercentageToPx(2.46),
        color: '#FFF',
    }
})
