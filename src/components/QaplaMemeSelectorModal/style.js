import { StyleSheet } from 'react-native';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1021',
    },
    memesContainer: {
        position: 'absolute',
        backgroundColor: '#141539',
        height: heightPercentageToPx(85),
        bottom: 0,
        borderTopLeftRadius: widthPercentageToPx(10.66),
        borderTopRightRadius: widthPercentageToPx(10.66),
        width: widthPercentageToPx(100),
        overflow: 'hidden',
    },
    gridMemeContainer: {
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: widthPercentageToPx(1.6),
    },
    gridMemeSubContainer: {
        paddingTop: heightPercentageToPx(1.6),
        paddingBottom: heightPercentageToPx(10),
    },
    gridSearchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: heightPercentageToPx(4.92),
        marginTop: 16,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    }
});