// josep.sanahuja    - 05-01-2020 - us187 - + SafeAreaView
// diego             - 12-09-2019 - us99 - Updated closeIcon (changed text icon for SVG icon)
// diego 			 - 01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './style';
import Images from './../../../assets/images';
import { translate } from '../../utilities/i18';

const CloseIcon = Images.svg.closeIcon;

class NotificationsHeader extends Component {

    /**
     * Close the notification tab when it's called
     */
    closeNotifications = () => {
        this.props.navigation.pop();
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
    	        <View style={styles.container}>
    	            <Text style={styles.title}>{translate('notificationsScreen.notificationsHeader')}</Text>
                    <TouchableWithoutFeedback onPress={this.closeNotifications}>
                        <View style={styles.closeIcon}>
                            <CloseIcon />
                        </View>
                    </TouchableWithoutFeedback>
    	        </View>
            </SafeAreaView>
        );
    }
}

export default NotificationsHeader;
