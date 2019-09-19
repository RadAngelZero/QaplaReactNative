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
                {this.props.retasCount > 0 ?
                    <View style={styles.container}>
                        <Text style={styles.badge}>{this.props.retasCount}</Text>
                    </View>
                    :
                    null
                }
            </>
        );
    }
}

function mapDispatchToProps(state) {
    let retasCount = 0
    if (Object.keys(state.userReducer.user).length > 0 && state.userReducer.user.hasOwnProperty('notificationMatch')) {
        retasCount = Object.keys(state.userReducer.user.notificationMatch).length;
    }
    return {
        retasCount
    }
}

export default connect(mapDispatchToProps)(BadgeForNotificationTab);
