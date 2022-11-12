import React, { Component, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    LayoutAnimation,
    Animated,
    Easing,
    UIManager
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Tooltip from 'react-native-walkthrough-tooltip';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';
import {
    AVATAR,
    EMOTE,
    GIPHY_GIFS,
    GIPHY_STICKERS,
    GIPHY_TEXT,
    MEME,
    TTS
} from '../../utilities/Constants';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import { getStreamerProfilePhotoUrl } from '../../services/storage';

// For animations on android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const allMediaOptionsTypes = [
    GIPHY_GIFS,
    GIPHY_STICKERS,
    MEME,
    EMOTE,
    AVATAR,
    GIPHY_TEXT,
    TTS
];

const mediaOptionsData = {
    [GIPHY_GIFS]: {
        Icon: images.svg.interactionsGIF,
        label: 'Gif'
    },
    [GIPHY_STICKERS]: {
        Icon: images.svg.interactionsSticker,
        label: 'Sticker'
    },
    [MEME]: {
        Icon: images.svg.interactionsMemes,
        label: 'Meme'
    },
    [EMOTE]: {
        label: 'Emotes Animations'
    },
    [AVATAR]: {
        Icon: images.svg.avatar,
        label: 'Animated Avatar'
    },
    [GIPHY_TEXT]: {
        Icon: images.svg.giphyText,
        label: '3D Text'
    },
    [TTS]: {
        Icon: images.svg.volumeUp,
        label: 'TTS Bot Voice'
    }
};

const excludingOptions = {
    [GIPHY_GIFS]: {
        [GIPHY_STICKERS]: true,
        [MEME]: true
    },
    [GIPHY_STICKERS]: {
        [GIPHY_GIFS]: true,
        [MEME]: true
    },
    [MEME]: {
        [GIPHY_GIFS]: true,
        [GIPHY_STICKERS]: true
    },
};

const MediaOptionTooltip = ({ children, open, onClose, label, highlightedText, cost, keyboardHeight, buttonText, buttonAction }) => {
    return (
        <Tooltip
            isVisible={open}
            content={
                <View style={styles.tooltipContainer}>
                    <View style={styles.tooltipTextAndIconContainer}>
                        <Text style={[styles.tooltipLabelText, { maxWidth: '80%' }]}>
                            {label}
                            <Text style={styles.tooltipHighlihgtedText}>
                                {highlightedText}
                            </Text>
                        </Text>
                        <TouchableOpacity onPress={onClose}>
                            <images.svg.closeIcon />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.tooltipButtonContainer}
                        onPress={buttonAction}>
                        <Text style={styles.tooltipLabelText}>
                            {buttonText}
                        </Text>
                        {cost &&
                            <>
                            <Text style={[styles.tooltipLabelText, styles.tooltipHighlihgtedText, { marginLeft: 8, marginRight: 4 }]}>
                                {cost}
                            </Text>
                            <images.svg.qoin height={16} width={16} />
                            </>
                        }
                        <images.svg.rightArrow height={16} width={8.8} style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                </View>
            }
            placement='top'
            onClose={onClose}
            arrowStyle={styles.tooltipArrowStyle}
            arrowSize={styles.tooltipArrowSize}
            displayInsets={{
                left: 0,
                right: 0
            }}
            topAdjustment={keyboardHeight}
            childContentSpacing={20}
            contentStyle={styles.tooltipContentStyle}
            backgroundColor='transparent'>
            {children}
        </Tooltip>
    );
}

