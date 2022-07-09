import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import styles from './style';

class InteractionsTTS extends Component {

    state = {
        message: '',
        tooMuch: false,
        maxCharLimit: 100,
    }

    textHandler = (e) => {
        if ((e.nativeEvent.text.length > this.state.maxCharLimit) && !this.state.tooMuch) {
            console.log('much');

            this.setState({ tooMuch: true });
        } else if ((e.nativeEvent.text.length <= this.state.maxCharLimit) && this.state.tooMuch) {
            this.setState({ tooMuch: false });
        }
        this.setState({ message: e.nativeEvent.text });
    }

    sendButtonHandler = () => {
        this.props.navigation.navigate('InteractionsCheckout', { message: this.state.message, hideBackButton: true });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.innerConatiner, styles.addTTSContainer]}>
                    <Text style={[styles.whiteText, styles.screenHeaderText]}>
                        Escribe tu mensaje
                    </Text>
                    <View style={styles.chatContainer}>
                        <View>
                            <View style={styles.chatSenderContainer}>
                                <Image
                                    source={images.png.profileImagePlaceholder1.img}
                                    style={styles.chatSenderImage}
                                />
                                <Text style={[styles.whiteText, styles.chatSenderText]}>
                                    Qaplita
                                </Text>
                            </View>
                            <View style={styles.chatBubbleContainer}>
                                <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                    {'🗣 ¿Qué quieres decir en el directo?'}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.chatBottomContainer}>
                            <View style={styles.chatInputContainer}>
                                <TextInput style={[styles.chatTextInput, {
                                    color: this.state.tooMuch ? '#f66' : '#fff',
                                }]}
                                    onChange={this.textHandler}
                                    value={this.state.message}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={this.sendButtonHandler}
                                disabled={this.state.message === ''}
                                style={{
                                    opacity: this.state.message === '' ? 0.4 : 1,
                                }}
                            >
                                <images.svg.sendChat style={styles.chatSendIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View >
        );
    }
}

export default InteractionsTTS;