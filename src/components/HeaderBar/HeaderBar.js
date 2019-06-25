import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from './style';

class HeaderBar extends Component {
    render() {
        return (
<<<<<<< HEAD
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
=======
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
>>>>>>> jm-dev-25-06-2019
            </View>
        );
    }
}

export default HeaderBar;