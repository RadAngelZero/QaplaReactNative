import React, { Component } from 'react';
import { View } from 'react-native';
import { translate } from '../../utilities/i18';

import QaplaTabBarItem from './QaplaTabBarItem';
import styles from './style';

class QaplaTabBar extends Component {
    render() {
        const { navigation } = this.props;
        const routes = navigation.state.routes;

        return (
            <View style={styles.container}>
                {routes.map((route, index) => (
                    <QaplaTabBarItem key={route.key}
                        onPress={() => this.props.navigation.navigate(route.key)}
                        focused={navigation.state.index === index}
                        index={index}>
                        {translate(`router.topNavigators.${route.routeName.toLowerCase()}`)}
                    </QaplaTabBarItem>
                ))}
            </View>
        );
    }
}

export default QaplaTabBar;