import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Keyboard, Platform, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';

import images from '../../../assets/images';
import { CUSTOM_TTS_VOICE, MAX_CHAR_FOR_TTS } from './../../utilities/Constants';
import { translate } from '../../utilities/i18';
import styles from './style';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import { getBotAvailableVoices } from '../../services/database';

class OptionButton extends Component {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <LinearGradient
                    colors={['#BEA7FF', '#FF9BB3']}
                    style={{
                        padding: 2,
                        borderRadius: 20,
                    }}
                    useAngle
                    angle={90}
                >
                    <View style={{
                        backgroundColor: '#0D1021',
                        paddingVertical: 16,
                        paddingHorizontal: 24,
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        {this.props.children}
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

class InteractionsTTS extends Component {
    state = {
        message: '',
        noEditedMessage: '',
        tooMuch: false,
        keyboardOpen: false,
        keyboardHeight: 0,
        step: 0,
        voice: null,
        showVoiceSelectionBubbleChat: false,
        showVoiceSelectionBubbleChatText: false,
        showVoiceSelection: false,
        showFinalSelectionBubbleChat: false,
        showFinalSelectionBubbleChatText: false,
        showFinalSelection: false,
        dot1Opacity: new Animated.Value(0),
        dot2Opacity: new Animated.Value(0),
        dot3Opacity: new Animated.Value(0),
        editMessage: false,
        editVoice: false,
        voiceCost: null,
        voiceName: '',
        availableVoices: {}
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

    fetchAvailableVoices = async () => {
        const voices = await getBotAvailableVoices();
        this.setState({ availableVoices: voices.val() });
    }

    textHandler = (e) => {
        if ((e.nativeEvent.text.length > MAX_CHAR_FOR_TTS)) {
            this.setState({ tooMuch: true });
        } else {
            this.setState({ tooMuch: false });
            this.setState({ message: e.nativeEvent.text });
        }
    }

    playDotsAnimation = (onEnd) => {
        this.state.dot1Opacity.setValue(0);
        this.state.dot2Opacity.setValue(0);
        this.state.dot3Opacity.setValue(0);
        Animated.stagger(250, [
            Animated.timing(this.state.dot1Opacity, {
                toValue: 1,
                duration: 500,
                easing: Easing.out(Easing.ease),
                useNativeDriver: false,
            }),
            Animated.timing(this.state.dot2Opacity, {
                toValue: 1,
                duration: 500,
                easing: Easing.out(Easing.ease),
                useNativeDriver: false,
            }),
            Animated.timing(this.state.dot3Opacity, {
                toValue: 1,
                duration: 500,
                easing: Easing.out(Easing.ease),
                useNativeDriver: false,
            }),
        ]).start(onEnd);
    }

    sendButtonHandler = () => {
        if (this.state.editMessage) {
            this.setState({ step: 2, showFinalSelectionBubbleChat: true, showFinalSelection: true, showFinalSelectionBubbleChatText: true, editMessage: false });
        } else {
            this.fetchAvailableVoices();
            this.setState({ step: 1, showVoiceSelectionBubbleChat: true });
            this.playDotsAnimation(() => { this.setState({ showVoiceSelection: true, showVoiceSelectionBubbleChatText: true }); });
        }
    }
    voiceSelectionHandler = (voiceAPIName, voiceName, voiceCost) => {
        this.setState({ voiceAPIName, voiceName, voiceCost, step: 2, showFinalSelectionBubbleChat: true });
        if (this.state.editVoice) {
            this.setState({ showFinalSelection: true, showFinalSelectionBubbleChatText: true });
        } else {
            this.playDotsAnimation(() => { this.setState({ showFinalSelection: true, showFinalSelectionBubbleChatText: true }); });
        }
    }
    editMessageHandler = () => {
        this.setState({ noEditedMessage: this.state.message, step: 1, editMessage: true, showFinalSelection: false });
    }

    changeVoiceHandler = () => {
        this.setState({ voiceName: '', voiceCost: null, step: 1, editVoice: true, showFinalSelectionBubbleChat: false, showFinalSelection: false });
    }

    readyHandler = () => {
        const costsObject = this.props.navigation.getParam('costs', {});
        if (this.props.previousScreen === 'InteractionsAddTTS') {
            this.props.navigation.navigate('InteractionsCheckout', {
                ...this.props.navigation.state.params,
                message: this.state.message,
                messageVoice: {
                    voiceName: this.state.voiceName,
                    voiceAPIName: this.state.voiceAPIName
                },
                costs: {
                    [CUSTOM_TTS_VOICE]: this.state.voiceCost,
                    ...costsObject
                },
            });
        } else {
            this.props.navigation.navigate('InteractionsAddVisual', {
                ...this.props.navigation.state.params,
                message: this.state.message,
                messageVoice: {
                    voiceName: this.state.voiceName,
                    voiceAPIName: this.state.voiceAPIName
                },
                costs: {
                    [CUSTOM_TTS_VOICE]: this.state.voiceCost,
                    ...costsObject
                },
            });
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
                            {/* <View style={styles.chatSenderContainer}>
                                <Image
                                    source={images.png.profileImagePlaceholder1.img}
                                    style={styles.chatSenderImage}
                                />
                                <Text style={[styles.whiteText, styles.chatSenderText]}>
                                    Qaplita
                                </Text>
                            </View> */}
                            <View style={styles.chatBubbleContainer}>
                                <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                    {`${translate('interactions.TTS.whatYouWantToSay')}`}
                                </Text>
                            </View>
                            {this.state.step >= 1 &&
                                <>
                                    <View style={styles.optionOuterConainer}>
                                        {this.state.editMessage &&
                                            <images.svg.editSimple style={[styles.marginTop16, styles.optionOutIconMargin]} />}
                                        <View style={styles.userChatBubbleContainer}>
                                            <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                                {`${this.state.editMessage ? this.state.noEditedMessage : this.state.message}`}
                                            </Text>
                                        </View>
                                    </View>
                                    {!this.state.editMessage &&
                                        <View style={styles.chatBubbleContainer}>
                                            {this.state.showVoiceSelectionBubbleChatText ?
                                                <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                                    {`🔥 Slaaay\n🤖 Now choose a bot voice: `}
                                                </Text>
                                                :
                                                <View style={styles.loadingDotsContainer}>
                                                    <Animated.View
                                                        style={[styles.loadingDots, styles.noMarginLeft, {
                                                            opacity: this.state.dot1Opacity,
                                                        }]}
                                                    />
                                                    <Animated.View
                                                        style={[styles.loadingDots, {
                                                            opacity: this.state.dot2Opacity,
                                                        }]}
                                                    />
                                                    <Animated.View
                                                        style={[styles.loadingDots, styles.noMarginRight, {
                                                            opacity: this.state.dot3Opacity,
                                                        }]}
                                                    />
                                                </View>}
                                        </View>
                                    }
                                    {(this.state.showVoiceSelection && (this.state.voiceCost === null && this.state.voiceName === '')) &&
                                        <>
                                            <View style={styles.optionsContainer}>
                                                {Object.keys(this.state.availableVoices)
                                                    .sort((a, b) => this.state.availableVoices[a].cost - this.state.availableVoices[b].cost)
                                                    .map((voiceName) => {
                                                        if (this.state.availableVoices[voiceName].cost === 0) {
                                                            return (
                                                                <View style={styles.optionContainer}>
                                                                    <images.svg.volumeUp style={styles.optionOutIconMargin} />
                                                                    <OptionButton onPress={() => this.voiceSelectionHandler(this.state.availableVoices[voiceName].voiceAPIName, voiceName, this.state.availableVoices[voiceName].cost)}>
                                                                        <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                                                            {voiceName}
                                                                        </Text>
                                                                    </OptionButton>
                                                                </View>
                                                            );
                                                        } else {
                                                            return (
                                                                <View style={styles.optionContainer}>
                                                                    <images.svg.volumeUp style={styles.optionOutIconMargin} />
                                                                    <OptionButton onPress={() => this.voiceSelectionHandler(this.state.availableVoices[voiceName].voiceAPIName, voiceName, this.state.availableVoices[voiceName].cost)}>
                                                                        <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                                                            {voiceName}
                                                                        </Text>
                                                                        <View style={styles.optionPriceContainer}>
                                                                            <images.svg.qoin style={[styles.smallQoin, styles.optionQoinsMargin]} />
                                                                            <MaskedView maskElement={
                                                                                <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                                                                    {this.state.availableVoices[voiceName].cost}
                                                                                </Text>
                                                                            }>
                                                                                <LinearGradient colors={['#FFD3FB', '#F5FFCB', '#9FFFDD']}>
                                                                                    <Text style={[styles.transparentText, styles.chatBubbleText]}>
                                                                                        {this.state.availableVoices[voiceName].cost}
                                                                                    </Text>
                                                                                </LinearGradient>
                                                                            </MaskedView>
                                                                        </View>
                                                                    </OptionButton>
                                                                </View>
                                                            );
                                                        }
                                                    })
                                                }
                                            </View>
                                        </>
                                    }
                                    {this.state.step >= 2 &&
                                        <>
                                            <View style={styles.userChatBubbleContainer}>
                                                <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                                    {`${this.state.voiceName}`}
                                                </Text>
                                                {this.state.voiceCost > 0 &&
                                                    <View style={styles.optionPriceContainer}>
                                                        <images.svg.qoin style={[styles.smallQoin, styles.optionQoinsMargin]} />
                                                        <MaskedView maskElement={
                                                            <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                                                {this.state.voiceCost}
                                                            </Text>
                                                        }>
                                                            <LinearGradient colors={['#FFD3FB', '#F5FFCB', '#9FFFDD']}>
                                                                <Text style={[styles.transparentText, styles.chatBubbleText]}>
                                                                    {this.state.voiceCost}
                                                                </Text>
                                                            </LinearGradient>
                                                        </MaskedView>
                                                    </View>
                                                }
                                                <images.svg.checkCircle style={{
                                                    marginLeft: this.state.voiceCost > 0 ? 8 : 32,
                                                }} />
                                            </View>
                                            <View style={styles.chatBubbleContainer}>
                                                {!this.state.showFinalSelectionBubbleChatText ?
                                                    <View style={styles.loadingDotsContainer}>
                                                        <Animated.View
                                                            style={[styles.loadingDots, styles.noMarginLeft, {
                                                                opacity: this.state.dot1Opacity,
                                                            }]}
                                                        />
                                                        <Animated.View
                                                            style={[styles.loadingDots, {
                                                                opacity: this.state.dot2Opacity,
                                                            }]}
                                                        />
                                                        <Animated.View
                                                            style={[styles.loadingDots, styles.noMarginRight, {
                                                                opacity: this.state.dot3Opacity,
                                                            }]}
                                                        />
                                                    </View>
                                                    :
                                                    <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                                        {`👌 Ready to send?`}
                                                    </Text>}
                                            </View>
                                        </>
                                    }
                                    {this.state.showFinalSelection &&
                                        <>
                                            <View style={styles.optionsContainer}>
                                                <View style={styles.optionContainer}>
                                                    <OptionButton onPress={this.editMessageHandler}>
                                                        <images.svg.editSimple style={styles.marginRight16} />
                                                        <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                                            {`Edit message`}
                                                        </Text>
                                                    </OptionButton>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <OptionButton onPress={this.changeVoiceHandler}>
                                                        <images.svg.volumeUp style={styles.marginRight16} />
                                                        <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                                            {`Choose another bot voice`}
                                                        </Text>
                                                    </OptionButton>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <OptionButton onPress={this.readyHandler}>
                                                        <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                                            {`Ready`}
                                                        </Text>
                                                    </OptionButton>
                                                </View>
                                            </View>
                                        </>
                                    }
                                </>
                            }
                        </View>
                        {(this.state.step < 1 || this.state.editMessage) &&
                            <>
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
                            </>
                        }
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