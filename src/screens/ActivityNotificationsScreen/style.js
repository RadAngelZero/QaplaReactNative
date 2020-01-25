// josep.sanahuja    - 18-10-2019 - us140 - Added marginTop on container
// josep.sanahuja    - 05-08-2019 - us84 - + sfvContainer
// diego             - 01-08-2019 - us58 - File creation

import { StyleSheet } from 'react-native';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim'

export default styles = StyleSheet.create({
    sfvContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#0D1021'
    },
    container: {
        backgroundColor: '#0D1021',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: heightPercentageToPx(0.5)
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        textAlign: 'center'
    }
});