import React from 'react';

import {
  View, Text
} from 'react-native'

import styles from './style'

export default class MockScreen2 extends React.Component {
  render() {
    return (
       <View style={styles.container}>
          <Text >Welcome to React Native!</Text>
          <Text >To get started, edit App.js</Text>
      </View>
    );
  }
}
