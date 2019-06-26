import React from 'react';

import {
  View, Text
} from 'react-native'

import styles from './style'

export default class MockScreen1 extends React.Component {
  render() {
    return (
       <View style={styles.container}>
          <Text >Miau!</Text>
          <Text >To get started, edit App.js</Text>
      </View>
    );
  }
}
