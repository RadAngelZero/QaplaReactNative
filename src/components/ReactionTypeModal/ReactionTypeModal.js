import React, { Component } from 'react';
import { Image, ImageBackground, Modal, Text, TouchableOpacity, View } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import images from './../../../assets/images';

class ReactionTypeModal extends Component {

    changeReactionLevel = (level) => {
        this.props.changeReactionLevel(level);
        this.props.onClose();
    }

    render() {
        return (
            <Modal visible={this.props.open}
                onRequestClose={this.props.onClose}
                onShow={() => this.setState({ selectedVoice: this.props.currentVoice ? this.props.currentVoice.key : null })}
                animationType='slide'
                transparent>
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <View style={styles.titleRow}>
                            <TouchableOpacity onPress={this.props.onClose}
                                style={styles.closeIcon}>
                                <images.svg.closeIcon />
                            </TouchableOpacity>
                            <Text style={styles.title}>
                                Choose your reaction
                            </Text>
                            {/* Trick to center text */}
                            <View style={[styles.closeIcon, { opacity: 0 }]}>
                                <images.svg.closeIcon />
                            </View>
                        </View>
                        <View style={styles.reactionsContainer}>
                            <TouchableOpacity style={styles.reactionType}
                                onPress={() => this.changeReactionLevel(1)}>
                                <ImageBackground source={{
                                    uri: ''
                                }} style={styles.reactionTypeContent}>
                                <View style={styles.descriptionContainer}>
                                    <View style={styles.perksContainer}>
                                        <images.svg.interactionsGIF height={24} width={24} style={{ marginRight: 16 }} />
                                        <images.svg.interactionsSticker height={24} width={24} style={{ marginRight: 16 }} />
                                        <images.svg.interactionsMemes height={24} width={24} />
                                    </View>
                                    <Text style={styles.reactionTitle}>
                                        Use channel points
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
                                <ImageBackground source={{
                                    uri: ''
                                }} style={styles.reactionTypeContent}>
                                <View style={styles.descriptionContainer}>
                                    <View style={styles.perksContainer}>
                                        <images.svg.avatar height={24} width={24} style={{ marginRight: 16 }} />
                                        <images.svg.giphyText height={24} width={24} style={{ marginRight: 16 }} />
                                        <images.svg.volumeUp height={24} width={24} />
                                    </View>
                                    <Text style={styles.reactionTitle}>
                                        + Avatar, 3D Text
                                    </Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <View style={styles.price}>
                                        <images.svg.qoin height={16} width={16} />
                                        <MaskedView maskElement={
                                            <Text style={styles.priceNumber}>
                                                {this.props.costs[1]}
                                            </Text>
                                        }>
                                            <LinearGradient
                                                colors={['#FFD4FB', '#F5FFCB', '#82FFD2']}
                                                useAngle
                                                angle={227}>
                                                <Text style={[styles.priceNumber, { opacity: 0 }]}>
                                                    {this.props.costs[1]}
                                                </Text>
                                            </LinearGradient>
                                        </MaskedView>
                                    </View>
                                </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.reactionType}
                                onPress={() => this.changeReactionLevel(3)}>
                                <ImageBackground source={{
                                    uri: ''
                                }} style={styles.reactionTypeContent}>
                                <View style={styles.descriptionContainer}>
                                    <View style={styles.perksContainer}>
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
                                        <images.svg.qoin height={16} width={16} />
                                        <MaskedView maskElement={
                                            <Text style={styles.priceNumber}>
                                                {this.props.costs[2]}
                                            </Text>
                                        }>
                                            <LinearGradient
                                                colors={['#FFD4FB', '#F5FFCB', '#82FFD2']}
                                                useAngle
                                                angle={227}>
                                                <Text style={[styles.priceNumber, { opacity: 0 }]}>
                                                    {this.props.costs[2]}
                                                </Text>
                                            </LinearGradient>
                                        </MaskedView>
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