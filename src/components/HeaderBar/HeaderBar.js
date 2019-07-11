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
                    <TouchableWithoutFeedback style={styles.imageAndButtonDimensions} testID='NotificationButton'>
                        <Svg>
                            <NotificationIcon height={24} width={24} />
                        </Svg>
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