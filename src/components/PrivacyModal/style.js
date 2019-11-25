// josep-sanahuja          - 21-12-2019 - us152 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    sfvContainer: {
      flex:1,
      justifyContent: 'center',
      backgroundColor:'#131833'
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141833',
        width: widthPercentageToPx(100),
        height: heightPercentageToPx(100),
    },
    container: {
        width: widthPercentageToPx(100),
        alignSelf: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#141833',
        alignItems: 'center'
    },
    textContainer: {
        width: widthPercentageToPx(90),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: heightPercentageToPx(5),
        paddingBottom: heightPercentageToPx(35)
    },
    closeIcon: {
        marginRight: widthPercentageToPx(5.33),
        marginBottom: heightPercentageToPx(2.46),
        marginTop: heightPercentageToPx(10),
        alignSelf: 'flex-end'
    },
    modalTitle: {
        color: '#FFF',
        fontSize: 24,
        maxWidth: widthPercentageToPx(70),
        
    },
    lineText: {
        color: 'white'
    }
});