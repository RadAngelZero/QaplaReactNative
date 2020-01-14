// diego             - 14-11-2019 - us146 - Added NOTIFICATION_TYPE_TIE and NOTIFICATION_MATCH_ACCEPTED
// diego             - 04-09-2019 - us105 - Added text for different type of notifications
// diego             - 14-08-2019 - us80 - File creation

import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './style';
import {
    NOTIFICATION_TYPE_WINNER,
    NOTIFICATION_TYPE_LOSER,
    NOTIFICATION_TYPE_RESULT,
    NOTIFICATION_TYPE_REVISION,
    NOTIFICATION_TYPE_TIE,
    NOTIFICATION_MATCH_ACCEPTED
} from '../../utilities/Constants';
import { translate } from '../../utilities/i18';

export class ActivityNotificationCard extends Component {
    determineNotificationText = () => {
        let notificationText = '';
        const userName = this.props.userName;
        switch (this.props.type) {
            case NOTIFICATION_TYPE_WINNER:
                notificationText = translate('notificationsScreen.notificationTypes.notificationWinner');
                break;
            case NOTIFICATION_TYPE_LOSER:
                notificationText = translate('notificationsScreen.notificationTypes.notificationLooser', { userName });
                break;
            case NOTIFICATION_TYPE_RESULT:
                notificationText = translate('notificationsScreen.notificationTypes.notificationResult', { userName });
                break;
            case NOTIFICATION_TYPE_REVISION:
                notificationText = translate('notificationsScreen.notificationTypes.notificationRevision');
                break;
            case NOTIFICATION_TYPE_TIE:
                notificationText = translate('notificationsScreen.notificationTypes.notificationTie', { userName });
                break;
            case NOTIFICATION_MATCH_ACCEPTED:
                notificationText = translate('notificationsScreen.notificationTypes.notificationMatchAccepted', { userName });
                break;
            default:
                break;
        }

        return notificationText;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.readStateContainer}>
                    {this.props.notiChecked ?
                        <View style={styles.readNotification}>
                            <Text>🍕</Text>
                        </View>
                        :
                        <View style={styles.unreadNotification} />
                    }
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>{this.determineNotificationText()}</Text>
                </View>
            </View>
        );
    }
}

export default ActivityNotificationCard;
