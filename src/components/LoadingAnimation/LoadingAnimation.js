import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import Animated, { Easing } from 'react-native-reanimated';

import styles from './style';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default class LoadingAnimation extends Component {

  state = {
    Dot1: new Animated.Value(0),
    Dot2: new Animated.Value(0),
    Dot3: new Animated.Value(0)
  }

  animation = () => {
    Animated.timing(this.state.Dot1, {
      toValue: -20,
      duration: 50,
      easing: Easing.ease
    }).start(() => {
      Animated.timing(this.state.Dot1, {
        toValue: 0,
        duration: 300,
        easing: Easing.bounce
      }).start(Animated.timing(this.state.Dot2, {
        toValue: -20,
        duration: 50,
        easing: Easing.ease
      }).start(() => {
        Animated.timing(this.state.Dot2, {
          toValue: 0,
          duration: 300,
          easing: Easing.bounce
        }).start(Animated.timing(this.state.Dot3, {
          toValue: -20,
          duration: 50,
          easing: Easing.ease
        }).start(() => {
          Animated.timing(this.state.Dot3, {
            toValue: 0,
            duration: 300,
            easing: Easing.bounce
          }).start(() => this.animation())
        }))
      }))
    });
  }

  componentDidMount() {
    this.animation()
  }



  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', paddingTop: 30 }}>
          <AnimatedSvg width={20} height={20} style={{ marginHorizontal: 5, transform: [{ translateY: this.state.Dot1 }] }} >
            <G>
              <Circle
                id='Dot1'
                cx='10'
                cy='10'
                origin='10,10'
                r='10'
                fill='#0affd2'
              />
            </G>
          </AnimatedSvg>
          <AnimatedSvg width={20} height={20} style={{ marginHorizontal: 5, transform: [{ translateY: this.state.Dot2 }] }} >
            <G>
              <Circle
                id='Dot2'
                cx='10'
                cy='10'
                origin='10,10'
                r='10'
                fill='#0affd2'
              />
            </G>
          </AnimatedSvg>
          <AnimatedSvg width={20} height={20} style={{ marginHorizontal: 5, transform: [{ translateY: this.state.Dot3 }] }} >
            <G>
              <Circle
                id='Dot3'
                cx='10'
                cy='10'
                origin='10,10'
                r='10'
                fill='#0affd2'
              />
            </G>
          </AnimatedSvg>
        </View>
      </View>
    );
  }
}