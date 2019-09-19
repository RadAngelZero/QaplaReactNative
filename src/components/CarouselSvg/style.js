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
  carouselContainer: {
    width: getDimensions().width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
     width: getDimensions().width,
     height:  getDimensions().height * 0.6,
     justifyContent: 'flex-start'
  }
});