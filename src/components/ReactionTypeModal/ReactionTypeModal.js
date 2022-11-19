import React, { Component } from 'react';
import { Image, ImageBackground, Modal, Text, TouchableOpacity, View } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import images from './../../../assets/images';
import { getRandomGifByLibrary } from '../../services/database';

class ReactionTypeModal extends Component {
    state = {
        level1Gif: undefined,
        level2Gif: undefined,
        level3Gif: undefined
    };

    loadGifs = async () => {
        const level1Gif = await getRandomGifByLibrary('ChannelPointsReactions');
        const level2Gif = await getRandomGifByLibrary('level2Reactions');
        const level3Gif = await getRandomGifByLibrary('level3Reactions');
        this.setState({
            level1Gif: level1Gif.val(),
            level2Gif: level2Gif.val(),
            level3Gif: level3Gif.val()
        });
    }

    changeReactionLevel = (level) => {
        this.props.changeReactionLevel(level);
        this.props.onClose();
    }

    render() {
        return (
            <Modal visible={this.props.open}
                onRequestClose={this.props.onClose}
                onShow={this.loadGifs}
                onDismiss={() => this.setState({ level1Gif: undefined, level2Gif: undefined, level3Gif: undefined })}
                animationType='slide'
                transparent>
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <View style={styles.titleRow}>
                            <TouchableOpacity onPress={this.props.onClose}>
                                <images.svg.closeIcon style={styles.closeIcon} />
                            </TouchableOpacity>
                            <MaskedView maskElement={
                                <Text style={styles.title}>
                                    Select Reaction Tier
                                </Text>
                            }>
                                <LinearGradient
                                    colors={['#FFD4FB', '#F5FFCB', '#82FFD2']}
                                    useAngle
                                    angle={227}>
                                    <Text style={[styles.title, { opacity: 0 }]}>
                                    Select Reaction Tier
                                    </Text>
                                </LinearGradient>
                            </MaskedView>
                            {/* Trick to center text */}
                            <View style={[styles.closeIcon, { opacity: 0 }]}>
                                <images.svg.closeIcon />
                            </View>
                        </View>
                        <View style={styles.reactionsContainer}>
                            <TouchableOpacity style={styles.reactionType}
                                onPress={() => this.changeReactionLevel(1)}>
                                <ImageBackground source={this.state.level1Gif ? {
                                            uri: this.state.level1Gif
                                        }
                                        :
                                        null
                                    }
                                    style={styles.reactionTypeContent}>
                                <View style={styles.descriptionContainer}>
                                    <View style={styles.perksContainer}>
                                        <images.svg.interactionsGIF height={24} width={24} style={{ marginRight: 16 }} />
                                        <images.svg.interactionsSticker height={24} width={24} style={{ marginRight: 16 }} />
                                        <images.svg.interactionsMemes height={24} width={24} />
                                    </View>
                                    <Text style={styles.reactionTitle}>
                                        Memes + TTS
                                    </Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <View style={styles.price}>
                                        <images.svg.interactionsNumberIcon height={16} width={16} />
                                        <MaskedView maskElement={
                                            <Text style={styles.priceNumber}>
                                                1
                                            </Text>
                                        }>
                                            <LinearGradient
                                                colors={['#FFD4FB', '#F5FFCB', '#82FFD2']}
                                                useAngle
                                                angle={227}>
                                                <Text style={[styles.priceNumber, { opacity: 0 }]}>
                                                    1
                                                </Text>
                                            </LinearGradient>
                                        </MaskedView>
                                    </View>
                                </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.reactionType}
                                onPress={() => this.changeReactionLevel(2)}>
                                <ImageBackground source={this.state.level2Gif ? {
                                            uri: this.state.level2Gif
                                        }
                                        :
                                        null
                                    }
                                    style={styles.reactionTypeContent}>
                                    <View style={styles.descriptionContainer}>
                                        <View style={styles.perksContainer}>
                                            <images.svg.arrowTopCircle height={24} width={24} style={{ marginRight: 16 }} />
                                            <images.svg.avatar height={24} width={24} style={{ marginRight: 16 }} />
                                            <images.svg.giphyText height={24} width={24} style={{ marginRight: 16 }} />
                                            <images.svg.volumeUp height={24} width={24} />
                                        </View>
                                        <Text style={styles.reactionTitle}>
                                            + Avatar{'\n'}3D Text, TTS Voice
                                        </Text>
                                    </View>
                                    <View style={styles.priceContainer}>
                                        <View style={styles.price}>
                                            <images.svg.qoin height={24} width={24} />
                                            {this.props.costs[1] !== undefined &&
                                                <MaskedView maskElement={
                                                    <Text style={styles.priceNumber}>
                                                        {this.props.costs[1] ?
                                                            this.props.costs[1]
                                                            :
                                                            'Free'
                                                        }
                                                    </Text>
                                                }>
                                                    <LinearGradient
                                                        colors={['#FFD4FB', '#F5FFCB', '#82FFD2']}
                                                        useAngle
                                                        angle={227}>
                                                        <Text style={[styles.priceNumber, { opacity: 0 }]}>
                                                            {this.props.costs[1] ?
                                                                this.props.costs[1]
                                                                :
                                                                'Free'
                                                            }
                                                        </Text>
                                                    </LinearGradient>
                                                </MaskedView>
                                            }
                                        </View>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.reactionType}
                                onPress={() => this.changeReactionLevel(3)}>
                                <ImageBackground source={this.state.level3Gif ? {
                                            uri: this.state.level3Gif
                                        }
                                        :
                                        null
                                    }
                                    style={styles.reactionTypeContent}>
                                <View style={styles.descriptionContainer}>
                                    <View style={styles.perksContainer}>
                                        <images.svg.arrowTopCircle height={24} width={24} style={{ marginRight: 16 }} />
                                        <Image source={{
                                                uri: this.props.randomEmoteUrl
                                            }}
                                            style={{ height: 24, width: 24 }} />
                                    </View>
                                    <Text style={styles.reactionTitle}>
                                        + Emote Animation
                                    </Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <View style={styles.price}>
                                        <images.svg.qoin height={24} width={24} />
                                        {this.props.costs[2] !== undefined &&
                                            <MaskedView maskElement={
                                                <Text style={styles.priceNumber}>
                                                    {this.props.costs[2] ?
                                                        this.props.costs[2]
                                                        :
                                                        'Free'
                                                    }
                                                </Text>
                                            }>
                                                <LinearGradient
                                                    colors={['#FFD4FB', '#F5FFCB', '#82FFD2']}
                                                    useAngle
                                                    angle={227}>
                                                    <Text style={[styles.priceNumber, { opacity: 0 }]}>
                                                        {this.props.costs[2] ?
                                                            this.props.costs[2]
                                                            :
                                                            'Free'
                                                        }
                                                    </Text>
                                                </LinearGradient>
                                            </MaskedView>
                                        }
                                    </View>
                                </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default ReactionTypeModal;