// josep.sanahuja    - 18-09-2019 - us114 - File creation

import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  FlatList
} from 'react-native'

import styles from './style'
import LogrosList from '../../components/LogroCard/LogrosList';

class LogrosScreen extends React.Component {
  render() {
    return (
        <SafeAreaView style={styles.sfvContainer}>
    	    	<View style={styles.container}>
    	        	<LogrosList />
            </View>
	      </SafeAreaView>
    );
  }
}

export default LogrosScreen;
