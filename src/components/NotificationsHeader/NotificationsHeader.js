// diego 			 - 01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './style';

class NotificationsHeader extends Component {
    render() {
        return (
	        <View style={styles.container}>
	            <Text style={styles.title}>Notificaciones</Text>
	            <Text style={styles.closeIcon} onPress={() => this.props.navigation.navigate('Publicas')}>X</Text>
	        </View>
        );
    }
}

export default NotificationsHeader;
