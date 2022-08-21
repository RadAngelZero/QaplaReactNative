import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    Keyboard,
    Platform,
    Easing,
    TouchableWithoutFeedback,
    Image
} from 'react-native';

import styles from './../style';
import images from '../../../../assets/images';
import { translate } from '../../../utilities/i18';

class PrepaidInteractionsInsertGiphyText extends Component {
    state = {
        text: '',
        isKeyboardOpen: new Animated.Value(1),
		keyboardHeight: 0
    };
    keyboardWillShowListener;

    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
			this.setState({ keyboardHeight: parseInt(e.endCoordinates.height) }, () => {
				Animated.timing(this.state.isKeyboardOpen, {
					toValue: 0,
					duration: 300,
					easing: Easing.cubic,
					useNativeDriver: false,
				}).start();
			});
		})
    }

    componentWillUnmount() {
		this.keyboardWillShowListener.remove();
	}

    hideKeyboard = () => {
        Keyboard.dismiss();
        Animated.timing(this.state.isKeyboardOpen, {
            toValue: 1,
            duration: 300,
            easing: Easing.cubic,
            useNativeDriver: false,
        }).start();
    }

    sendText = () => {
        this.hideKeyboard();
        this.props.navigation.navigate('PrepaidInteractionsGiphyTextSelector', {
            text: this.state.text
        });
    }

    render() {
        const showCutTextWarning = this.props.navigation.getParam('showCutTextWarning', false);

        return (
            <TouchableWithoutFeedback onPress={this.hideKeyboard}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.insertGiphyTextContainer}>
                        <View style={[styles.headerContainer, styles.insertGiphyTextHeader]}>
                            <Text style={[styles.whiteText, styles.screenHeaderText]}>
                                {`${translate('interactions.personalize.personalizeYourInteraction')}`}
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={images.gif.maxChars.img} />
                            {showCutTextWarning &&
                                <Text style={styles.insertGiphyTextLimit}>
                                    Cut down your message to 50 characters or less to use a Custom TTS
                                </Text>
                            }
                        </View>
                        <Animated.View style={{
                            height: Platform.OS === 'ios' ? this.state.isKeyboardOpen.interpolate({ inputRange: [0, 1], outputRange: [this.state.keyboardHeight + 32, 64] }) : 64,
                        }}>
                        <View style={styles.insertGiphyTextTextInputContainer}>
                            <TextInput style={styles.insertGiphyTextTextInput}
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}
                                autoFocus
                                onSubmitEditing={this.sendText}
                            />
                            <TouchableOpacity onPress={this.sendText}>
                                <images.svg.sendChat  />
                            </TouchableOpacity>
                        </View>
                        </Animated.View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}

export default PrepaidInteractionsInsertGiphyText;
