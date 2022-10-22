import React, { Component } from 'react';
import { Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';
import { getLocaleLanguage, translate } from '../../utilities/i18';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import remoteConfig from '../../services/remoteConfig';
import { saveUserGreetingMessage } from '../../services/database';

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

class GreetingTTSScreen extends Component {
    state = {
        step: 0,
        keyboardOpen: false,
        keyboardHeight: 0,
        message: '',
        maxLength: 40
    };

    componentDidMount() {
        this.fetchMaxLengthForMessage();
    }

    fetchMaxLengthForMessage = async () => {
        const maxLength = await remoteConfig.getDataFromKey('greetingsMessagesMaxLength');
        this.setState({ maxLength });
    }

    changeTextHandler = (message) => {
        if (message.length > this.state.maxLength) {
            this.setState({ tooMuch: true });
        } else {
            this.setState({ tooMuch: false });
            this.setState({ message });
        }
    }

    sendMessage = () => {
        this.setState({ step: 1 });
    }

    saveGreetingMessage = async () => {
        await saveUserGreetingMessage(this.props.uid, this.state.message);

        this.props.navigation.navigate('AvatarReadyScreen');
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView keyboardShouldPersistTaps='handled' style={{ backgroundColor: '#0D1021', }} contentContainerStyle={styles.container}>
                    <View style={[styles.innerConatiner, styles.addTTSContainer]}>
                        <View style={[styles.chatContainer, {
                            bottom: heightPercentageToPx(3) + (Platform.OS === 'ios' && this.state.keyboardOpen ? this.state.keyboardHeight : 0)
                        }]}>
                            <View>
                                <View style={styles.chatBubbleContainer}>
                                    <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                        <Text style={{ color: '#00FFDD' }}>
                                            {translate('greetingTTSScreen.makeAnEntrance')}
                                        </Text>
                                        {translate('greetingTTSScreen.sayHi')}
                                    </Text>
                                </View>

                                {this.state.step === 1 &&
                                    <>
                                    <View style={styles.optionOuterConainer}>
                                        {this.state.editMessage &&
                                            <images.svg.editSimple style={[styles.marginTop16, styles.optionOutIconMargin]} />}
                                        <View style={styles.userChatBubbleContainer}>
                                            <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                                {this.state.message}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.chatBubbleContainer}>
                                        <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                            {translate('greetingTTSScreen.readyToSave')}
                                        </Text>
                                    </View>

                                    <View style={styles.optionsContainer}>
                                        <View style={styles.optionContainer}>
                                            <OptionButton onPress={() => this.setState({ step: 0 })}>
                                                <images.svg.editSimple style={styles.optionOutIconMargin} />
                                                <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                                    {translate('greetingTTSScreen.editMessage')}
                                                </Text>
                                            </OptionButton>
                                        </View>
                                        <View style={styles.optionContainer}>
                                            <TouchableOpacity style={styles.readyButton} onPress={this.saveGreetingMessage}>
                                                <Text style={styles.readyText}>
                                                    {translate('greetingTTSScreen.ready')}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    </>
                                }
                            </View>
                            {(this.state.step < 1 || this.state.editMessage) &&
                                <View style={styles.chatBottomContainer}>
                                    <View style={styles.chatInputContainer}>
                                        <TextInput style={[styles.chatTextInput, {
                                            color: this.state.tooMuch ? '#f66' : '#fff',
                                        }]}
                                            onChangeText={this.changeTextHandler}
                                            value={this.state.message}
                                            autoFocus
                                            defaultValue={this.state.message}
                                            onSubmitEditing={this.sendMessage}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        onPress={this.sendMessage}
                                        disabled={this.state.message === ''}
                                        style={{
                                            opacity: this.state.message === '' ? 0.4 : 1,
                                        }}
                                    >
                                        <images.svg.sendChat style={styles.chatSendIcon} />
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}

export default connect(mapStateToProps)(GreetingTTSScreen);