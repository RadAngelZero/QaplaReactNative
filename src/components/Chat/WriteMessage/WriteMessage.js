import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';

import styles from './style';
import Images from '../../../../assets/images';

class WriteMessage extends Component {
    render() {
        return (
            <View style={styles.writeMessageContainer}>
                <TextInput
                    placeholder='Escribe un mensaje…'
                    placeholderTextColor='#CFD1DB'
                    style={styles.writeMessageTextInput} />
                <View
                    style={{
                        flex: 1,
                    }}/>
                <TouchableOpacity style={styles.sendButton}>
                    <Images.svg.sendIcon
                        fill='#FFF'
                        height={28}
                        width={28}
                        style={{ marginLeft: 4 }} />
                </TouchableOpacity>
            </View>
        );
    }
}

export default WriteMessage;
