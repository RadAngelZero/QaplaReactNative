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
  image: {
     width: getDimensions().width,
     height:  getDimensions().height * 0.75,
     justifyContent: 'flex-start'
  },
  text: {
    marginTop: '2%',
    color: '#36E5CE',
    marginBottom: '5%',
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