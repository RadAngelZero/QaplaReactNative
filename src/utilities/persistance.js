// josep.sanahuja - 08-07-2019 - us83 - + removeDataItem

import AsyncStorage from '@react-native-community/async-storage';

// key: string
// const retrieveData = async (key) => {
async function retrieveData(key) {
  let result = null;

  try {
    const value = await AsyncStorage.getItem('@QaplaRN:'+ key);
    if (value !== null) {
      result = value;
    }
  } catch (error) {
    // Error retrieving data
    console.error(error);
  }

  return result;
};

// key: string
// value: string
// const storeData = async (key, value) => {
async function storeData(key, value) {	
  try {
    await AsyncStorage.setItem('@QaplaRN:'+ key, value);
  } catch (error) {
    // Error saving data
    console.error(error);
  }
};

// key: string
// const storeData = async (key) => {
async function removeDataItem(key) {  
  try {
    await AsyncStorage.removeItem('@QaplaRN:'+ key);
  } catch (error) {
    // Error saving data
    console.error(error);
  }
};



export {retrieveData, storeData, removeDataItem }
