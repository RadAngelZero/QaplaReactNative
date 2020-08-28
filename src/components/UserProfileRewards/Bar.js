import React, { Component } from 'react';
import { View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

import Colors from '../../utilities/Colors';

class ProgressBar extends Component {
    state = {
        width: 0,
        progress: new Animated.Value(0)
    };

    componentDidMount() {
        Animated.timing(this.state.progress, {
        toValue: this.props.progress,
        duration: 375,
        easing: Easing.inOut(Easing.ease)
        }).start();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.progress !== this.props.progress) {
        const progress = Math.min(Math.max(this.props.progress, 0), 10);
            Animated.timing(this.state.progress, {
            toValue: progress,
            duration: 375,
            easing: Easing.inOut(Easing.ease)
            }).start();
        }
    }

    handleLayout = (event) => {
        this.setState({ width: event.nativeEvent.layout.width });
    };

    render() {
        const {
            borderRadius,
            borderWidth,
            children,
            height,
            style,
            unfilledColor,
            ...restProps
        } = this.props;

        const containerStyle = {
            width: '100%',
            borderRadius: 4,
            overflow: 'hidden',
            backgroundColor: unfilledColor,
            };
            const progressStyle = {
            backgroundColor: Colors.greenQapla,
            height,
            width: this.state.progress.interpolate({
                inputRange: [0, 10],
                outputRange: [0, this.state.width]
            })
        };

        return (
            <View
                style={[containerStyle, style]}
                onLayout={this.handleLayout}
                {...restProps}>
                <Animated.View style={progressStyle} />
                {children}
            </View>
        );
    }
}

ProgressBar.defaultProps = {
    borderRadius: 4,
    height: 8,
    useNativeDriver: false
};

export default ProgressBar;