import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import { translate } from '../../utilities/i18';
import { getTwitchDataCloudFunction } from '../../services/functions';
import { sendCheers, updateTwitchUsername } from '../../services/database';
import { connect } from 'react-redux';
import QaplaIcon from '../../components/QaplaIcon/QaplaIcon';

class WriteCheerMessageScreen extends Component {
    textInput = null;

    state = {
        message: '',
        userResponse: '',
        chatResponsePhraseP1: '',
        chatResponsePhraseP2: '',
        cheerStatus: 0
    };

    updateMessage = (message) => {
        if (this.state.message[this.state.message.length - 1] === '\n' && message[message.length - 1] === '\n') {
            this.setState({ message: this.state.message });
        } else {
            this.setState({ message });
        }
    }

    sendCheers = async () => {
        this.setState({ showUserMessage: true, userResponse: this.state.message, message: '', cheerStatus: 1 }, async () => {
            this.textInput.clear();
            let finalMessage = this.state.message;
            if (this.state.message.includes('\n')) {
                finalMessage = this.state.message.replaceAll('\n', '');
            }

            const twitchData = await getTwitchDataCloudFunction(this.props.twitchId);
            await updateTwitchUsername(this.props.uid, twitchData.data.display_name);


            const qoinsToDonate = this.props.navigation.getParam('qoinsToDonate', 200);
            const streamerData = this.props.navigation.getParam('streamerData', { displayName: '', streamerId: '' });

            let now = new Date();
            await sendCheers(qoinsToDonate, finalMessage, now.getTime(), streamerData.displayName, this.props.uid, this.props.userName, twitchData.data.display_name, this.props.userImage, streamerData.streamerId);

            this.selectChatResponse();
        });
    }

    selectChatResponse = async () => {
		let messageLenght = this.state.userResponse.trim().length;

		let typeOfResponse = 'none';
		let chatResponsePhraseP1 = '';
		let chatResponsePhraseP2 = '';
		let emojis = ['🥰', '😉', '❤', '💞', '💓', '💗', '💖'];
		let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

		if (messageLenght > 0 && messageLenght <= 54) typeOfResponse = 'short';
		if (messageLenght > 54 && messageLenght <= 108) typeOfResponse = 'medium';
		if (messageLenght > 108) typeOfResponse = 'long';

		let firsPartArr = Object.values(translate('sendCheersModal.chatResponsePharases.' + typeOfResponse));
		let secondPartArr = Object.values(translate('sendCheersModal.chatResponsePharases.secondPart'));
		let willBeSentArr = Object.values(translate('sendCheersModal.chatResponsePharases.willBeSent'));
		let randomNum = Math.floor(Math.random() * firsPartArr.length);

		if (typeof firsPartArr[0] === 'object') {
			firsPartArr.forEach((element) => {
				let arr = Object.values(element);
				randomNum = Math.floor(Math.random() * arr.length);
				chatResponsePhraseP1 += arr[randomNum];
			});
		} else {
			chatResponsePhraseP1 += firsPartArr[randomNum];
		}

		randomNum = Math.floor(Math.random() * secondPartArr.length);
		chatResponsePhraseP2 += secondPartArr[randomNum] + '\n';
		randomNum = Math.floor(Math.random() * willBeSentArr.length);
		chatResponsePhraseP2 += willBeSentArr[randomNum] + ' ' + randomEmoji;

		this.setState({ chatResponsePhraseP1, chatResponsePhraseP2, cheerStatus: 2 });
	}

    finishCheer = () => {
        this.props.navigation.goBack();
    }

    render() {
        const streamerData = this.props.navigation.getParam('streamerData', { displayName: '' });

        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Text style={styles.sendAMessageText}>
                        Envía un mensaje personalizado
                    </Text>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                        <View style={{ flex: 1 }} />
                        <View>
                            <View style={styles.botInformation}>
                                <Image source={images.png.profileImagePlaceholder5.img} style={{ height: 32, width: 32, borderRadius: 100 }} />
                                <Text style={styles.botName}>
                                    Qaplita
                                </Text>
                            </View>
                            <View style={styles.botMessageBubble}>
                                <Text style={styles.messageText}>
                                    {translate('writeCheerMessageScreen.tellUs', { streamerName: streamerData.displayName })}
                                </Text>
                            </View>
                            {this.state.userResponse !== ''  ?
                                <View style={styles.userMessageBubble}>
                                    <Text style={styles.messageText}>
                                        {this.state.userResponse}
                                    </Text>
                                </View>
                                :
                                null
                            }
                            {this.state.cheerStatus === 2 &&
                                <View style={styles.botMessageBubble}>
                                    <Text style={styles.messageText}>
                                        {this.state.chatResponsePhraseP1}<Text style={{ color: '#00FFDD' }}>{streamerData.displayName}</Text>{this.state.chatResponsePhraseP2}
                                    </Text>
                                </View>
                            }
                        </View>
                    </ScrollView>
                    {this.state.chatResponsePhraseP1 === '' ?
                        <View style={styles.messageContainer}>
                            <TextInput
                                ref={input => this.textInput = input}
                                editable={this.state.userResponse === ''}
                                multiline={true}
                                onContentSizeChange={(event) => this.setState({ height: event.nativeEvent.contentSize.height })}
                                onChangeText={this.updateMessage}
                                style={[styles.messageInput]}
                                maxLength={280}
                                value={this.state.message} />
                            <QaplaIcon onPress={this.sendCheers}>
                                <images.svg.sendChat />
                            </QaplaIcon>
                        </View>
                        :
                        <TouchableOpacity onPress={this.finishCheer} style={styles.sendCheersButton}>
                            <Text style={styles.sendCheersText}>
                                {`Volver al perfil de ${streamerData.displayName}`}
                            </Text>
                        </TouchableOpacity>
                    }
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        userName: state.userReducer.user.userName,
        userImage: state.userReducer.user.photoUrl,
    };
}

export default connect(mapStateToProps)(WriteCheerMessageScreen);