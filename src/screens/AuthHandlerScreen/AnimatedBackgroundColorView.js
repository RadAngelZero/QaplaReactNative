import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';

class AnimatedBackgroundColorView extends Component {
    state = {
        interpolateValue: new Animated.Value(this.props.initialValue),
        currentValue: this.props.initialValue
    };

    componentDidMount() {
        this.props.onRef(this);
    }

    stepForward = () => {
        if (this.state.currentValue + 1 < this.props.colors.length) {
            Animated.timing(this.state.interpolateValue, {
                toValue: this.state.currentValue + 1,
                duration: 400,
                easing: Easing.cubic,
                useNativeDriver: false,
            }).start((result) => {
                if (result.finished) {
                    this.setState({ currentValue: this.state.currentValue + 1 });
                }
            });
        }
    }

    stepBack = () => {
        if (this.state.currentValue - 1 >= 0) {
            Animated.timing(this.state.interpolateValue, {
                toValue: this.state.currentValue - 1,
                duration: 400,
                easing: Easing.cubic,
                useNativeDriver: false,
            }).start((result) => {
                if (result.finished) {
                    this.setState({ currentValue: this.state.currentValue - 1 });
                }
            });
        }
    }

    goToStep = (step) => {
        if (step < this.props.colors.length) {
            Animated.timing(this.state.interpolateValue, {
                toValue: step,
                duration: 400,
                easing: Easing.cubic,
                useNativeDriver: false,
            }).start((result) => {
                if (result.finished) {
                    this.setState({ currentValue: step });
                }
            });
        }
    }

    render() {
        const backgroundInterpolate = this.state.interpolateValue.interpolate({
            inputRange: this.props.colors.map((color, index) => index),
            outputRange: this.props.colors.map((color) => color),
        });

        return (
            <Animated.View style={[this.props.style, { backgroundColor: backgroundInterpolate }]}>
                {this.props.children}
            </Animated.View>
        );
    }
}

AnimatedBackgroundColorView.defaultProps = {
    initialValue: 0,
    colors: ['#FFF', '#000']
};

export default AnimatedBackgroundColorView;
