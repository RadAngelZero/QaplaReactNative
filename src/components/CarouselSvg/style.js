import {StyleSheet} from 'react-native'
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'#131833'
  },
  content:{
    backgroundColor:'white',
    marginHorizontal: widthPercentageToPx(2.67),
    paddingHorizontal: widthPercentageToPx(2.67),
    paddingVertical: heightPercentageToPx(0.62),
    borderRadius:3
  },
  carouselContainer: {
    width: widthPercentageToPx(100),
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
     width: widthPercentageToPx(100),
     height:  heightPercentageToPx(60),
     justifyContent: 'flex-start'
  }
});