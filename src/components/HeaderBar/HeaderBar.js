// josep.sanahuja    - 30-07-2019 - us59 - + gotoScreen()

import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import Svg from 'react-native-svg';
import images from './../../../assets/images';
import { styles } from './style';

const NotificationIcon = images.svg.notificationIcon;

class HeaderBar extends Component {
    render() {
        return (
            <View style={styles.container} testID='container'>
                <View style={styles.imageContainer}>
                    <TouchableWithoutFeedback
                        style={styles.imageAndButtonDimensions} 
                        onPress={gotoScreen.bind(this, 'Mock2')}
                        testID='NotificationButton'>
                        <View>
                            <NotificationIcon height={24} width={24} />
                        </View>
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

/**
 * Description:
 * Navigate to the screen from param1
 *
 * @param {string} screenName name of the screen specified in Router
 *
 */
function gotoScreen(screenName) {
    console.log("Miau Miau");
    this.props.navigation.navigate(screenName);
}

export default HeaderBar;