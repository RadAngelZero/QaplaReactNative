// diego -          01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import {
    View,
    ScrollView
} from 'react-native';
import styles from './style';
import MatchNotificationCard from '../../components/MatchNotificationCard/MatchNotificationCard';
import { connect } from 'react-redux';

class RetasNotificationsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {Object.keys(this.props.notifications).map((notificationKey) => (
                        <MatchNotificationCard key={`Reta-${notificationKey}`}
                            notification={this.props.notifications[notificationKey]}
                            notificationKey={notificationKey}
                            uid={this.props.uid} />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

function mapDispatchToProps(state) {
    let uid = '';
    let notifications = {};
    if (Object.keys(state.userReducer.user).length > 0 && state.userReducer.user.hasOwnProperty('notificationMatch')) {
        uid = state.userReducer.user.id;
        notifications = state.userReducer.user.notificationMatch
    }
    return {
        uid,
        notifications
    }
}

export default connect(mapDispatchToProps)(RetasNotificationsScreen);
