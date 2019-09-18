// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView

import React from 'react';

import {
  View,
  Text,
  SafeAreaView
} from 'react-native'

import styles from './style'

import {getQaplaActiveLogros} from '../../services/database'

export default class MockScreen1 extends React.Component {
  async componentDidMount() {
    console.log("Logros: \n" + JSON.stringify( await getQaplaActiveLogros(), null, 2));
  }

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
