import React, { Component } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types';

import styles from './style';

class QaplaTab extends Component {
    state = {
        xAxisValue: 0,
        width: 0
    };

    /**
     * Event called when a tab is pressed
     */
    onTabPress = () => {
        this.props.onPress(this.props.route, this.props.index);
    }

    /**
     * Function called when the TouchableOpacity is mounted, set the width and x axis value of the tab
     * @param {number} xAxisValue X coordinate where the tab is placed
     * @param {number} width Width value of the tab
     */
    setInitialIndicatorPosition = (xAxisValue, width) => {
        this.setState({ xAxisValue, width });
        this.props.setInitialPosition(xAxisValue, width, this.props.index);
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.Tab}
                activeOpacity={1}
                ref={(TabRef) => this.tabRef = TabRef}
                onPress={this.onTabPress}
                onLayout={(event) => this.setInitialIndicatorPosition(event.nativeEvent.layout.x, event.nativeEvent.layout.width)}>
                <Animated.Text style={styles.TabLabel}>{this.props.options.title}</Animated.Text>
                {this.props.options.icon &&
                    <this.props.options.icon />
                }
            </TouchableOpacity>
        );
    }
}

QaplaTab.propTypes = {
    options: PropTypes.shape({
        title: PropTypes.string.isRequired,
        icon: PropTypes.object
    }),
    onPress: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    setInitialPosition: PropTypes.func.isRequired
};

export default QaplaTab;
