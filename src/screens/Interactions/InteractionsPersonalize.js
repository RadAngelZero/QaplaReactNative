import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import { GIPHY_GIFS, GIPHY_STICKERS, MEME, TTS } from '../../utilities/Constants';
import { getAllMediaTypeCosts } from '../../services/database';

class InteractionsPersonalize extends Component {
    state = {
        [GIPHY_GIFS]: null,
        [GIPHY_STICKERS]: null,
        [TTS]: null,
        [MEME]: null,
        dataFetched: false
    };

    componentDidMount() {
        this.fetchCosts();
    }

    fetchCosts = async () => {
        const costs = await getAllMediaTypeCosts();
        if (costs.exists()) {
            this.setState({ ...costs.val(), dataFetched: true });
        }
    }

    navigateToSelectedMedia = (mediaType) => {
        if (mediaType === MEME) {
            this.props.navigation.navigate('InteractionsMemeSelector', {
                mediaType,
                ...this.props.navigation.state.params
            });
        } else {
            this.props.navigation.navigate('InteractionsGiphyMediaSelector', {
                mediaType,
                ...this.props.navigation.state.params
            });
        }
    }

    navigateToWriteMessage = () => {
        const costsObject = this.props.navigation.getParam('costs', {});
        this.props.navigation.navigate('InteractionsTTS', {
            costs: {
                [TTS]: this.state.TTSCost,
                ...costsObject
            }
        });
    }

    justSendTTS = () => {
        this.props.navigation.navigate('InteractionsCheckout', {
            ...this.props.navigation.state.params
        });
    }

    justSendQoins = () => {
        // Send to only Qoins donation screen
        this.props.navigation.navigate('InteractionsCheckout', {
            donationBase: 50,
            ...this.props.navigation.state.params
        });
    }

    tts = () => {
        this.props.navigation.navigate('InteractionsTTS', { messageCost: this.state.TTSCost });
    }

    onlyQoins = () => {
        this.props.navigation.navigate('InteractionsCheckout', { onlyQoins: true });
    }

    render() {
        const userHasSelectedTTS = Boolean(this.props.navigation.getParam('message', null));

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.innerConatiner}>
                    <View style={styles.headerContainer}>
                        <Text style={[styles.whiteText, styles.screenHeaderText]}>
                            Personaliza tu interacción
                        </Text>
                        <TouchableOpacity style={styles.helpButton}>
                            <images.svg.questionMark />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.personalizeButtonsContainer}>
                        {this.state.dataFetched &&
                            <>
                            <TouchableOpacity
                                onPress={() => this.navigateToSelectedMedia(GIPHY_GIFS)}
                                style={styles.personalizeButtonContainer}
                            >
                                <ImageBackground
                                    source={images.png.InteractionGradient1.img}
                                    style={styles.personalizeButtonBackgroundImage}
                                >
                                    <View style={styles.personalizeButtonIconContainer}>
                                        <images.svg.interactionsGIF />
                                    </View>
                                    <Text style={styles.personalizeButtonIconText} >
                                        GIFs
                                    </Text>
                                    <View style={styles.personalizeButtonDisplayQoinsContainer}>
                                        <images.svg.qoin style={styles.qoin} />
                                        <Text style={styles.personalizeButtonDisplayQoinsText}>
                                            {this.state[GIPHY_GIFS]}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.navigateToSelectedMedia(GIPHY_STICKERS)}
                                style={styles.personalizeButtonContainer}
                            >
                                <ImageBackground
                                    source={images.png.InteractionGradient4.img}
                                    style={styles.personalizeButtonBackgroundImage}
                                >
                                    <View style={styles.personalizeButtonIconContainer}>
                                        <images.svg.interactionsSticker />
                                    </View>
                                    <Text style={styles.personalizeButtonIconText} >
                                        Sticker
                                    </Text>
                                    <View style={styles.personalizeButtonDisplayQoinsContainer}>
                                        <images.svg.qoin style={styles.qoin} />
                                        <Text style={styles.personalizeButtonDisplayQoinsText}>
                                            {this.state[GIPHY_STICKERS]}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                                onPress={() => this.navigateToSelectedMedia(GIPHY_CLIPS)}
                                style={styles.personalizeButtonContainer}
                            >
                                <ImageBackground
                                    source={images.png.InteractionGradient2.img}
                                    style={styles.personalizeButtonBackgroundImage}
                                >
                                    <View style={styles.personalizeButtonIconContainer}>
                                        <images.svg.interactionsClip />
                                    </View>
                                    <Text style={styles.personalizeButtonIconText} >
                                        Clips
                                    </Text>
                                    <View style={styles.personalizeButtonDisplayQoinsContainer}>
                                        <images.svg.qoin style={styles.qoin} />
                                        <Text style={styles.personalizeButtonDisplayQoinsText}>
                                            {this.state.ClipsCost}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity> */}
                            {/* <TouchableOpacity
                                onPress={() => console.log('d')}
                                style={styles.personalizeButtonContainer}
                            >
                                <ImageBackground
                                    source={images.png.InteractionGradient5.img}
                                    style={styles.personalizeButtonBackgroundImage}
                                >
                                    <View style={styles.personalizeButtonIconContainer}>
                                        <images.svg.interactionsTtGiphy />
                                    </View>
                                    <Text style={styles.personalizeButtonIconText} >
                                        Texto Giphy
                                    </Text>
                                    <View style={styles.personalizeButtonDisplayQoinsContainer}>
                                        <images.svg.qoin style={styles.qoin} />
                                        <Text style={styles.personalizeButtonDisplayQoinsText}>
                                            {'50'}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                onPress={this.navigateToWriteMessage}
                                style={styles.personalizeButtonContainer}
                            >
                                <ImageBackground
                                    source={images.png.InteractionGradient3.img}
                                    style={styles.personalizeButtonBackgroundImage}
                                >
                                    <View style={styles.personalizeButtonIconContainer}>
                                        <images.svg.interactionsTTS />
                                    </View>
                                    <Text style={styles.personalizeButtonIconText} >
                                        Text-to-Speech
                                    </Text>
                                    <View style={styles.personalizeButtonDisplayQoinsContainer}>
                                        <images.svg.qoin style={styles.qoin} />
                                        <Text style={styles.personalizeButtonDisplayQoinsText}>
                                            {this.state[TTS]}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.navigateToSelectedMedia(MEME)}
                                style={styles.personalizeButtonContainer}
                            >
                                <ImageBackground
                                    source={images.png.InteractionGradient6.img}
                                    style={styles.personalizeButtonBackgroundImage}
                                >
                                    <View style={styles.personalizeButtonIconContainer}>
                                        <images.svg.interactionsMemes />
                                    </View>
                                    <Text style={styles.personalizeButtonIconText} >
                                        Memes
                                    </Text>
                                    <View style={styles.personalizeButtonDisplayQoinsContainer}>
                                        <images.svg.qoin style={styles.qoin} />
                                        <Text style={styles.personalizeButtonDisplayQoinsText}>
                                            {this.state[MEME]}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            </>
                        }
                    </View>
                    <View style={styles.onlySendQoinsContainer}>
                        <TouchableOpacity style={styles.onlySendQoinsTouchable}
                            onPress={this.justSendQoins}>
                            <Text style={[styles.semitransparentText, styles.onlySendQoinsText]}>
                                {'Sólo enviar' + ' '}
                                <Text style={styles.whiteText}>
                                    Qoins
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

}

export default InteractionsPersonalize;