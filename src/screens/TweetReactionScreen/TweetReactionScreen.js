import React, { Component } from 'react';
import {
    ActivityIndicator,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
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

const allMediaOptionsTypes = [
    GIPHY_GIFS,
    GIPHY_STICKERS,
    MEME,
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

const MediaOption = ({ type, disabled = false, onPress }) => {
    const Icon = mediaOptionsIcons[type];

    // Types come from database, to prevent any problem we don't render the option if we can not find their icon
    if (Icon) {
        return (
            <TouchableOpacity onPress={() => onPress(type)}
                style={[styles.mediaOptionContainer, disabled ? styles.mediaOptionDisabled : {}]}>
                <Icon height={24} width={24} />
            </TouchableOpacity>
        );
    }

    return null;
}

class TweetReactionScreen extends Component {
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
                                <Text style={styles.optional}>
                                    Optional
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }} />
                        <View style={styles.streamerContainer}>
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
                        </View>
                        <View style={styles.mediaSelector}>
                            <ScrollView horizontal
                                // Prop to allow users to press buttons inside scroll view even if keyboard is open
                                keyboardShouldPersistTaps='handled'
                                showsHorizontalScrollIndicator={false}
                                style={styles.mediaSelectorScrollView}>
                                {/* Emote is a special case, always first option if enabled */}
                                {this.props.mediaSelectorBarOptions.includes(EMOTE) &&
                                    <TouchableOpacity onPress={() => this.props.onMediaOptionPress(EMOTE)}
                                        style={styles.mediaOptionContainer}>
                                        {this.props.randomEmoteUrl ?
                                            <Image source={this.props.randomEmoteUrl ? { uri: this.props.randomEmoteUrl } : null}
                                                style={{ height: 24, width: 24 }} />
                                            :
                                            <ActivityIndicator size='small' color='rgb(61, 249, 223)'
                                                style={{ height: 24, width: 24 }} />
                                        }
                                    </TouchableOpacity>
                                }
                                {this.props.mediaSelectorBarOptions.map((mediaType) => (
                                    <MediaOption key={mediaType}
                                        type={mediaType}
                                        onPress={this.props.onMediaOptionPress} />
                                ))}
                                {/* Emote is a special case, always first option of the not enabled list if not enabled */}
                                {!this.props.mediaSelectorBarOptions.includes(EMOTE) &&
                                    <TouchableOpacity onPress={() => this.props.onDisabledMediaOptionPress(EMOTE)}
                                        style={[styles.mediaOptionContainer, styles.mediaOptionDisabled]}>
                                        {this.props.randomEmoteUrl ?
                                            <Image source={this.props.randomEmoteUrl ? { uri: this.props.randomEmoteUrl } : null}
                                                style={{ height: 24, width: 24 }} />
                                            :
                                            <ActivityIndicator size='small' color='rgb(61, 249, 223)'
                                                style={{ height: 24, width: 24 }} />
                                        }
                                    </TouchableOpacity>
                                }
                                {noEnabledOptions.map((mediaType) => (
                                    <MediaOption key={mediaType}
                                        type={mediaType}
                                        disabled
                                        onPress={this.props.onDisabledMediaOptionPress} />
                                ))}
                            </ScrollView>
                            <TouchableOpacity style={styles.extraTipButton}>
                                <images.svg.plusCircle height={24} width={24} />
                                <Text style={styles.extraTipButtonText}>
                                    Tip
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    return {
        avatarBackground: state.userReducer.user.avatarBackground,
        avatarId: state.userReducer.user.avatarId,
        userPhotoUrl: state.userReducer.user.photoUrl,
    };
}

TweetReactionScreen.propTypes = {
    qoins: PropTypes.bool,
    cost: PropTypes.number,
    message: PropTypes.string,

    //Options for media selector bar
    mediaSelectorBarOptions: PropTypes.arrayOf(PropTypes.string.isRequired),

    // Required fields
    streamerImage: PropTypes.string.isRequired,
    onMessageChanged: PropTypes.func.isRequired,
    onMediaOptionPress: PropTypes.func.isRequired,
    onDisabledMediaOptionPress: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired
};

TweetReactionScreen.defaultProps = {
    qoins: false,
    cost: 100000
};

export default connect(mapStateToProps)(TweetReactionScreen);