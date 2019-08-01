// diego -          01-08-2019 - us58 - File creation
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
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
                            notification={this.props.notifications[notificationKey]} />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

function mapDispatchToProps(state) {
    if (Object.keys(state.userReducer.user).length > 0 && state.userReducer.user.hasOwnProperty('notificationMatch')) {
        return {
            notifications: state.userReducer.user.notificationMatch
        }
    } else {
        return {
            notifications: {}
        }
    }
}

export default connect(mapDispatchToProps)(RetasNotificationsScreen);
