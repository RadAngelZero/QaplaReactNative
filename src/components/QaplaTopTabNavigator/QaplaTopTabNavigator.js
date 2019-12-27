import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './style';

import QaplaTab from '../QaplaTab/QaplaTab';

class QaplaTopTabNavigator extends Component {
    state = {
        translateIndicatorValue: new Animated.Value(0),
        indicatorWidth: new Animated.Value(0),
        tabsPositions: [],
        tabsWidths: [],
        currentIndex: 0
    };

    static getDerivedStateFromProps(props, state) {
        if (props.navigation.state.index !== state.currentIndex) {
            Animated.timing(state.indicatorWidth, {
                toValue: state.tabsWidths[props.navigation.state.index],
                duration: 375
            }).start();
            Animated.timing(state.translateIndicatorValue, {
                toValue: state.tabsPositions[props.navigation.state.index],
                duration: 375
            }).start();

            return { currentIndex: props.navigation.state.index };
        }

        return null;
    }

    /**
     * Handler of the onPress event of the QaplaTab component, starts the animations of the indicator and navigate to the selected screen
     * @param {object} route Route object (from react navigation) useful to make the navigation
     * @param {number} x X coordinate where the tab is placed
     * @param {number} width Width value of the tab
     */
    onTabPress = (route, index) => {
        Animated.timing(this.state.indicatorWidth, {
            toValue: this.state.tabsWidths[index],
            duration: 375
        }).start();
        Animated.timing(this.state.translateIndicatorValue, {
            toValue: this.state.tabsPositions[index],
            duration: 375
        }).start();
        this.setState({ currentIndex: index });
        this.props.navigation.navigate(route.routeName);
    }

    /**
     * Handler of the setInitialPosition event (onLayout) of the QaplaTab component, starts the animations of the indicator
     * for the first tab (we need to show the tab when the tabs are loaded)
     * @param {number} tabPosition X coordinate where the tab is placed
     * @param {number} tabWidth Width value of the tab
     * @param {number} index Index of the tab
     */
    setInitialPosition = (tabPosition, tabWidth, index) => {
        const tabsPositions = [...this.state.tabsPositions];
        const tabsWidths = [...this.state.tabsWidths];
        tabsPositions.push(tabPosition);
        tabsWidths.push(tabWidth);

        /**
         * Save the position and the widht of the tab
         */
        this.setState({ tabsPositions, tabsWidths });

        /**
         * If is the first tab we load the indicator
         */
        if (index === 0) {
            Animated.timing(this.state.indicatorWidth, {
                toValue: tabWidth,
                duration: 375
            }).start();
            Animated.timing(this.state.translateIndicatorValue, {
                toValue: tabPosition,
                duration: 375
            }).start();
        }
    }

    render() {
        return (
            <View style={styles.TopTabNavigatorContainer}>
                <View style={styles.TabContainer}>
                    {this.props.navigationState.routes.map((route, index) => (
                        <QaplaTab
                            key={route.routeName}
                            options={this.props.options[index]}
                            route={route}
                            index={index}
                            setInitialPosition={this.setInitialPosition}
                            onPress={this.onTabPress} />
                    ))}
                </View>
                <Animated.View
                style={[styles.TabIndicator,
                    {
                        transform: [{
                            translateX: this.state.translateIndicatorValue
                        }],
                        width: this.state.indicatorWidth
                    }
                ]} />
            </View>
        );
    }
}

QaplaTopTabNavigator.propTypes = {
    navigationState: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired
};

export default QaplaTopTabNavigator;
