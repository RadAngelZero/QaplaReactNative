import React from 'react';

import {
  View, Text, SafeAreaView
} from 'react-native'

import styles from './style'

import Images from '@assets/images'
// import iIcon from '@assets/images'

export default class PublicMatchesFeedScreen extends React.Component {
  render() {

  	const FacebookIc = Images.svg.favouritesIcon;
  	
    return (
       <SafeAreaView style={styles.container}>
	       <View style={styles.container}>
		        <Text >Welcome to React Native!</Text>
		        <Text >To get started, edit App.js</Text>
		        <FacebookIc width={120} height={40} fill="green"/>  
		    </View>
	    </SafeAreaView>
    );
  }
}

// <Image source = {Images.publicFeedMatchIcon} style={{width: 40, height: 40}} />