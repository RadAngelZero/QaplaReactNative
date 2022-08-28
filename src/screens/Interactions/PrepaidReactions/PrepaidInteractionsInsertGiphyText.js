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
import { GIPHY_TEXT } from '../../../utilities/Constants';
import LinearGradient from 'react-native-linear-gradient';

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
            text: this.state.text,
            ...this.props.navigation.state.params
        });
    }

    render() {
        const showCutTextWarning = this.props.navigation.getParam('showCutTextWarning', false);
        const isAddOn = this.props.navigation.getParam('isAddOn', false);
        const costsObject = this.props.navigation.getParam('costs', {});

        return (
            <TouchableWithoutFeedback onPress={this.hideKeyboard}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.insertGiphyTextContainer}>
                        <View style={{
                            marginTop: 24,
                            marginLeft: 16,
                            marginBottom: 20,
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 22,
                                fontWeight: '700',
                                lineHeight: 32,
                            }}>
                                {translate('interactions.insertGiphyText.useCustomTTS')}
                            </Text>
                            {isAddOn && costsObject[GIPHY_TEXT] &&
                                <LinearGradient
                                    colors={['#2D07FA', '#A716EE']}
                                    style={{
                                        paddingVertical: 6,
                                        paddingHorizontal: 13,
                                        marginLeft: 8,
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        alignSelf: 'flex-start',
                                    }}
                                    useAngle
                                    angle={90}
                                >
                                    <images.svg.qoin style={{
                                        maxWidth: 16,
                                        maxHeight: 16,
                                    }} />
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 16,
                                        fontWeight: '700',
                                        lineHeight: 19,
                                        marginLeft: 8,
                                    }}>
                                        {costsObject[GIPHY_TEXT]}
                                    </Text>
                                </LinearGradient>
                            }
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={images.gif.maxChars.img} />
                            {showCutTextWarning &&
                                <Text style={styles.insertGiphyTextLimit}>
                                    {translate('interactions.insertGiphyText.cutDownTextWarning')}
                                </Text>
                            }
                        </View>
                        <Animated.View style={{
                            height: Platform.OS === 'ios' ? this.state.isKeyboardOpen.interpolate({ inputRange: [0, 1], outputRange: [this.state.keyboardHeight + 32, 64] }) : 64,
                        }}>
                        <View style={styles.insertGiphyTextTextInputContainer}>
                            <TextInput style={styles.insertGiphyTextTextInput}
                                maxLength={50}
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
