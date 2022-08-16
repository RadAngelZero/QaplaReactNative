import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { translate } from '../../utilities/i18';
import styles from './style';
import images from '../../../assets/images';
import { GIPHY_GIFS, GIPHY_STICKERS, MEME, TTS } from '../../utilities/Constants';
import { getAllMediaTypeCosts } from '../../services/database';
import DeckButton from '../../components/DeckButton/DeckButton';

class InteractionsAddVisual extends Component {
    state = {
        [GIPHY_GIFS]: null,
        [GIPHY_STICKERS]: null,
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

    justSendTTS = () => {
        const costsObject = this.props.navigation.getParam('costs', {});
        this.props.navigation.navigate('InteractionsCheckout', {
            ...this.props.navigation.state.params,
            costs: {
                [TTS]: this.state.mediaCost,
                ...costsObject
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerConatiner}>
                    <View style={styles.headerContainer}>
                        <Text style={[styles.whiteText, styles.screenHeaderText, styles.headerMaxWidth, styles.addVisualHeaderMaxWidth]}>
                            {`${translate('interactions.addVisual.addVisual')}`}
                        </Text>
                    </View>
                    {this.state.dataFetched &&
                        <View style={styles.personalizeButtonsContainer}>
                            <DeckButton
                                onPress={() => this.navigateToSelectedMedia(GIPHY_GIFS)}
                                label="GIFs"
                                cost={this.state[GIPHY_GIFS]}
                                backgroundIndex={0}
                                icon={images.svg.interactionsGIF}
                            />
                            <DeckButton
                                onPress={() => this.navigateToSelectedMedia(GIPHY_STICKERS)}
                                label="Sticker"
                                cost={this.state[GIPHY_STICKERS]}
                                backgroundIndex={3}
                                icon={images.svg.interactionsSticker}
                            />
                            <DeckButton
                                onPress={() => this.navigateToSelectedMedia(MEME)}
                                label="Memes"
                                cost={this.state[MEME]}
                                backgroundIndex={5}
                                icon={images.svg.interactionsMemes}
                            />
                            {/* <TouchableOpacity
                                onPress={() => console.log('c')}
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
                        </View>
                    }
                </View>
                <View style={[styles.onlySendQoinsContainer, styles.onlySendTTS]}>
                    <TouchableOpacity style={styles.onlySendQoinsTouchable}
                        onPress={this.justSendTTS}
                    >
                        <Text style={[styles.semitransparentText, styles.onlySendQoinsText]}>
                            {`${translate('interactions.addTTS.onlySendMy')} `}
                            <Text style={styles.whiteText}>
                                TTS
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

export default InteractionsAddVisual;