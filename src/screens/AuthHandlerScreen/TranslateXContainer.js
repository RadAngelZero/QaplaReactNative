import React, { Component, Children } from 'react';
import { Animated, Easing, View } from 'react-native';

class TranslateXContainer extends Component {
    state = {
        translateValue: new Animated.Value(this.props.initialValue),
        currentValue: this.props.initialValue
    };

    componentDidMount() {
        this.props.onRef(this);
    }

    stepForward = (onFinished) => {
        if (this.state.currentValue + 1 < Children.count(this.props.children) + this.props.countStartsFrom) {
            Animated.timing(this.state.translateValue, {
                toValue: this.state.currentValue + 1,
                duration: 400,
                easing: Easing.cubic,
                useNativeDriver: false,
            }).start((result) => {
                if (result.finished) {
                    this.setState({ currentValue: this.state.currentValue + 1 });
                    if (onFinished) {
                        onFinished();
                    }
                }
            });
        }
    }

    stepBack = () => {
        if (this.state.currentValue - 1 >= this.props.countStartsFrom) {
            Animated.timing(this.state.translateValue, {
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
        if (step < Children.count(this.props.children) + this.props.countStartsFrom) {
            Animated.timing(this.state.translateValue, {
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
        const textXInterpolate = this.state.translateValue.interpolate({
            inputRange: Children.map(this.props.children, (child, index) => (index + this.props.countStartsFrom)),
            outputRange: Children.map(this.props.children, (child, index) => (this.props.individualComponentWidth - (this.props.individualComponentWidth * (index + this.props.countStartsFrom)))),
        });

        return (
            <Animated.View style={{ transform: [{ translateX: textXInterpolate }] }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {this.props.children}
                </View>
            </Animated.View>
        );
    }
}

TranslateXContainer.defaultProps = {
    countStartsFrom: 0,
    initialValue: 0
};

export default TranslateXContainer;