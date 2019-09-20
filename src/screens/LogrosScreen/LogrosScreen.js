// josep.sanahuja    - 18-09-2019 - us114 - File creation

import React from 'react';

import {
  View,
  SafeAreaView,
} from 'react-native'

import styles from './style'
import LogrosList from '../../components/LogroCard/LogrosList';

class LogrosScreen extends React.Component {
  render() {
    return (
        <SafeAreaView style={styles.sfvContainer}>
    	      <LogrosList />
	      </SafeAreaView>
    );
  }
}

export default LogrosScreen;
