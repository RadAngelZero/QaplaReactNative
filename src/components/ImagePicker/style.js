// josep.sanahuja    - 30-09-2019 - us118 - File creation

import { StyleSheet } from 'react-native'
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export default StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',
  },
  imageContainer: {
      justifyContent: 'flex-start',
      alignSelf: 'center',
      marginBottom: heightPercentageToPx(2), 
      width: widthPercentageToPx(95),
      height: heightPercentageToPx(40)
  },
  content:{
      backgroundColor: 'white',
      marginHorizontal: widthPercentageToPx(2.67),
      paddingHorizontal: widthPercentageToPx(2.67),
      paddingVertical: heightPercentageToPx(0.62),
      borderRadius: 3
  },
  okButtonContainer: {
      bottom: heightPercentageToPx(12.31),
      alignSelf: 'center',
      position: 'absolute',
      borderRadius: 100,
      backgroundColor: '#FA2D79',
      elevation: 10,
      width: widthPercentageToPx(66.6)
  },
  cancelButtonContainer: {
      bottom: heightPercentageToPx(4.30),
      alignSelf: 'center',
      position: 'absolute',
      borderRadius: 100,
      backgroundColor: '#FA2D79',
      elevation: 10,
      width: widthPercentageToPx(66.6)
  },
  moreButtonContainer: {
      alignSelf: 'center',
      borderRadius: 100,
      backgroundColor: '#FA2D79',
      elevation: 10,
      width: widthPercentageToPx(66.6)
  },
  textStyle: {
      color: '#FFF',
      alignSelf: 'center',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      marginTop: heightPercentageToPx(2.46),
      marginBottom: heightPercentageToPx(2.46),
      marginLeft: widthPercentageToPx(8.53),
      marginRight: widthPercentageToPx(8.53),
      letterSpacing: .57
  },
  picture: {
      height: heightPercentageToPx(40),
      width: widthPercentageToPx(95),
      resizeMode: 'cover'  
  }
})
