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
        if (!this.props.openAsModal) {
            this.hideKeyboard();
            this.props.navigation.navigate('PrepaidInteractionsGiphyTextSelector', {
                text: this.state.text,
                ...this.props.navigation.state.params
            });
        } else {
            this.props.onMessageFinished(this.state.text);
        }
    }

    render() {
        let showCutTextWarning = false;
        let isAddOn = true;
        let costsObject = {};
        if (this.props.navigation) {
            showCutTextWarning = this.props.navigation.getParam('showCutTextWarning', false);
            isAddOn = this.props.navigation.getParam('isAddOn', false);
            costsObject = this.props.navigation.getParam('costs', {});
        } else {
            showCutTextWarning = this.props.showCutTextWarning;
            isAddOn = this.props.isAddOn;
        }

        return (
            <TouchableWithoutFeedback onPress={this.hideKeyboard}>
                <SafeAreaView style={styles.container}>
                    {this.props.openAsModal &&
                        <TouchableOpacity
                            onPress={this.props.onClose}
                            style={{
                                marginBottom: 20,
                                marginLeft: 16,
                            }}>
                            <images.svg.backIcon />
                        </TouchableOpacity>
                    }
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
                            {isAddOn &&
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
                                        {costsObject && costsObject[GIPHY_TEXT] ? costsObject[GIPHY_TEXT] : this.props.cost}
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
                                <View style={styles.insertGiphyTextTextInput}>
                                    <TextInput
                                        style={{
                                            color: '#fff',
                                            flexGrow: 1,
                                            fontSize: 16,
                                        }}
                                        maxLength={50}
                                        onChangeText={(text) => this.setState({ text })}
                                        value={this.state.text}
                                        autoFocus
                                        onSubmitEditing={this.sendText}
                                    />
                                    {this.state.text === '' &&
                                        <Image source={images.png.PoweredbyGiphyDark.img} style={{
                                            height: 10,
                                        }}/>
                                    }
                                </View>
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
