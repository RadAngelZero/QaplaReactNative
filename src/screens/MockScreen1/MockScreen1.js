// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView

import React from 'react';

import {
  View,
  Text,
  SafeAreaView
} from 'react-native'

import styles from './style'

export default class MockScreen1 extends React.Component {
  render() {
    return (
        <SafeAreaView style={styles.sfvContainer}>
	    	<View style={styles.container}>
	        	<Text >Miau!</Text>
	        	<Text >To get started, edit App.js</Text>
	      	</View>
	    </SafeAreaView>
    );
  }
}
