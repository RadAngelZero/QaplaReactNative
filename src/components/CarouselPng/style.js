// diego	  	  - 03-09-2019 - us92 - Update carousel styles according to inVision design

import {StyleSheet} from 'react-native'
import {getDimensions} from '@utilities/iosAndroidDim'

export const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'#131833'
  },
  content:{
    backgroundColor:'white',
    marginHorizontal:10,
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:3
  },
  flatListContainer: {
    width: getDimensions().width,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  imageContainer: {
    height: getDimensions().height * .35,
  },
  image: {
    marginTop: '30%',
     justifyContent: 'flex-start'
  },
  title: {
    marginTop: '25%',
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  divider: {
    marginTop: '4%'
  },
  description: {
    marginTop: '10%',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: '5%',
    maxWidth: getDimensions().width - 64
  },
  switch: {
    marginBottom: '5%'
  },
  hideTutorial: {
    marginRight: '10%',
    color: '#36E5CE',
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
  }
});