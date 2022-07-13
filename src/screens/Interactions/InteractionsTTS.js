import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import images from '../../../assets/images';
import { MAX_CHAR_FOR_TTS } from './../../utilities/Constants';
import { translate } from '../../utilities/i18';
import styles from './style';

class InteractionsTTS extends Component {
    state = {
        message: '',
        tooMuch: false
    }

    textHandler = (e) => {
        if ((e.nativeEvent.text.length > MAX_CHAR_FOR_TTS)) {
            this.setState({ tooMuch: true });
        } else {
            this.setState({ tooMuch: false });
            this.setState({ message: e.nativeEvent.text });
        }
    }

    sendButtonHandler = () => {
        if (this.props.previousScreen === 'InteractionsAddTTS') {
            this.props.navigation.navigate('InteractionsCheckout', {
                message: this.state.message,
                ...this.props.navigation.state.params
            });
        } else {
            this.props.navigation.navigate('InteractionsAddVisual', {
                message: this.state.message,
                ...this.props.navigation.state.params
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.innerConatiner, styles.addTTSContainer]}>
                    <Text style={[styles.whiteText, styles.screenHeaderText]}>
                        {`${translate('interactions.TTS.writeYourMessage')}`}
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
                                    {`${translate('interactions.TTS.whatYouWantToSay')}`}
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

function mapStateToProps(state) {
    return {
        previousScreen: state.screensReducer.previousScreenId
    };
}

export default connect(mapStateToProps)(InteractionsTTS);