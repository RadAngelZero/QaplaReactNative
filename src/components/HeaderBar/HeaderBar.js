import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from './style';

class HeaderBar extends Component {
    render() {
        return (
            <View style={styles.container} testID='container'>
                <View style={styles.imageContainer}>
                    <TouchableWithoutFeedback style={styles.imageAndButtonDimensions} testID='NotificationButton'>
                        <Image testID='NotificationIcon' style={styles.imageAndButtonDimensions} source={require('./../../../assets/notification-icon.png')} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.textContainer} testID='textContainer'>
                    <Text style={styles.textStyle} testID='text'>Qapla</Text>
                </View>
                <View style={styles.invisibleView} testID='invisibleView'></View>
            </View>
        );
    }
}

export default HeaderBar;