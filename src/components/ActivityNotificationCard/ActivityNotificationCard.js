// diego             - 14-08-2019 - us80 - File creation

import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './style';

export class ActivityNotificationCard extends Component {
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
                    {this.props.type === 'resultado' &&
                        <Text style={styles.infoText}>¡{this.props.userName} ha subido su resultado, tienes 15 minutos para subir el tuyo!</Text>
                    }
                </View>
            </View>
        );
    }
}

export default ActivityNotificationCard;
