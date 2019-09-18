// josep.sanahuja    - 05-08-2019 - us84 - + sfvContainer

import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  sfvContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'#131833'
  },
  container:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'purple'
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
  }
})
