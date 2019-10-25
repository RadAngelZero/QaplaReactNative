import { Dimensions, Platform, PixelRatio } from 'react-native';

function getPercentHeight(value) {
  return (value/812) * 100;
}

function getPercentWidth(value) {
  return (value/375) * 100;
}

function getDimensions() {
	return Dimensions.get('window');
}

function isIphoneX() {
  const dim = Dimensions.get('window');
  
  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}

function isIPhoneXSize(dim) {
  return dim.height == 812 || dim.width == 812;
}

function isIPhoneXrSize(dim) {
  return dim.height == 896 || dim.width == 896;
}

// Here code for Android should be added ideally
function hasSafeAreaView() {
	let result = false;

	console.log("isIphoneX: " + isIphoneX() + "isIPhoneXSize: " + isIPhoneXSize(getDimensions()));

	if (isIphoneX() && isIPhoneXSize(getDimensions()))
	{
		result = true;
	}
	return result;
}

function widthPercentageToPx(widthPercent) {
  const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel(getDimensions().width * elemWidth / 100);
}

function heightPercentageToPx(heightPercent) {
  const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel(getDimensions().height * elemHeight / 100);
}

function getPixelSizeForLayoutSize(num) {
  return PixelRatio.getPixelSizeForLayoutSize(num);
}

export {getPercentHeight, getPercentWidth, isIphoneX, isIPhoneXSize, isIPhoneXrSize, getDimensions, hasSafeAreaView, widthPercentageToPx, heightPercentageToPx, getPixelSizeForLayoutSize };