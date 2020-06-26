// josep.sanahuja    - 05-01-2020 - us187 - + SafeAreaView
// diego             - 12-09-2019 - us99 - Updated closeIcon (changed text icon for SVG icon)
// diego 			 - 01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';

import styles from './style';
import Images from './../../../assets/images';
import { translate } from '../../utilities/i18';
import QaplaIcon from '../QaplaIcon/QaplaIcon';
import QaplaText from '../QaplaText/QaplaText';

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
    	            <QaplaText style={styles.title}>{translate('notificationsScreen.notificationsHeader')}</QaplaText>
                    <QaplaIcon onPress={this.closeNotifications}>
                        <CloseIcon />
                    </QaplaIcon>
    	        </View>
            </SafeAreaView>
        );
    }
}

export default NotificationsHeader;
