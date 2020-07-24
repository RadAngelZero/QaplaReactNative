import React, { Component } from 'react';
import { View, Image } from 'react-native';

import styles from './style';
import QaplaText from '../../QaplaText/QaplaText';

class AdminMessage extends Component {
    render() {
        return (
            <View style={styles.adminMessageContainer}>
                <QaplaText style={styles.adminTitle}>
                    Admin
                </QaplaText>
                <View style={styles.messageContainer}>
                    <QaplaText style={styles.message}>
                        {this.props.message}
                    </QaplaText>
                </View>
                <QaplaText style={styles.hour}>
                    {this.props.hour}
                </QaplaText>
            </View>
        );
    }
}

export default AdminMessage;
