import {AsyncStorage} from 'react-native';

// key: string
// const retrieveData = async (key) => {
async function retrieveData(key) {
  let result = null;

  try {
    const value = await AsyncStorage.getItem('TASKS');
    if (value !== null) {
      // Data retrieved
      console.log("[retrieveData] : " + value);
      result = value;
    }
    else {
    	console.log("[retrieveData] : " + value);
    }
  } catch (error) {
    // Error retrieving data
  }

  return result;
};

// key: string
// value: string
// const storeData = async (key, value) => {
async function storeData(key, value) {	
  try {
    await AsyncStorage.setItem('@QaplaRN:'+ key, value);
    console.log();
  } catch (error) {
    // Error saving data
  }
};

export {retrieveData, storeData }