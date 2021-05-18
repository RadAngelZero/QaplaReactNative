import { StyleSheet } from 'react-native'
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#131833'
  },
  content: {
    backgroundColor: '#FFF',
    marginHorizontal: widthPercentageToPx(2.67),
    paddingHorizontal: widthPercentageToPx(2.67),
    paddingVertical: heightPercentageToPx(0.62),
    borderRadius: 3
  },
  flatListContainer: {
    width: widthPercentageToPx(100),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    marginTop: heightPercentageToPx(1.6),
    height: heightPercentageToPx(60),
    width: widthPercentageToPx(100),
    resizeMode: 'contain',
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
    marginTop: heightPercentageToPx(1.64),
    // fontSize: 18,
    // fontWeight: '500',
    // lineHeight: 21,
    // color: '#FFF',
    // textAlign: 'center',
    // marginBottom: heightPercentageToPx(5),
    // maxWidth: widthPercentageToPx(83)
    color: 'white',
    fontSize: 21,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 26,
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