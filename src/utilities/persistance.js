// josep.sanahuja - 08-07-2019 - us83 - + removeDataItem

import {AsyncStorage} from 'react-native';

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
  }
};

// key: string
// const storeData = async (key) => {
async function removeDataItem(key) {  
  try {
    await AsyncStorage.removeItem('@QaplaRN:'+ key);
  } catch (error) {
    // Error saving data
  }
};



export {retrieveData, storeData, removeDataItem }