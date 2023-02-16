import React, { Component } from 'react';
import { ImageBackground, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import EmoteSelector from '../EmojiSelector/EmoteSelector';
import { getRandomGifByLibrary } from '../../services/database';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import { EMOTE_EXPLOSION, EMOTE_FIREWORKS, EMOTE_RAIN, EMOTE_TUNNEL } from '../../utilities/Constants';

class EmoteAnimationModal extends Component {
    state = {
        selectedAnimation: null,
        selectedEmotes: [],
        gif: undefined
    };

    loadRandomGif = async () => {
        const gif = await getRandomGifByLibrary('level3Reactions');
        this.setState({ gif: gif.val() });
    }

    onAnimationSelected = (selectedAnimation) => {
        this.setState({ selectedAnimation });
    }

    onEmoteSelected = (emoteUrl, onEmoteAdded) => {
        if (this.state.selectedEmotes.length < 3) {
            const emotesArray = [...this.state.selectedEmotes];

            emotesArray.push(emoteUrl);
            this.setState({ selectedEmotes: emotesArray });
            onEmoteAdded();
        }
    }

    onEmoteRemoved = (emoteUrl) => {
        const emotesArray = [...this.state.selectedEmotes];

        const index = emotesArray.findIndex((emote) => emote === emoteUrl);
        if (!isNaN(index)) {
            emotesArray.splice(index, 1);
            this.setState({ selectedEmotes: emotesArray });
        }
    }

    onModalClose = () => {
        this.setState({ selectedAnimation: null, selectedEmotes: [] });
        this.props.onClose();
    }

    onEmotesAnimationConfirmed = () => {
        this.props.onEmoteAnimationSelected(this.state.selectedEmotes, this.state.selectedAnimation);
        this.setState({ selectedAnimation: null, selectedEmotes: [] });
    }

    render() {
        return (
            <Modal visible={this.props.open}
                onRequestClose={this.onModalClose}
                onShow={this.loadRandomGif}
                onDismiss={() => this.setState({ gif: undefined })}
                animationType='slide'
                transparent>
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <View style={styles.titleRow}>
                            <TouchableOpacity onPress={this.onModalClose}>
                                <images.svg.closeIcon style={styles.closeIcon} />
                            </TouchableOpacity>
                            <Text style={styles.title}>
                                Let it rain 👇
                            </Text>
                            {/* Trick to center text */}
                            <View style={[styles.closeIcon, { opacity: 0 }]}>
                                <images.svg.closeIcon />
                            </View>
                        </View>
                        {!this.state.selectedAnimation ?
                            <ScrollView style={{
                                marginTop: 32
                            }}
                            contentContainerStyle={{
                                paddingBottom: 16
                            }}
                            showsVerticalScrollIndicator={false}>
                                <EmotesAnimationSample animationName='💧 Rain'
                                    onAnimationSelected={() => this.onAnimationSelected(EMOTE_RAIN)} />
                                <EmotesAnimationSample animationName='🎆 Fireworks'
                                    onAnimationSelected={() => this.onAnimationSelected(EMOTE_FIREWORKS)} />
                                <EmotesAnimationSample animationName='🌀 Warp'
                                    onAnimationSelected={() => this.onAnimationSelected(EMOTE_TUNNEL)} />
                                <EmotesAnimationSample animationName='💣 Bomb'
                                    onAnimationSelected={() => this.onAnimationSelected(EMOTE_EXPLOSION)} />
                            </ScrollView>
                        :
                            <>
                            <View style={styles.emoteRainGifContainer}>
                                <ImageBackground source={this.state.gif ? {
                                        uri: this.state.gif
                                    }
                                    :
                                    null
                                }
                                style={styles.emoteRainGif}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: '500',
                                        textAlign: 'center',
                                        color: '#FFF',
                                        textAlignVertical: 'bottom',
                                        paddingBottom: 24,
                                        paddingRight: 16
                                    }}>
                                        {this.state.animationSelected}
                                    </Text>
                                </ImageBackground>
                            </View>
                            <View style={styles.emotesContainer}>
                                <EmoteSelector data={this.props.emotes}
                                    onEmoteSelect={this.onEmoteSelected}
                                    onEmoteRemoved={this.onEmoteRemoved}
                                    {...this.props.userToStreamerRelation} />
                            </View>
                            <View style={{
                                position: 'relative',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {this.state.selectedEmotes.length > 0 &&
                                    <TouchableOpacity style={{
                                        borderRadius: 100,
                                        backgroundColor: '#00FFDD',
                                        paddingVertical: 16,
                                        paddingHorizontal: 24,
                                        position: 'absolute',
                                        bottom: 24,
                                        width: 126
                                    }}
                                    onPress={this.onEmotesAnimationConfirmed}>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: '700',
                                            color: '#0D1022',
                                            textAlign: 'center'
                                        }}>
                                            Confirm
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            </>
                        }
                    </View>
                </View>
            </Modal>
        );
    }
}

export default EmoteAnimationModal;

class EmotesAnimationSample extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onAnimationSelected}>
                <ImageBackground style={{
                    borderRadius: 20,
                    marginBottom: 16,
                    paddingHorizontal: 16,
                    height: heightPercentageToPx(22.17),
                    backgroundColor: '#0D1021',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/qapplaapp.appspot.com/o/AppGifs%2Fcool-cat-raid.gif?alt=media&token=12e68db1-e694-447e-a8de-aa35ce2d3592' }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '500',
                        textAlign: 'center',
                        color: '#FFF',
                        textAlignVertical: 'bottom',
                        paddingBottom: 24
                    }}>
                        {this.props.animationName}
                    </Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}