// josep.sanahuja    - 04-10-2019 - XXXX - File creation

import {StyleSheet} from 'react-native'
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim'

export default StyleSheet.create({
  sfvContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#131833'
  },
  container:{
    flex:1,
    justifyContent:'center',
  },
  content:{
    backgroundColor:'white',
    marginHorizontal: widthPercentageToPx(2.67),
    paddingHorizontal: widthPercentageToPx(2.67),
    paddingVertical: heightPercentageToPx(0.62),
    borderRadius:3
  },
  textInput: {
        backgroundColor: '#11152D',
        height: heightPercentageToPx(20),
        width: widthPercentageToPx(90),
        borderBottomColor: '#6D7DDE',
        color: '#FFFF',
        borderRadius: 4,
        borderBottomWidth: 2
  },
  sendButtonContainer: {
      alignSelf: 'center',
      borderRadius: 100,
      backgroundColor: '#FA2D79',
      elevation: 10,
      width: widthPercentageToPx(70),
      marginTop: heightPercentageToPx(5)
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
})
