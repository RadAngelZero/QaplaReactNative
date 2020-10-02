import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, { LinearGradient, Defs, Stop, Path, } from 'react-native-svg';
import QaplaText from '../QaplaText/QaplaText';

const AnimatedStop = Animated.createAnimatedComponent(Stop);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export class Heart extends Component {
    constructor(props) {
        super(props);
        this.progress = new Animated.Value(props.progress);
        this.id = props.id;
        this.scaleAnimated = new Animated.Value(1);
        this.fillAndBounced = props.progress > 0.6 ? true : false;
        this.scaleTo = props.scaleTo || 1.2;
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
            Animated.timing(this.progress, {
                toValue: progress,
                duration: 250,
                easing: Easing.cubic,
                useNativeDriver: false
            }).start(() => this.heartBounce());
            if (this.props.progress < 1) {
                this.fillAndBounced = false
            }
        }
    }

    render() {
        return (
            <AnimatedSvg width={this.props.width} height={this.props.height} style={{ transform: [{ scale: this.scaleAnimated }] }}>
                <Defs>
                    <AnimatedLinearGradient id={`grad${this.id}`} x1="0" y1="0" x2="1" y2="0">
                        <AnimatedStop offset={this.progress} stopColor="#FFD632" stopOpacity="1" />
                        <AnimatedStop offset={this.progress} stopColor="#FFF" stopOpacity=".25" />
                    </AnimatedLinearGradient>
                </Defs>
                <AnimatedPath
                    d="M255,489.6l-35.7-35.7C86.7,336.6,0,257.55,0,160.65C0,81.6,61.2,20.4,140.25,20.4c43.35,0,86.7,20.4,114.75,53.55C283.05,40.8,326.4,20.4,369.75,20.4C448.8,20.4,510,81.6,510,160.65c0,96.9-86.7,175.95-219.3,293.25L255,489.6z"
                    fill={`url(#grad${this.id})`} scale={this.props.scale} translateX={5} origin={[0.5, 0.5]} />
            </AnimatedSvg>
        )
    }
}

export default class Hearts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heartsToDisplay: []
        };

        this.hearts = new Animated.Value(props.hearts);
        this.align = props.align || 'flex-start';
        this.loadHeartsBar = true;
    };

    componentDidMount() {
        this.displayHearts(true);
    }

    displayHearts = (animateBar, newHeart, heartsNumber) => {
        let currentHearths = [];
        if (animateBar) {
            for (let i = 0; i < this.props.hearts; i++) {
                currentHearths.push(<Heart key={`${i}`} id={i} progress={0} width={24} height={24} scale={0.035} />)
            }
            this.setState({ heartsToDisplay: currentHearths });

            setTimeout(() => {
                currentHearths = [];
                for (let i = 0; i < this.props.hearts; i++) {
                    currentHearths.push(<Heart key={`${i}`} id={i} progress={this.props.hearts - i} width={24} height={24} scale={0.035} />)
                }
                this.setState({ heartsToDisplay: currentHearths });
            }, 100);
        } else {
            currentHearths = [];
            if (newHeart) {
                currentHearths = [...this.state.heartsToDisplay];
                for (let i = currentHearths.length; i < heartsNumber; i++) {
                    currentHearths.push(<Heart key={`${i}`} id={i} progress={0} width={24} height={24} scale={0.035} />)
                }
                this.setState({ heartsToDisplay: currentHearths });

                setTimeout(() => {
                    for (let i = 0; i < heartsNumber; i++) {
                        currentHearths[i] = (<Heart key={`${i}`} id={i} progress={this.props.hearts - i} width={24} height={24} scale={0.035} />)
                    }
                    this.setState({ heartsToDisplay: currentHearths });
                }, 250);
            } else {
                currentHearths = [];
                for (let i = 0; i < this.props.hearts; i++) {
                    currentHearths.push(<Heart key={`${i}`} id={i} progress={this.props.hearts - i} width={24} height={24} scale={0.035} />)
                }
                this.setState({ heartsToDisplay: currentHearths });
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.hearts !== this.props.hearts) {
            const hearts = this.props.hearts
            Animated.timing(this.hearts,
                {
                toValue: hearts,
                duration: 250,
                easing: Easing.cubic,
                useNativeDriver: false
            }).start()
            this.displayHearts(false, Math.ceil(this.props.hearts) > Math.ceil(prevProps.hearts), this.props.hearts);
        }
    }

    render() {
        return (
            <Animated.View style={{ alignSelf: this.align, flexDirection: 'row', flexWrap: 'wrap' }}>
                {this.state.heartsToDisplay.length > this.props.displayLimit ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Heart progress={1} width={24} height={24} scale={0.035} />
                        <QaplaText style={{ marginLeft: 4, color: '#FFF' }}>
                            {`x${this.props.hearts}`}
                        </QaplaText>
                    </View>
                    :
                    <>
                        {this.state.heartsToDisplay}
                    </>
                }
            </Animated.View>
        );
    }
}