// diego	  	  - 03-09-2019 - us92 - Update carousel styles according to inVision design

import {StyleSheet} from 'react-native'
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'#131833'
  },
  content:{
    backgroundColor:'#FFF',
    marginHorizontal: widthPercentageToPx(2.67),
    paddingHorizontal: widthPercentageToPx(2.67),
    paddingVertical: heightPercentageToPx(0.62),
    borderRadius:3
  },
  flatListContainer: {
    width: widthPercentageToPx(100),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    height: heightPercentageToPx(35)
  },
  image: {
    marginTop: heightPercentageToPx(17.66),
    justifyContent: 'flex-start'
  },
  title: {
    marginTop: heightPercentageToPx(14.69),
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  divider: {
    marginTop: heightPercentageToPx(3.59)
  },
  description: {
    marginTop: heightPercentageToPx(6.56),
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: heightPercentageToPx(5),
    maxWidth: widthPercentageToPx(83)
  },
  switch: {
    marginBottom: heightPercentageToPx(5)
  },
  hideTutorial: {
    marginRight: widthPercentageToPx(10),
    color: '#36E5CE',
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
  }
});