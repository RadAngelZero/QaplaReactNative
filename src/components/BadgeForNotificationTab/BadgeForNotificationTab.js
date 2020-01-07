// diego -          01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import styles from './style';

class BadgeForNotificationTab extends Component {
    render() {
        return (
            <>
                {this.props.matchesCount > 0 ?
                    <View style={styles.container}>
                        <Text style={styles.badge}>{this.props.matchesCount}</Text>
                    </View>
                    :
                    null
                }
            </>
        );
    }
}

function mapDispatchToProps(state) {
    let matchesCount = 0
    if (Object.keys(state.userReducer.user).length > 0 && state.userReducer.user.hasOwnProperty('notificationMatch')) {
        matchesCount = Object.keys(state.userReducer.user.notificationMatch).length;
    }
    return {
        matchesCount
    }
}

export default connect(mapDispatchToProps)(BadgeForNotificationTab);