const MediaOption = ({ type, disabled = false, excluded = false, onPress, isSelected, emoteUrl = null, keyboardHeight, cost, onUpgradeReaction }) => {
    const [openTooltip, setOpenTooltip] = useState(false);

    const buttonAction = () => {
        setOpenTooltip(false);
        if (excluded) {
            onPress(type);
        } else {
            onUpgradeReaction();
        }
    }

    let excludedLabels = [];
    let excludedString = '';
    if (excluded) {
        // The currently selected option
        excludedLabels.push(mediaOptionsData[type].label);

        // The label of any option excluded by the current selection
        Object.keys(excludingOptions[type]).forEach((optionKey) => {
            excludedLabels.push(mediaOptionsData[optionKey].label);
        });

        // Sort strings by length
        excludedLabels.sort((a, b) => a.length - b.length);

        // Create the final string to show on UI
        excludedLabels.forEach((label, index) => {
            excludedString += `${index < excludedLabels.length - 1 ? ' ' : ' or '}${label}${index < excludedLabels.length - 2 ? ', ' : ''}`;
        });
    }
    const mediaOptionData = mediaOptionsData[type];

    // Types come from database, to prevent any problem we don't render the option if we can not find their data
    if (mediaOptionData) {
        return (
            <MediaOptionTooltip open={openTooltip}
                highlightedText={excluded ? excludedString : mediaOptionData.label}
                label={excluded ? '😯 You can only use one ' : '👀 Upgrade your reaction to use '}
                buttonText={excluded ? `Use ${mediaOptionData.label}` : 'Upgrade Reaction'}
                buttonAction={buttonAction}
                onClose={() => setOpenTooltip(false)}
                keyboardHeight={keyboardHeight}
                cost={cost}>
                <TouchableOpacity onPress={() => !disabled && !excluded ? onPress(type) : setOpenTooltip(true)}
                    style={styles.mediaOptionContainer}
                    activeOpacity={disabled || excluded ? 1 : .2}>
                    <View style={disabled || excluded ? styles.mediaOptionDisabled : {}}>
                        {isSelected &&
                            <View style={{ position: 'absolute', top: -6, right: -6, zIndex: 9999 }}>
                                <images.svg.checkCircle />
                            </View>
                        }
                        {type === EMOTE ?
                            emoteUrl ?
                                <Image source={emoteUrl ? { uri: emoteUrl } : null}
                                    style={{ height: 24, width: 24 }} />
                                :
                                <ActivityIndicator size='small' color='rgb(61, 249, 223)'
                                    style={{ height: 24, width: 24 }} />
                            :
                            <mediaOptionData.Icon height={24} width={24} />
                        }
                    </View>
                </TouchableOpacity>
            </MediaOptionTooltip>
        );
    }

    return null;
}

