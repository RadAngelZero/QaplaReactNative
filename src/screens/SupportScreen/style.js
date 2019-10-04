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
    marginHorizontal:10,
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:3
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
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
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 32,
      marginRight: 32,
      letterSpacing: .57
  },
})
