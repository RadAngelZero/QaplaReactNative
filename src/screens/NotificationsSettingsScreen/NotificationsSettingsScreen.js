import React, { Component } from 'react';
import { SafeAreaView, View, Text, Switch } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import { userAllowsNotificationsFrom, updateNotificationPermission, getUserTopicSubscriptions } from '../../services/database';
import { subscribeUserToTopic, unsubscribeUserFromTopic } from '../../services/messaging';
import { trackOnSegment } from '../../services/statistics';
import { translate } from '../../utilities/i18';
import { GAMES_TOPICS, EVENTS_TOPIC } from '../../utilities/Constants';

class NotificationsSettingsScreen extends Component {

    /**
     * Callback to update the permissions of an specific type
     *
     * @param {string} type Permission type (at this point must be one either games and events)
     * @param {boolean} value New state of the permission, true = allow push notifications
     */
    updateNotificationPermission = async (type, value) => {
        updateNotificationPermission(type, value);

        const userTopicSubscriptions = await getUserTopicSubscriptions(type);
        if (value) {
            userTopicSubscriptions.forEach((userSubscription) => {
                subscribeUserToTopic(userSubscription.key, this.props.id, type, false);
            });

            trackOnSegment(`User has enabled push notifications of type ${type}`);
        } else {
            userTopicSubscriptions.forEach((userSubscription) => {
                unsubscribeUserFromTopic(userSubscription.key);
            });

            trackOnSegment(`User has disabled push notifications of type ${type}`);
        }
    }

    userNotificationPermissionStatus = (type) => {
        let permissionStatus = true;
        if (this.props.notificationPermissions && this.props.notificationPermissions.hasOwnProperty(type)) {
            permissionStatus = this.props.notificationPermissions[type];
        }

        return permissionStatus;
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        {translate('notificationsSettingsScreen.title')}
                    </Text>
                </View>
                <View style={styles.settingsContainer}>
                    <View style={styles.setting}>
                        <Text style={styles.settingDescription}>
                            {translate('notificationsSettingsScreen.gamesPermissionDescription')}
                        </Text>
                        <Switch
                            style={styles.permissionSwitch}
                            value={this.userNotificationPermissionStatus(GAMES_TOPICS)}
                            onValueChange={(value) => this.updateNotificationPermission(GAMES_TOPICS, value)} />
                    </View>
                    <View style={styles.setting}>
                        <Text style={styles.settingDescription}>
                            {translate('notificationsSettingsScreen.eventsPermissionDescription')}
                        </Text>
                        <Switch
                            style={styles.permissionSwitch}
                            value={this.userNotificationPermissionStatus(EVENTS_TOPIC)}
                            onValueChange={(value) => this.updateNotificationPermission(EVENTS_TOPIC, value)} />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        notificationPermissions: state.userReducer.user.notificationPermissions
    };
}

export default connect(mapStateToProps)(NotificationsSettingsScreen);
