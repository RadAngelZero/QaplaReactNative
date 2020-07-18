import React, { Component } from 'react';
import { View, Image } from 'react-native';

import styles from './style';
import QaplaText from '../../QaplaText/QaplaText';

class OuterMessage extends Component {
    render() {
        return (
            <View style={styles.outerMessageContainer}>
                <Image
                    source={{ uri: this.props.image }}
                    style={styles.userImage}/>
                <View style={styles.messageDetailsContainer}>
                    {(this.props.userName.length < 16) ?
                        <QaplaText style={styles.userName}>
                            {this.props.userName}
                        </QaplaText>
                    :
                        <QaplaText style={styles.userName}>
                            {`${this.props.userName.substring(0, 16)}...`}
                        </QaplaText>
                    }
                    <View style={styles.messageContainer}>
                        <QaplaText style={styles.message}>
                            {this.props.message}
                        </QaplaText>
                    </View>
                </View>
                <QaplaText style={styles.hour}>
                    {this.props.hour}
                </QaplaText>
            </View>
        );
    }
}

export default OuterMessage;
