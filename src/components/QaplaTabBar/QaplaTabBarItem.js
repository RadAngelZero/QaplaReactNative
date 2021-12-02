import React, { PureComponent } from 'react';

import { TouchableOpacity } from 'react-native';
import QaplaText from '../QaplaText/QaplaText';
import styles from './style';

class QaplaTabBarItem extends PureComponent {
    render() {
        return (
            <TouchableOpacity style={[styles.tabStyle, this.props.focused ? styles.activeTab : styles.inactiveTab]} onPress={this.props.onPress}>
                <QaplaText style={styles.tabLabelStyle}>
                    {this.props.children}
                </QaplaText>
            </TouchableOpacity>
        );
    }
}

export default QaplaTabBarItem;
