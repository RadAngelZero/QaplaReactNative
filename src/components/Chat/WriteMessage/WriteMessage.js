import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';

import styles from './style';
import Images from '../../../../assets/images';
import { sendSendBirdMessageToCurrentChannel } from '../../../services/SendBird';

class WriteMessage extends Component {
    state = {
        message: ''
    };

    /**
     * Send the message of the user to the current chat channel
     */
    sendMessage = () => {
        sendSendBirdMessageToCurrentChannel(this.state.message, this.props.addMessageToList);
        this.setState({ message: '' });
    }

    render() {
        return (
            <View style={styles.writeMessageContainer}>
                <TextInput
                    placeholder='Escribe un mensaje…'
                    placeholderTextColor='#CFD1DB'
                    style={styles.writeMessageTextInput}
                    multiline
                    value={this.state.message}
                    onChangeText={(message) => this.setState({ message })} />
                <View
                    style={{
                        flex: 1,
                    }}/>
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={this.sendMessage}
                    disabled={!this.state.message.trim()}>
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
