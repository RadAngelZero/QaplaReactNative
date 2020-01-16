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
        yAxisValue: new Animated.Value(heightPercentageToPx(100)),
    };

    static getDerivedStateFromProps(props, state) {
        if (props.visible) {
            Animated.timing(state.yAxisValue, {
                toValue: heightPercentageToPx(100) - heightPercentageToPx(20),
                duration: 250
            }).start();

            return { visible: true };
        }

        Animated.timing(state.yAxisValue, {
            toValue: heightPercentageToPx(100),
            duration: 200,
            easing: Easing.in(Easing.cubic)
        }).start();

        return { visible: false };
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
                {haveAction &&
                    <Text style={styles.actionTextButton} onPress={this.props.action}>
                        {this.props.actionMessage}
                    </Text>
                }
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
