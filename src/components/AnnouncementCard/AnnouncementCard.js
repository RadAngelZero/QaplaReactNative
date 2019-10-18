// josep.sanahuja    - 18-10-2019 - us140 - File creation

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style'

class AnnouncementCard extends Component {

    componentDidMount() {
        console.log('Why hello there');
    }

    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image 
                            style={styles.imageStyle}
                            source={{uri: this.props.url}}/>
                    </View>
                    <Text style={styles.description}>
                        {this.props.description}
                    </Text>
                </View>
        );
    }
}

export default AnnouncementCard;
