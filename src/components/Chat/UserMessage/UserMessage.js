import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './style';
import QaplaText from '../../QaplaText/QaplaText';

class UserMessage extends Component {
    render() {
        return (
            <View style={styles.userMessageView}>
                <QaplaText style={styles.hour}>
                    {this.props.hour}
                </QaplaText>
                <View style={styles.messageContainer}>
                    <QaplaText style={styles.messageText}>
                        {this.props.message}
                    </QaplaText>
                </View>
            </View>
        );
    }
}

export default UserMessage;
