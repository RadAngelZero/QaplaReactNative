import React, { Component } from 'react';
import { SafeAreaView, View, Text, Switch } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import { userAllowsNotificationsFrom, updateNotificationPermission, getUserTopicSubscriptions } from '../../services/database';
import { subscribeUserToTopic, unsubscribeUserFromTopic } from '../../services/messaging';
import { trackOnSegment } from '../../services/statistics';
import { translate } from '../../utilities/i18';

class NotificationsSettingsScreen extends Component {
    updateNotificationPermission = async (type, value) => {
        updateNotificationPermission(type, value);

        const userTopicSubscriptions = await getUserTopicSubscriptions(type);
        if (value) {
            userTopicSubscriptions.forEach((userSubscription) => {
                subscribeUserToTopic(userSubscription.key, this.props.id, type);
            });

            trackOnSegment(`User has enabled push notifications of type ${type}`);
        } else {
            userTopicSubscriptions.forEach((userSubscription) => {
                unsubscribeUserFromTopic(userSubscription.key);
            });

            trackOnSegment(`User has disabled push notifications of type ${type}`);
        }
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
                            value={userAllowsNotificationsFrom('games')}
                            onValueChange={(value) => this.updateNotificationPermission('games', value)} />
                    </View>
                    <View style={styles.setting}>
                        <Text style={styles.settingDescription}>
                            {translate('notificationsSettingsScreen.eventsPermissionDescription')}
                        </Text>
                        <Switch
                            style={styles.permissionSwitch}
                            value={userAllowsNotificationsFrom('events')}
                            onValueChange={(value) => this.updateNotificationPermission('events', value)} />
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
