// josep.sanahuja    - 30-07-2019 - us59 - + navigate('Mock2')

import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    TouchableWithoutFeedback 
} from 'react-native';

import { styles } from './style';

import Svg from 'react-native-svg';
import images from './../../../assets/images';

const NotificationIcon = images.svg.notificationIcon;
const {navigate}       = this.props.navigation;

class HeaderBar extends Component {
    render() {
        return (
            <View style={styles.container} testID='container'>
                <View style={styles.imageContainer}>
                    <TouchableWithoutFeedback
                        style={styles.imageAndButtonDimensions} 
                        onPress={navigate('Mock2')}
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

export default HeaderBar;