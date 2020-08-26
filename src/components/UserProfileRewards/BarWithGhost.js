import React, { Component } from 'react';
import { View } from 'react-native';

/* 

Example of use

<BarWithGhost
  progress={this.state.rewardsProgress}
  progressGhost={this.state.rewardsProgressGhost}
  animationConfig={{ easing: Easing.inOut(Easing.quad), duration: 500 }}
  animationType={'timing'}
  width={Dimensions.get('screen').width * 0.8}
  color={'#00ffe2'}
  ghostColor={'#ccca'}
  borderWidth={0}
  unfilledColor={'#20202040'}
  height={10}
  borderRadius={10}
/>

*/

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