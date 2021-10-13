import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

import style from './style';

export default class ChatAnimatedDots extends Component {
    state = {
        loops: 0,
        dot1Transparency: new Animated.Value(0.2),
        dot2Transparency: new Animated.Value(0.2),
        dot3Transparency: new Animated.Value(0.2),
    }

    componentDidMount() {
        this.animationLoop()
    }

    animationLoop = async () => {
        Animated.loop(
            Animated.stagger(100, [
                Animated.timing(this.state.dot1Transparency, {
                    toValue: 1,
                    duration: 200,
                    easing: Easing.cubic,
                    isInteraction: false,
                    useNativeDriver: false
                }),
                Animated.timing(this.state.dot2Transparency, {
                    toValue: 1,
                    duration: 200,
                    easing: Easing.cubic,
                    isInteraction: false,
                    useNativeDriver: false
                }),
                Animated.timing(this.state.dot3Transparency, {
                    toValue: 1,
                    duration: 200,
                    easing: Easing.cubic,
                    isInteraction: false,
                    useNativeDriver: false
                }),
                Animated.timing(this.state.dot1Transparency, {
                    toValue: 0.2,
                    duration: 200,
                    easing: Easing.cubic,
                    isInteraction: false,
                    useNativeDriver: false
                }),
                Animated.timing(this.state.dot2Transparency, {
                    toValue: 0.2,
                    duration: 200,
                    easing: Easing.cubic,
                    isInteraction: false,
                    useNativeDriver: false
                }),
                Animated.timing(this.state.dot3Transparency, {
                    toValue: 0.2,
                    duration: 200,
                    easing: Easing.cubic,
                    isInteraction: false,
                    useNativeDriver: false
                })
            ]), { iterations: 10, resetBeforeIteration: true }
        ).start()
    }

    render() {
        return (
            <>
                <Animated.View style={[style.dot, {
                    opacity: this.state.dot1Transparency
                }]} />
                <Animated.View style={[style.dot, {
                    marginHorizontal: widthPercentageToPx(2),
                    opacity: this.state.dot2Transparency
                }]} />
                <Animated.View style={[style.dot, {
                    opacity: this.state.dot3Transparency
                }]} />
            </>
        )
    }
}