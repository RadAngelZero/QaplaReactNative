import React, { Component } from 'react';
import { Animated, Easing, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './style';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';

/**
 * @augments {Component<Props, State>}
 */
class Snackbar extends Component {
    state = {
        visible: false,
        yAxisValue: new Animated.Value(heightPercentageToPx(110))
    };

    static getDerivedStateFromProps(props, state) {
        if (!props.forceClose) {
            if (props.visible !== state.visible) {
                Animated.timing(state.yAxisValue, {
                    toValue: props.visible ? heightPercentageToPx(72) : heightPercentageToPx(110),
                    duration: props.visible ? 200 : 250,
                    easing: props.visible ? Easing.inOut(Easing.ease) : Easing.in(Easing.cubic)
                }).start();

                return { visible: props.visible };
            } else if (props.openAndCollapse) {
                Animated.timing(state.yAxisValue, {
                    toValue: heightPercentageToPx(72),
                    duration: 200,
                    easing: Easing.inOut(Easing.ease)
                }).start();

                setTimeout(() => {
                    Animated.timing(state.yAxisValue, {
                        toValue: heightPercentageToPx(110),
                        duration: 250,
                        easing: Easing.in(Easing.cubic)
                    }).start();
                }, props.action ? 8000 : 4000);
            }
        } else {
            Animated.timing(state.yAxisValue, {
                toValue: heightPercentageToPx(110),
                duration: 250,
                easing: Easing.in(Easing.cubic)
            }).start();
        }

        return null;
    }

    render() {
        const haveAction = this.props.action && this.props.actionMessage;
        return (
            <Animated.View style={[styles.container, {
                transform: [
                    {
                        translateY: this.state.yAxisValue
                    }
                ]
            }]}>
                <Text style={haveAction ? styles.messageWithAction : styles.message}>
                    {this.props.message}
                </Text>
                <Text style={styles.actionTextButton} onPress={this.props.action}>
                    {haveAction &&
                        this.props.actionMessage
                    }
                </Text>
            </Animated.View>
        );
    }
}

Snackbar.propTypes = {
    action: PropTypes.func,
    actionMessage: PropTypes.string,
    message: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired
};

export default Snackbar;
