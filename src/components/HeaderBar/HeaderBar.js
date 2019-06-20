import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from './style';

class HeaderBar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <TouchableWithoutFeedback style={styles.imageAndButtonDimensions}>
                        <Image style={styles.imageAndButtonDimensions} source={require('./../../../assets/notification-icon.png')} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>Qapla</Text>
                </View>
                <View style={styles.invisibleView}></View>
            </View>
        );
    }
}

export default HeaderBar;