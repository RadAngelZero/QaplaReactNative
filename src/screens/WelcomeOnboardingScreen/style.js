// josep.sanahuja    - 05-08-2019 - us84 - + sfvContainer

import {StyleSheet} from 'react-native'

import {getDimensions} from '@utilities/iosAndroidDim'

export default StyleSheet.create({
   sfvContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor:'#131833'
  },
  content:{
    backgroundColor:'#131833',
    marginHorizontal:10,
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:3
  },
  carousel: {
    flex: 1,
    alignItems: 'center',
  },
  groupA: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  image: {
     width: getDimensions().width,
     height:  getDimensions().height * 0.75,
  },
  switch: {
    marginBottom: '5%'
  },
  hideTutorial: {
    marginRight: '5%',
    color: 'white',
    paddingBottom: '10%'

  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center'
  },
  text: {
    marginTop: '2%',
    marginBottom: '10%',
    color: '#36E5CE'
  }
})