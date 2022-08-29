import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { translate } from '../../../utilities/i18.js';
import styles from '../style';
import images from '../../../../assets/images.js';
import { GIPHY_GIFS, GIPHY_STICKERS, MEME } from '../../../utilities/Constants';
import DeckButton from '../../../components/DeckButton/DeckButton';
import { trackOnSegment } from '../../../services/statistics.js';

class PrepaidInteractionsAddVisual extends Component {
    state = {
        [GIPHY_GIFS]: null,
        [GIPHY_STICKERS]: null,
        [MEME]: null,
        dataFetched: false
    };

    navigateToSelectedMedia = (mediaType) => {
        trackOnSegment('Media Added After Media Selection', {
            MediaType: mediaType
        });

        if (mediaType === MEME) {
            this.props.navigation.navigate('PrepaidInteractionsMemeSelector', {
                mediaType,
                ...this.props.navigation.state.params
            });
        } else {
            this.props.navigation.navigate('PrepaidInteractionsGiphyMediaSelector', {
                mediaType,
                ...this.props.navigation.state.params
            });
        }
    }

    justSendTTS = () => {
        trackOnSegment('Only Send TTS Without Media');

        this.props.navigation.navigate('PrepaidInteractionsCheckout', {
            ...this.props.navigation.state.params
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
                    <View style={styles.personalizeButtonsContainer}>
                        <DeckButton
                            onPress={() => this.navigateToSelectedMedia(GIPHY_GIFS)}
                            label="GIFs"
                            cost={this.state[GIPHY_GIFS]}
                            backgroundIndex={0}
                            hideCost
                            icon={images.svg.interactionsGIF}
                        />
                        <DeckButton
                            onPress={() => this.navigateToSelectedMedia(GIPHY_STICKERS)}
                            label="Sticker"
                            cost={this.state[GIPHY_STICKERS]}
                            backgroundIndex={3}
                            hideCost
                            icon={images.svg.interactionsSticker}
                        />
                        <DeckButton
                            onPress={() => this.navigateToSelectedMedia(MEME)}
                            label="Memes"
                            cost={this.state[MEME]}
                            backgroundIndex={5}
                            hideCost
                            icon={images.svg.interactionsMemes}
                        />
                    </View>
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

export default PrepaidInteractionsAddVisual;