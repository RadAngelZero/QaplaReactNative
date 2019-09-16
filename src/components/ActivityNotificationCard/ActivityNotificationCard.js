// diego             - 04-09-2019 - us105 - Added text for different type of notifications
// diego             - 14-08-2019 - us80 - File creation

import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './style';
import { NOTIFICATION_TYPE_WINNER, NOTIFICATION_TYPE_LOSER, NOTIFICATION_TYPE_RESULT, NOTIFICATION_TYPE_REVISION, NOTIFICATION_TYPE_TIE } from '../../utilities/Constants';

export class ActivityNotificationCard extends Component {
    determineNotificationText = () => {
        let notificationText = '';
        switch (this.props.type) {
            case NOTIFICATION_TYPE_WINNER:
                notificationText = 'Has sido declarado ganador de la reta';
                break;
            case NOTIFICATION_TYPE_LOSER:
                notificationText = `${this.props.userName} ha sido declarado ganador de la reta.`;
                break;
            case NOTIFICATION_TYPE_RESULT:
                notificationText = `¡${this.props.userName} ha subido su resultado, tienes 15 minutos para subir el tuyo!`;
                break;
            case NOTIFICATION_TYPE_REVISION:
                notificationText = 'Tu partida entro en disputa y esta siendo revisada. En cuanto este lista se te notificara.';
                break;
            case NOTIFICATION_TYPE_TIE:
                notificationText = `Tu partida con ${this.props.userName} concluyó sin un ganador.`;
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
