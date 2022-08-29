import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { translate } from '../../utilities/i18';
import styles from './style';
import images from '../../../assets/images';
import { GIPHY_GIFS, GIPHY_STICKERS, MEME, TTS } from '../../utilities/Constants';
import { getAllMediaTypeCosts } from '../../services/database';
import { trackOnSegment } from '../../services/statistics';
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
        trackOnSegment('Media Added After Media Selection', {
            MediaType: mediaType
        });

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
        trackOnSegment('Only Send TTS Without Media');

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