import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './style';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';

class UpdateApp extends Component {
    render() {
        return (
            <View>
                <Text style={{color: 'black'}}> Miau Miau </Text>
            </View>
        );
    }
}

export default UpdateApp;