const ExtraTipOption = ({ label, onPress, selected }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient useAngle
                angle={135}
                angleCenter={{ x: .6, y: .6 }}
                colors={['#3C00FF', '#AA00F8']}
                style={styles.extraTipOptionButtonContainer}>
                <View style={[styles.extraTipOptionButton, {
                    backgroundColor: selected ? 'transparent' : '#0D1021'
                }]}>
                    <images.svg.qoin height={16} width={16} />
                    <Text style={styles.extraTipOptionButtonText} numberOfLines={1}>
                        {label}
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

class TweetReactionScreen extends Component {
    state = {
        openTipMenu: false,
        extraTipIconRotation: new Animated.Value(0),
        editingTip: false,
        keyboardHeight: 0,
        streamerFallbackImageUrl: ''
    };

    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
			this.setState({ keyboardHeight: e.endCoordinates.height });
		});
		this.keyboardWillHideListener = Keyboard.addListener('keyboardDidHide', () => {
			this.setState({ keyboardHeight: 0 });
		});
    }

    executeExtraTipAnimation = () => {
        if (!this.state.openTipMenu) {
            LayoutAnimation.linear();

            this.setState({ openTipMenu: true });

            Animated.timing(
            this.state.extraTipIconRotation,
                {
                toValue: 1,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: false
                }
            ).start();
        } else {
            LayoutAnimation.linear();

            this.setState({ openTipMenu: false });

            Animated.timing(
            this.state.extraTipIconRotation,
                {
                toValue: 0,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: false
                }
            ).start();
        }
    }

    tipButtonHandler = () => {
        this.executeExtraTipAnimation();
        if (this.state.openTipMenu) {
            this.props.setExtraTip(0);
        }
    }

    setSelectedTip = (amount) => {
        this.props.setExtraTip(amount);
        this.executeExtraTipAnimation();
    }

    toggleKeyboard = () => {
        if (this.textInput.isFocused()) {
            this.textInput.blur();
        } else {
            this.textInput.focus();
        }
    }

    getStreamerFallbackImage = async () => {
        try {
            this.setState({ streamerFallbackImageUrl: await getStreamerProfilePhotoUrl(this.props.streamerUid) });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const avatarImage = `https://api.readyplayer.me/v1/avatars/${this.props.avatarId}.png?scene=fullbody-portrait-v1-transparent`;
        const noEnabledOptions = allMediaOptionsTypes.filter((type) => !this.props.mediaSelectorBarOptions.includes(type));

        const sendButtonDisabled = (!this.props.message && !this.props.selectedMedia) || this.props.sending;

        return (
            <KeyboardAvoidingView behavior='padding'
                // Android handles this behavior by himself
                enabled={Platform.OS === 'ios'}
                style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}
                    touchSoundDisabled>
                    <SafeAreaView style={styles.container}>
                        <View style={styles.headerBar}>
                            <TouchableOpacity style={styles.textButton}
                                onPress={this.props.onCancel}>
                                <Text style={styles.textButtonText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.onSend}
                                disabled={sendButtonDisabled}
                                style={[styles.containedButton, sendButtonDisabled ? styles.containedButtonDisabled : {}]}>
                                <Text style={styles.containedButtonText}>
                                    Send
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ttsContainer}>
                            {this.props.avatarId && this.props.avatarBackground ?
                                <LinearGradient style={styles.avatarImage} useAngle
                                        {...this.props.avatarBackground}>
                                    <Image style={styles.avatarImage} source={{
                                        uri: avatarImage
                                    }} />
                                </LinearGradient>
                                :
                                <Image style={styles.avatarImage} source={{ uri: this.props.userPhotoUrl }} />
                            }
                            <View style={styles.ttsInputContainer}>
                                <TextInput style={styles.ttsTextInput}
                                    ref={(textInput) => this.textInput = textInput}
                                    autoFocus
                                    placeholder='Type to create TTS'
                                    placeholderTextColor='#C2C2C2'
                                    selectionColor='#00FFDD'
                                    maxLength={50}
                                    returnKeyType='send'
                                    multiline
                                    blurOnSubmit
                                    value={this.props.message}
                                    onChangeText={this.props.onMessageChanged} />
                                {!this.props.message &&
                                    <Text style={styles.optional}>
                                        Optional
                                    </Text>
                                }
                            </View>
                        </View>
                        <View style={styles.mediaContainer}>
                            {this.props.selectedMedia &&
                                <ImageBackground style={
                                        this.props.selectedMedia.aspectRatio > 1 ?
                                            {
                                                overflow: 'hidden',
                                                borderRadius: 10,
                                                width: widthPercentageToPx(60),
                                                aspectRatio: this.props.selectedMedia.aspectRatio
                                            }
                                            :
                                            {
                                                overflow: 'hidden',
                                                borderRadius: 10,
                                                height: heightPercentageToPx(40),
                                                aspectRatio: this.props.selectedMedia.aspectRatio
                                            }
                                    }
                                    source={{ uri: this.props.selectedMedia.data.images.original.url }}>
                                    <TouchableOpacity style={styles.removeImageIcon}
                                        onPress={this.props.cleanSelectedMedia}>
                                        <images.svg.closeIcon width={32} height={32} />
                                    </TouchableOpacity>
                                </ImageBackground>
                            }
                        </View>
                        <View style={styles.streamerAndExtraTipsContainer}>
                            <Animated.View style={{
                                height: this.state.extraTipIconRotation.interpolate({
                                    inputRange: [0, 1],
                                    /**
                                     * 64 = height of streamerContainer and their margins
                                     * widthPercentageToPx(21.33) + 32 = height of extraTipButtonsContainer and
                                     * their paddings and margins
                                     */
                                    outputRange: [64, widthPercentageToPx(21.33) + 32]
                                })
                            }}>
                                <View style={{ backgroundColor: '#0D1021', }}>
                                    <Animated.View style={[styles.streamerContainer, {
                                        opacity: this.state.extraTipIconRotation.interpolate({
                                            inputRange: [0, .5],
                                            outputRange: [1, 0]
                                        }),
                                        height: this.state.extraTipIconRotation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [32, 0]
                                        }),
                                        marginTop: this.state.extraTipIconRotation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [16, 0]
                                        })
                                    }]}>
                                        <TouchableOpacity onPress={this.props.onOpenSearchStreamerModal}>
                                            <images.svg.swapRectangle />
                                        </TouchableOpacity>
                                        <Image source={
                                                this.props.streamerImage ? {
                                                    /**
                                                     * streamerFallbackImageUrl is always empty unless an error
                                                     * loading the original image happen
                                                     */
                                                    uri: this.state.streamerFallbackImageUrl ?
                                                        this.state.streamerFallbackImageUrl
                                                        :
                                                        this.props.streamerImage
                                                }
                                                :
                                                null
                                            }
                                            onError={this.getStreamerFallbackImage}
                                            style={styles.streamerAvatar} />
                                        <View style={styles.costContainer}>
                                            {this.props.qoins ?
                                                <>
                                                <images.svg.qoin height={16} width={16} />
                                                <Text style={styles.costText}>
                                                    {this.props.cost ?
                                                        this.props.cost
                                                        :
                                                        null
                                                    }
                                                </Text>
                                                </>
                                            :
                                                <>
                                                <images.svg.interactionsNumberIcon  />
                                                <Text style={styles.costText}>
                                                    {this.props.numberOfReactions !== undefined ?
                                                        `${this.props.numberOfReactions.toLocaleString()} reactions`
                                                        :
                                                        null
                                                    }
                                                </Text>
                                                </>
                                            }
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <TouchableOpacity onPress={this.toggleKeyboard}>
                                                <images.svg.showKeyboard />
                                            </TouchableOpacity>
                                        </View>
                                    </Animated.View>
                                    <View style={styles.extraTipButtonsContainer}>
                                        <ExtraTipOption label={200}
                                            onPress={() => this.setSelectedTip(200)}
                                            selected={this.props.extraTip === 200} />
                                        <ExtraTipOption label={500}
                                            onPress={() => this.setSelectedTip(500)}
                                            selected={this.props.extraTip === 500} />
                                        <ExtraTipOption label={1000}
                                            onPress={() => this.setSelectedTip(1000)}
                                            selected={this.props.extraTip === 1000} />
                                        <ExtraTipOption label={4000}
                                            onPress={() => this.setSelectedTip(4000)}
                                            selected={this.props.extraTip === 4000} />
                                    </View>
                                </View>
                            </Animated.View>
                        </View>
                        <View style={styles.mediaSelector}>
                            {!this.state.openTipMenu &&
                                <ScrollView horizontal
                                    // Prop to allow users to press buttons inside scroll view even if keyboard is open
                                    keyboardShouldPersistTaps='handled'
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.mediaSelectorScrollView}
                                    contentContainerStyle={{ alignItems: 'center' }}>
                                    {this.props.mediaSelectorBarOptions.map((mediaType) => (
                                        <MediaOption key={mediaType}
                                            type={mediaType}
                                            excluded={this.props.selectedMedia && excludingOptions[this.props.mediaType] && excludingOptions[this.props.mediaType][mediaType]}
                                            onPress={this.props.onMediaOptionPress}
                                            isSelected={this.props.selectedMedia && this.props.mediaType === mediaType}
                                            emoteUrl={this.props.randomEmoteUrl}
                                            keyboardHeight={this.state.keyboardHeight} />
                                        ))
                                    }
                                    {noEnabledOptions.map((mediaType) => (
                                        <MediaOption key={mediaType}
                                            type={mediaType}
                                            disabled
                                            cost={800}
                                            emoteUrl={this.props.randomEmoteUrl}
                                            keyboardHeight={this.state.keyboardHeight} />
                                    ))}
                                </ScrollView>
                            }
                            <TouchableOpacity onPress={this.tipButtonHandler}>
                                <LinearGradient useAngle
                                    angle={135}
                                    angleCenter={{ x: .6, y: .6 }}
                                    colors={!this.state.openTipMenu && this.props.extraTip ?['#3C00FF', '#AA00F8'] : ['#3B4BF9', '#3B4BF9']}
                                    style={styles.extraTipButton}>
                                    <Animated.View style={{
                                        transform: [{ rotate: this.state.extraTipIconRotation.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '45deg']
                                            })
                                        }]
                                    }}>
                                    {!this.state.openTipMenu && this.props.extraTip !== 0 ?
                                        <images.svg.editCircle height={24} width={24} />
                                        :
                                        <images.svg.plusCircle height={24} width={24} />
                                    }
                                    </Animated.View>
                                    <Text style={styles.extraTipButtonText}>
                                        {!this.state.openTipMenu && this.props.extraTip ?
                                            this.props.extraTip.toLocaleString()
                                            :
                                                this.state.openTipMenu ?
                                                    'No Tip'
                                                    :
                                                    'Tip'
                                        }
                                    </Text>
                                    {!this.state.openTipMenu && this.props.extraTip !== 0 &&
                                        <images.svg.qoin style={{ marginLeft: 4 }} height={24} width={24} />
                                    }
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

