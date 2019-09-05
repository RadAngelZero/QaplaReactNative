// diego             - 04-09-2019 - us105 - Added text for different type of notifications
// diego             - 14-08-2019 - us80 - File creation

import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './style';
import { NOTIFICATION_TYPE_WINNER, NOTIFICATION_TYPE_LOSER, NOTIFICATION_TYPE_RESULT, NOTIFICATION_TYPE_REVISION } from '../../utilities/Constants';

export class ActivityNotificationCard extends Component {
    determineNotificationText = () => {
        switch (this.props.type) {
            case NOTIFICATION_TYPE_WINNER:
                return 'Has sido declarado ganador de la reta';
            case NOTIFICATION_TYPE_LOSER:
                return `${this.props.userName} ha sido declarado ganador de la reta.`;
            case NOTIFICATION_TYPE_RESULT:
                return `¡${this.props.userName} ha subido su resultado, tienes 15 minutos para subir el tuyo!`;
            case NOTIFICATION_TYPE_REVISION:
                return 'Tu partida entro en disputa y esta siendo revisada. En cuanto este lista se te notificara.';
            default:
                return '';
        }
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
