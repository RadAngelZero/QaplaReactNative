import React, { Component } from 'react';
import { View, I18nManager } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

const INDETERMINATE_WIDTH_FACTOR = 0.3;
 const BAR_WIDTH_ZERO_POSITION =
   INDETERMINATE_WIDTH_FACTOR / (1 + INDETERMINATE_WIDTH_FACTOR);

class ProgressBar extends Component {
    static defaultProps = {
      animated: true,
      borderRadius: 4,
      height: 6,
      indeterminateAnimationDuration: 1000,
      progress: 0,
      useNativeDriver: false,
      animationConfig: { easing: Easing.inOut(Easing.quad), duration: 300 },
      animationType: 'timing',
    };

    constructor(props) {
      super(props);
      const progress = Math.min(Math.max(props.progress, 0), 1);
      this.state = {
        width: 0,
        progress: new Animated.Value(
          props.indeterminate ? INDETERMINATE_WIDTH_FACTOR : progress
        ),
        animationValue: new Animated.Value(BAR_WIDTH_ZERO_POSITION),
      };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.progress !== this.props.progress) {
            const progress = Math.min(Math.max(this.props.progress, 0), 1);

            if (this.props.animated) {
                const { animationType, animationConfig } = this.props;
                Animated[animationType](this.state.progress, {
                    ...animationConfig,
                    toValue: progress,
                    useNativeDriver: this.props.useNativeDriver,
                }).start();
            } else {
                this.state.progress.setValue(progress);
            }
        }
    }

    handleLayout = event => {
      if (!this.props.width) {
        this.setState({ width: event.nativeEvent.layout.width });
      }
      if (this.props.onLayout) {
        this.props.onLayout(event);
      }
    };

    render() {
        const {
            borderColor,
            borderRadius,
            borderWidth,
            children,
            color,
            height,
            style,
            unfilledColor,
            width,
            ...restProps
        } = this.props;

        const innerWidth = Math.max(0, width || this.state.width) - borderWidth * 2;
        const containerStyle = {
            width,
            borderWidth,
            borderColor: borderColor || color,
            borderRadius,
            overflow: 'hidden',
            backgroundColor: unfilledColor,
        };
        const progressStyle = {
            backgroundColor: color,
            borderRadius,
            height,
            transform: [
                {
                    translateX: this.state.animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [innerWidth * -INDETERMINATE_WIDTH_FACTOR, innerWidth],
                    }),
                },
                {
                    translateX: this.state.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [innerWidth / (I18nManager.isRTL ? 2 : -2), 0],
                    }),
                },
                {
                    scaleX: this.state.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.0001, 1],
                    }),
                },
            ],
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

export default ProgressBar;