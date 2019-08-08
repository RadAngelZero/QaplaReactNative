// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView
// diego 			 - 01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView
} from 'react-native';

import styles from './style';

class ActivityNotificationsScreen extends Component {
    render() {
        return (
        	<SafeAreaView style={styles.sfvContainer}>
	            <View style={styles.container}>
	                <Text style={styles.title}>Aquí van las notificaciones de actividad</Text>
	            </View>
	        </SafeAreaView>
        );
    }
}

export default ActivityNotificationsScreen;