TweetReactionScreen.propTypes = {
    qoins: PropTypes.bool,
    cost: PropTypes.number,
    numberOfReactions: PropTypes.number,
    message: PropTypes.string,
    selectedMedia: PropTypes.shape({
        aspectRatio: PropTypes.number,
        data: {
            images: {
                original: PropTypes.shape({
                    height: PropTypes.number,
                    id: PropTypes.string,
                    url: PropTypes.string,
                    width: PropTypes.number
                })
            }
        }
    }),
    mediaType: PropTypes.string,
    sending: PropTypes.bool,
    extraTip: PropTypes.number,
    randomEmoteUrl: PropTypes.string,
    streamerUid: PropTypes.string,

    // Required fields
    //Options for media selector bar
    mediaSelectorBarOptions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,

    streamerImage: PropTypes.string.isRequired,
    onMessageChanged: PropTypes.func.isRequired,
    onMediaOptionPress: PropTypes.func.isRequired,
    cleanSelectedMedia: PropTypes.func.isRequired,
    setExtraTip: PropTypes.func.isRequired,
    onOpenSearchStreamerModal: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired
};

TweetReactionScreen.defaultProps = {
    qoins: false
};

function mapStateToProps(state) {
    return {
        avatarBackground: state.userReducer.user.avatarBackground,
        avatarId: state.userReducer.user.avatarId,
        userPhotoUrl: state.userReducer.user.photoUrl,
    };
}

export default connect(mapStateToProps)(TweetReactionScreen);