// diego -          01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import {
    View, Text
} from 'react-native';

import styles from './style';

class ActivityNotificationsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Aquí van las notificaciones de actividad</Text>
            </View>
        );
    }
}

export default ActivityNotificationsScreen;
