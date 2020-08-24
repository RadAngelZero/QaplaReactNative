import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button, StatusBar, Dimensions, I18nManager } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';


import Bar from './Bar'

export default class BarWithGhost extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{ position: 'absolute' }}>
          <Bar
            progress={this.props.progressGhost}
            animationConfig={this.props.animationConfig}
            animationType={this.props.animationType}
            width={this.props.width}
            color={this.props.ghostColor}
            borderWidth={0}
            unfilledColor={this.props.unfilledColor}
            height={this.props.height}
            borderRadius={10}
          />
        </View>
        <View style={{ position: 'absolute' }}>
          <Bar
            progress={this.props.progress}
            animationConfig={this.props.animationConfig}
            animationType={this.props.animationType}
            width={this.props.width}
            color={this.props.color}
            borderWidth={0}
            unfilledColor={'#20202000'}
            height={this.props.height}
            borderRadius={10}
          />
        </View>
      </View>
    )
  }

}