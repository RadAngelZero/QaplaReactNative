// josep.sanahuja    - 18-10-2019 - us140 - File creation

import React, { Component } from 'react';
import { View, Image } from 'react-native';

import styles from './style'
import QaplaText from '../QaplaText/QaplaText';

class AnnouncementCard extends Component {
    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.imageStyle}
                            source={{uri: this.props.photoUrl}}/>
                    </View>
                    <QaplaText style={styles.description}>
                        {this.props.description}
                    </QaplaText>
                </View>
        );
    }
}

export default AnnouncementCard;
