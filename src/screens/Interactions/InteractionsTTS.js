import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { connect } from 'react-redux';

import images from '../../../assets/images';
import { MAX_CHAR_FOR_TTS } from './../../utilities/Constants';
import { translate } from '../../utilities/i18';
import styles from './style';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';

class InteractionsTTS extends Component {
    state = {
        message: '',
        tooMuch: false,
        keyboardOpen: false,
        keyboardHeight: 0,
    }

    componentDidMount() {
        this.keyboardDidShowSubscription = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                this.setState({ keyboardOpen: true, keyboardHeight: e.endCoordinates.height });
            },
        );
        this.keyboardDidHideSubscription = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                this.setState({ keyboardOpen: false });
            },
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowSubscription.remove();
        this.keyboardDidHideSubscription.remove();
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
                    <View style={[styles.chatContainer,
                    {
                        bottom: heightPercentageToPx(3.94) + (Platform.OS === 'ios' && this.state.keyboardOpen ? this.state.keyboardHeight : 0),
                    }
                    ]}>
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
                                    autoFocus
                                    onSubmitEditing={this.sendButtonHandler}
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