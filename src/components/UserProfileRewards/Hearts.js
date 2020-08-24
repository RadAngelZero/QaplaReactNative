import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button, Animated, Easing, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import LinearGradient from 'react-native-linear-gradient';
import Svg, { LinearGradient, Defs, Stop, Ellipse, G, Path, ForeignObject } from 'react-native-svg';

import images from '../../../assets/images';

const AnimatedStop = Animated.createAnimatedComponent(Stop);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const HeartSVG = images.svg.favouritesIcon;

class Heart extends Component {
    constructor(props) {
        super(props);
        this.progress = new Animated.Value(props.progress);
        this.id = props.id;
        this.width = props.width;
        this.height = props.height;
        this.scale = props.scale;
        this.scaleAnimated = new Animated.Value(1)
        this.fillAndBounced = props.progress > 0.6 ? true : false
        this.scaleTo = props.scaleTo || 1.2
    }

    heartBounce = () => {
        if (this.props.progress > 0.6 && !this.fillAndBounced) {
            Animated.sequence([
                Animated.timing(this.scaleAnimated,
                    {
                        toValue: this.scaleTo,
                        duration: 500,
                        easing: Easing.bounce,
                        useNativeDriver: false
                    }),
                Animated.timing(this.scaleAnimated,
                    {
                        toValue: 1,
                        duration: 250,
                        easing: Easing.ease,
                        useNativeDriver: false
                    })
            ]).start()
            this.fillAndBounced = true
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.progress != this.props.progress) {
            const progress = this.props.progress
            Animated.timing(this.progress,
                {
                    toValue: progress,
                    duration: 250,
                    easing: Easing.cubic,
                    useNativeDriver: false
                }).start(() => this.heartBounce())
            if (this.props.progress < 1) {
                this.fillAndBounced = false
            }
        }
    }

    render() {
        return (
            <View>
                <AnimatedSvg width={this.width} height={this.height} style={{ transform: [{ scale: this.scaleAnimated }] }}>
                    <Defs>
                        <AnimatedLinearGradient id={`grad${this.id}`} x1="0" y1="0" x2="1" y2="0">
                            <AnimatedStop offset={this.progress} stopColor="#D4AF37" stopOpacity="1" />
                            <AnimatedStop offset={this.progress} stopColor="#555555" stopOpacity=".5" />
                        </AnimatedLinearGradient>
                    </Defs>

                    <AnimatedPath d="M255,489.6l-35.7-35.7C86.7,336.6,0,257.55,0,160.65C0,81.6,61.2,20.4,140.25,20.4c43.35,0,86.7,20.4,114.75,53.55C283.05,40.8,326.4,20.4,369.75,20.4C448.8,20.4,510,81.6,510,160.65c0,96.9-86.7,175.95-219.3,293.25L255,489.6z"
                        fill={`url(#grad${this.id})`} scale={this.scale} translateX={5} origin={[0.5, 0.5]}
                    />
                </AnimatedSvg>
            </View>
        )
    }
}

export default class Hearts extends Component {
    constructor(props) {
        super(props);
        this.hearts = new Animated.Value(props.hearts)
        this.heartsToDisplay = new Array();
    };

    displayHearts = () => {
        for (let i = 0; i < this.props.heartsContainers; i++) {
            this.heartsToDisplay[i] = (<Heart key={`${i}`} id={i} progress={this.props.hearts - i} width={50} height={50} scale={0.075} />)
        }
        return (this.heartsToDisplay)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.hearts != this.props.hearts) {
            const hearts = this.props.hearts
            Animated.timing(this.hearts,
                {
                    toValue: hearts,
                    duration: 250,
                    easing: Easing.cubic,
                    useNativeDriver: false
                }).start()
        }
        this.displayHearts()
    }

    render() {
        return (
            <Animated.View style={{ alignSelf: 'flex-start' }}>
                <Animated.View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {this.displayHearts()}
                </Animated.View>
            </Animated.View>
        );
    }
}