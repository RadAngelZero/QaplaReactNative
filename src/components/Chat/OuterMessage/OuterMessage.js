import React, { Component } from 'react';
import { View, Image } from 'react-native';

import styles from './style';
import QaplaText from '../../QaplaText/QaplaText';
import images from '../../../../assets/images';

class OuterMessage extends Component {
    render() {
        return (
            <View style={styles.outerMessageContainer}>
                <Image
                    source={this.props.image}
                    style={styles.userImage}/>
                <View style={styles.messageDetailsContainer}>
                    <QaplaText style={styles.userName}>
                        {this.props.userName}
                    </QaplaText>
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
