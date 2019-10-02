// josep.sanahuja    - 30-09-2019 - us118 - File creation

import { StyleSheet } from 'react-native'
import { getDimensions } from '../../utilities/iosAndroidDim'

export default StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',
  },
  imageContainer: {
      justifyContent: 'flex-start',
      alignSelf: 'center',
      marginBottom: '2%', 
      width: getDimensions().width * 0.95,
      height: getDimensions().height / 2.5
  },
  content:{
      backgroundColor:'white',
      marginHorizontal:10,
      paddingHorizontal:10,
      paddingVertical:5,
      borderRadius:3
  },
  okButtonContainer: {
      bottom: 100,
      alignSelf: 'center',
      position: 'absolute',
      borderRadius: 100,
      backgroundColor: '#FA2D79',
      elevation: 10,
      width: 250
  },
  cancelButtonContainer: {
      bottom: 35,
      alignSelf: 'center',
      position: 'absolute',
      borderRadius: 100,
      backgroundColor: '#FA2D79',
      elevation: 10,
      width: 250
  },
  moreButtonContainer: {
      alignSelf: 'center',
      borderRadius: 100,
      backgroundColor: '#FA2D79',
      elevation: 10,
      width: 250
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
  picture: {
      height: getDimensions().height / 2.5,
      width: getDimensions().width * 0.95,
      resizeMode: 'cover'  
  }
})
