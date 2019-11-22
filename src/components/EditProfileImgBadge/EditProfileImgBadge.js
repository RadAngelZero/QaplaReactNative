// diego -          01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import styles from './style';

class EditProfileImgBadge extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.badge}>e</Text>
            </View>
        );
    }
}

export default EditProfileImgBadge;
