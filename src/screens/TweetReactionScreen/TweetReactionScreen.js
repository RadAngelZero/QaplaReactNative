import React, { Component } from 'react';
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

const mediaOptionsIcons = {
    [GIPHY_GIFS]: images.svg.interactionsGIF,
    [GIPHY_STICKERS]: images.svg.interactionsSticker,
    [MEME]: images.svg.interactionsMemes,
    [AVATAR]: images.svg.avatar,
    [GIPHY_TEXT]: images.svg.giphyText,
    [TTS]: images.svg.volumeUp
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

const MediaOption = ({ type, disabled = false, onPress, isSelected, emoteUrl = null }) => {
    const openTooltip = () => {
        console.log('Tooltip');
    }

    // Types come from database, to prevent any problem we don't render the option if we can not find their icon
    if (type === EMOTE) {
        return (
            <TouchableOpacity onPress={() => !disabled ? onPress(type) : openTooltip()}
                style={styles.mediaOptionContainer}
                activeOpacity={disabled ? 1 : .2}>
                <View style={disabled ? styles.mediaOptionDisabled : {}}>
                    {emoteUrl ?
                        <Image source={emoteUrl ? { uri: emoteUrl } : null}
                            style={{ height: 24, width: 24 }} />
                        :
                        <ActivityIndicator size='small' color='rgb(61, 249, 223)'
                            style={{ height: 24, width: 24 }} />
                    }
                </View>
            </TouchableOpacity>
        );
    } else {
        const Icon = mediaOptionsIcons[type];

        if (Icon) {
            return (
                <TouchableOpacity onPress={() => !disabled ? onPress(type) : openTooltip()}
                    style={styles.mediaOptionContainer}
                    activeOpacity={disabled ? 1 : .2}>
                    <View style={disabled ? styles.mediaOptionDisabled : {}}>
                        {isSelected &&
                            <View style={{ position: 'absolute', top: -6, right: -6, zIndex: 9999 }}>
                                <images.svg.checkCircle />
                            </View>
                        }
                        <Icon height={24} width={24} />
                    </View>
                </TouchableOpacity>
            );
        }

        return null;
    }
}

const ExtraTipOption = ({ label, onPress, selected }) => {
    return (
        <TouchableOpacity onPress={() => onPress()}>
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
        hideScrollView: false,
        extraTipIconRotation: new Animated.Value(0),
        editingTip: false
    };

    executeExtraTipAnimation = () => {
        if (!this.state.hideScrollView) {
            LayoutAnimation.linear();

            this.setState({ hideScrollView: true });

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

            this.setState({ hideScrollView: false });

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
        if (this.state.hideScrollView) {
            this.props.setExtraTip(0);
        }
    }

    setSelectedTip = (amount) => {
        this.props.setExtraTip(amount);
        this.executeExtraTipAnimation();
    }

    render() {
        const avatarImage = `https://api.readyplayer.me/v1/avatars/${this.props.avatarId}.png?scene=fullbody-portrait-v1-transparent`;
        const noEnabledOptions = allMediaOptionsTypes.filter((type) => !this.props.mediaSelectorBarOptions.includes(type));

        return (
            <KeyboardAvoidingView behavior='padding'
                // Android handles this behavior by himself
                enabled={Platform.OS === 'ios'}
                style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <SafeAreaView style={styles.container}>
                        <View style={styles.headerBar}>
                            <TouchableOpacity style={styles.textButton}>
                                <Text style={styles.textButtonText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.onSend}
                                style={styles.containedButton}>
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
                                        }),
                                        marginBottom: this.state.extraTipIconRotation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [16, 0]
                                        }),
                                    }]}>
                                        <TouchableOpacity>
                                            <images.svg.swapRectangle />
                                        </TouchableOpacity>
                                        <Image source={{
                                            uri: this.props.streamerImage
                                        }} style={styles.streamerAvatar} />
                                        <View style={styles.costContainer}>
                                            {this.props.qoins ?
                                                <>
                                                <images.svg.qoin height={16} width={16} />
                                                <Text style={styles.costText}>
                                                    {this.props.cost}
                                                </Text>
                                                </>
                                            :
                                                <>
                                                <images.svg.interactionsNumberIcon  />
                                                <Text style={styles.costText}>
                                                    5 reactions
                                                </Text>
                                                </>
                                            }
                                        </View>
                                        <View style={{ flex: 1 }} />
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
                            {!this.state.hideScrollView &&
                                <ScrollView horizontal
                                    // Prop to allow users to press buttons inside scroll view even if keyboard is open
                                    keyboardShouldPersistTaps='handled'
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.mediaSelectorScrollView}
                                    contentContainerStyle={{ alignItems: 'center' }}>
                                    {this.props.mediaSelectorBarOptions.map((mediaType) => (
                                        <MediaOption key={mediaType}
                                            type={mediaType}
                                            onPress={this.props.onMediaOptionPress}
                                            disabled={this.props.selectedMedia && excludingOptions[this.props.mediaType] && excludingOptions[this.props.mediaType][mediaType]}
                                            isSelected={this.props.selectedMedia && this.props.mediaType === mediaType}
                                            emoteUrl={this.props.randomEmoteUrl} />
                                        ))
                                    }
                                    {noEnabledOptions.map((mediaType) => (
                                        <MediaOption key={mediaType}
                                            type={mediaType}
                                            disabled
                                            onPress={this.props.onDisabledMediaOptionPress}
                                            emoteUrl={this.props.randomEmoteUrl} />
                                    ))}
                                </ScrollView>
                            }
                            <TouchableOpacity onPress={this.tipButtonHandler}>
                            <LinearGradient useAngle
                                angle={135}
                                angleCenter={{ x: .6, y: .6 }}
                                colors={!this.state.hideScrollView && this.props.extraTip ?['#3C00FF', '#AA00F8'] : ['#3B4BF9', '#3B4BF9']}
                                style={styles.extraTipButton}>
                                {/* <Animated.View style={[styles.extraTipButton, {
                                    backgroundColor: this.state.extraTipIconRotation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [this.props.extraTip ? '#A716EE' : '#3B4BF9', '#3B4BF9']
                                    })
                                }]}> */}
                                    <Animated.View style={{
                                        transform: [{ rotate: this.state.extraTipIconRotation.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '45deg']
                                            })
                                        }]
                                    }}>
                                    {!this.state.hideScrollView && this.props.extraTip !== 0 ?
                                        <images.svg.editCircle height={24} width={24} />
                                        :
                                        <images.svg.plusCircle height={24} width={24} />
                                    }
                                    </Animated.View>
                                    <Text style={styles.extraTipButtonText}>
                                        {!this.state.hideScrollView && this.props.extraTip ?
                                            this.props.extraTip.toLocaleString()
                                            :
                                                this.state.hideScrollView ?
                                                    'No Tip'
                                                    :
                                                    'Tip'
                                        }
                                    </Text>
                                    {!this.state.hideScrollView && this.props.extraTip !== 0 &&
                                        <images.svg.qoin style={{ marginLeft: 4 }} height={24} width={24} />
                                    }
                                {/* </Animated.View> */}
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
    message: PropTypes.string,
    selectedMedia: PropTypes.shape({
        original: PropTypes.shape({
            height: PropTypes.number.isRequired,
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired
        })
    }),
    extraTip: PropTypes.number,

    //Options for media selector bar
    mediaSelectorBarOptions: PropTypes.arrayOf(PropTypes.string.isRequired),

    // Required fields
    streamerImage: PropTypes.string.isRequired,
    onMessageChanged: PropTypes.func.isRequired,
    onMediaOptionPress: PropTypes.func.isRequired,
    onDisabledMediaOptionPress: PropTypes.func.isRequired,
    cleanSelectedMedia: PropTypes.func.isRequired,
    setExtraTip: PropTypes.func.isRequired,
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