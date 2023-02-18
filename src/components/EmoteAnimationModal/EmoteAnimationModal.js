import React, { Component } from 'react';
import { ImageBackground, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import EmoteSelector from '../EmojiSelector/EmoteSelector';
import { getRandomGifByLibrary } from '../../services/database';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import { EMOTE_EXPLOSION, EMOTE_FIREWORKS, EMOTE_RAIN, EMOTE_TUNNEL } from '../../utilities/Constants';
import { translate } from '../../utilities/i18';
import Tooltip from 'react-native-walkthrough-tooltip';

class EmoteAnimationModal extends Component {
    state = {
        selectedAnimation: null,
        selectedEmotes: [],
        rainGif: undefined,
        fireworksGif: undefined,
        warpGif: undefined,
        bombGif: undefined,
        selectedAnimationGif: undefined,
        openAnimationTooltip: false,
        nonSelectedAnimations: []
    };

    componentDidMount() {
        this.loadRandomGifs();
    }

    loadRandomGifs = async () => {
        const rainGif = await getRandomGifByLibrary('RainEmotesAnimation');
        const fireworksGif = await getRandomGifByLibrary('FireworksEmotesAnimation');
        const warpGif = await getRandomGifByLibrary('WarpEmotesAnimation');
        const bombGif = await getRandomGifByLibrary('BombEmotesAnimation');

        this.setState({
            rainGif: rainGif.val(),
            fireworksGif: fireworksGif.val(),
            warpGif: warpGif.val(),
            bombGif: bombGif.val()
        });
    }

    onAnimationSelected = (selectedAnimation) => {
        let selectedAnimationGif = this.state.rainGif;
        switch (selectedAnimation) {
            case EMOTE_RAIN:
                selectedAnimationGif = this.state.rainGif;
                break;
            case EMOTE_FIREWORKS:
                selectedAnimationGif = this.state.fireworksGif;
                break;
            case EMOTE_TUNNEL:
                selectedAnimationGif = this.state.warpGif;
                break;
            case EMOTE_EXPLOSION:
                selectedAnimationGif = this.state.bombGif;
                break;
            default:
                break;
        }

        const nonSelectedAnimations = [EMOTE_RAIN, EMOTE_FIREWORKS, EMOTE_TUNNEL, EMOTE_EXPLOSION];

        const selectedIndex = nonSelectedAnimations.findIndex((animationName) => animationName === selectedAnimation);
        nonSelectedAnimations.splice(selectedIndex, 1);

        this.setState({
            selectedAnimation,
            selectedAnimationGif,
            openAnimationTooltip: false,
            nonSelectedAnimations
        });
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
                animationType='slide'
                transparent>
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <View style={styles.titleRow}>
                            {!this.state.selectedAnimation ?
                                <TouchableOpacity onPress={this.onModalClose}>
                                    <images.svg.closeIcon style={styles.closeIcon} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this.setState({ selectedAnimation: null })}>
                                    <images.svg.backIcon style={styles.closeIcon} />
                                </TouchableOpacity>
                            }
                            <Text style={styles.title}>
                                {!this.state.selectedAnimation ?
                                    translate('emoteAnimationModal.fullScreenAnimations')
                                    :
                                    translate('emoteAnimationModal.chooseEmotes')
                                }
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
                                    onAnimationSelected={() => this.onAnimationSelected(EMOTE_RAIN)}
                                    gif={this.state.rainGif} />
                                <EmotesAnimationSample animationName='🎆 Fireworks'
                                    onAnimationSelected={() => this.onAnimationSelected(EMOTE_FIREWORKS)}
                                    gif={this.state.fireworksGif} />
                                <EmotesAnimationSample animationName='🌀 Warp'
                                    onAnimationSelected={() => this.onAnimationSelected(EMOTE_TUNNEL)}
                                    gif={this.state.warpGif} />
                                <EmotesAnimationSample animationName='💣 Bomb'
                                    onAnimationSelected={() => this.onAnimationSelected(EMOTE_EXPLOSION)}
                                    gif={this.state.bombGif} />
                            </ScrollView>
                        :
                            <>
                            <View style={styles.emoteRainGifContainer}>
                                <ImageBackground source={this.state.selectedAnimationGif ? {
                                        uri: this.state.selectedAnimationGif
                                    }
                                    :
                                    null
                                }
                                style={styles.emoteRainGif}>
                                    <Tooltip showChildInTooltip={false}
                                        isVisible={this.state.openAnimationTooltip}
                                        closeOnContentInteraction
                                        closeOnChildInteraction
                                        content={
                                            <View style={styles.tooltipContainer}>
                                                <TouchableOpacity onPress={() => this.onAnimationSelected(EMOTE_RAIN)}
                                                    style={styles.tooltipOptionTouchableContainer}>
                                                    <Text style={styles.tooltipOptionTextContainer}>
                                                        {translate(`emoteAnimationModal.${this.state.selectedAnimation}`)}
                                                    </Text>
                                                    <images.svg.arrowDownWhite style={{
                                                        transform: [{
                                                            rotateX: '180deg'
                                                        }]
                                                    }} />
                                                </TouchableOpacity>
                                                {this.state.nonSelectedAnimations.map((animationName, index) => (
                                                    <TouchableOpacity onPress={() => this.onAnimationSelected(animationName)}>
                                                        <Text style={[styles.tooltipOptionTextContainer, {
                                                            marginBottom: index !== this.state.nonSelectedAnimations.length - 1 ? 24 : 0
                                                        }]}>
                                                            {translate(`emoteAnimationModal.${animationName}`)}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        }
                                        displayInsets={{
                                            right: 0,
                                            left: widthPercentageToPx(58)
                                        }}
                                        topAdjustment={heightPercentageToPx(22)}
                                        arrowStyle={{
                                            display: 'none',
                                            opacity: 0
                                        }}
                                        onClose={() => this.setState({ openAnimationTooltip: false })}
                                        contentStyle={styles.tooltipContentStyle}
                                        backgroundColor='transparent'>
                                        <TouchableOpacity style={styles.selectedAnimationButton}
                                            onPress={() => this.setState({ openAnimationTooltip: true })}>
                                            <Text style={styles.selectedAnimationText}>
                                                {translate(`emoteAnimationModal.${this.state.selectedAnimation}`)}
                                            </Text>
                                            <images.svg.arrowDownWhite />
                                        </TouchableOpacity>
                                    </Tooltip>
                                </ImageBackground>
                            </View>
                            <View style={styles.emotesContainer}>
                                <EmoteSelector data={this.props.emotes}
                                    onEmoteSelect={this.onEmoteSelected}
                                    onEmoteRemoved={this.onEmoteRemoved}
                                    {...this.props.userToStreamerRelation} />
                            </View>
                            <View style={styles.confirmButtonContainer}>
                                {this.state.selectedEmotes.length > 0 &&
                                    <TouchableOpacity style={styles.confirmButton}
                                    onPress={this.onEmotesAnimationConfirmed}>
                                        <Text style={styles.confirmText}>
                                            {translate('emoteAnimationModal.confirm')}
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
                <ImageBackground style={styles.animationSampleImage}
                    source={{ uri: this.props.gif }}>
                    <Text style={styles.animationSampleText}>
                        {this.props.animationName}
                    </Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}