import { Dimensions, Platform } from 'react-native';

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

export {isIphoneX, isIPhoneXSize, isIPhoneXrSize, getDimensions, hasSafeAreaView };