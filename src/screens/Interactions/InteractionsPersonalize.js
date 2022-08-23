import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import { GIPHY_CLIPS, GIPHY_GIFS, GIPHY_STICKERS, GIPHY_TEXT, MEME, TTS } from '../../utilities/Constants';
import { getAllMediaTypeCosts, getReactionSample, getReactionsSamplesCount } from '../../services/database';
import { translate } from '../../utilities/i18';
import DeckButton from '../../components/DeckButton/DeckButton';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import { trackOnSegment } from '../../services/statistics';

class InteractionsPersonalize extends Component {
    state = {
        [GIPHY_GIFS]: null,
        [GIPHY_STICKERS]: null,
        [GIPHY_TEXT]: null,
        [GIPHY_CLIPS]: null,
        [TTS]: null,
        [MEME]: null,
        clipsSample: null,
        giphyTextSample: null,
        dataFetched: false,
        videoContent: null,
    };

    componentDidMount() {
        this.fetchCosts();
        this.fetchClipsSample();
        this.fetchGiphyTextSample();
    }

    fetchCosts = async () => {
        const costs = await getAllMediaTypeCosts();
        if (costs.exists()) {
            this.setState({ ...costs.val(), dataFetched: true });
        }
    }

    fetchClipsSample = async () => {
        const clipsLength = await getReactionsSamplesCount(GIPHY_CLIPS);
        const index = Math.floor(Math.random() * clipsLength.val());
        const clipsSample = await getReactionSample(GIPHY_CLIPS, index);

        this.setState({ clipsSample: clipsSample.val() });
    }

    fetchGiphyTextSample = async () => {
        const clipsLength = await getReactionsSamplesCount(GIPHY_TEXT);
        const index = Math.floor(Math.random() * clipsLength.val());
        const giphyTextSample = await getReactionSample(GIPHY_TEXT, index);

        this.setState({ giphyTextSample: giphyTextSample.val() });
    }

    navigateToSelectedMedia = (mediaType) => {
        trackOnSegment('Media For Interaction Selected', {
            MediaType: mediaType
        });

        if (mediaType === MEME) {
            this.props.navigation.navigate('InteractionsMemeSelector', {
                mediaType,
                ...this.props.navigation.state.params,
            });
        } else if (mediaType === GIPHY_TEXT) {
            this.props.navigation.navigate('InteractionsInsertGiphyText', {
                ...this.props.navigation.state.params,
            });
        } else {
            this.props.navigation.navigate('InteractionsGiphyMediaSelector', {
                mediaType,
                ...this.props.navigation.state.params,
            });
        }
    }

    navigateToWriteMessage = () => {
        trackOnSegment('Media For Interaction Selected', {
            MediaType: 'TTS'
        });

        const costsObject = this.props.navigation.getParam('costs', {});
        this.props.navigation.navigate('InteractionsTTS', {
            ...this.props.navigation.state.params,
            costs: {
                [TTS]: this.state[TTS],
                ...costsObject
            }
        });
    }

    justSendQoins = () => {
        trackOnSegment('Only Send Qoins');

        // Send to only Qoins donation screen
        this.props.navigation.navigate('InteractionsCheckout', {
            ...this.props.navigation.state.params,
            onlyQoins: true
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerConatiner}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.headerContainer}>
                            <Text style={[styles.whiteText, styles.screenHeaderText]}>
                                {`${translate('interactions.personalize.personalizeYourInteraction')}`}
                            </Text>
                            {/* <TouchableOpacity style={styles.helpButton}>
                            <images.svg.questionMark />
                        </TouchableOpacity> */}
                        </View>
                        <View style={styles.personalizeButtonsContainer}>
                            {this.state.dataFetched &&
                                <>
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
                                        onPress={this.navigateToWriteMessage}
                                        label="Text-to-Speech"
                                        cost={this.state[TTS]}
                                        backgroundIndex={2}
                                        icon={images.svg.interactionsTTS}
                                    />
                                    <DeckButton
                                        onPress={() => this.navigateToSelectedMedia(MEME)}
                                        label="Memes"
                                        cost={this.state[MEME]}
                                        backgroundIndex={5}
                                        icon={images.svg.interactionsMemes}
                                    />
                                </>
                            }
                        </View>
                        <View style={[styles.headerContainer, styles.headerMargins]}>
                            <Text style={[styles.whiteText, styles.screenHeaderText]}>
                                {/* {`${translate('interactions.personalize.personalizeYourInteraction')}`} */}
                                {`Pre-made clips`}
                                {/* {`TTS Personalizado`} */}
                            </Text>
                            {/* <TouchableOpacity style={styles.helpButton}>
                            <images.svg.questionMark />
                        </TouchableOpacity> */}
                        </View>
                        {this.state.dataFetched &&
                            <TouchableOpacity onPress={() => this.navigateToSelectedMedia(GIPHY_CLIPS)}>
                                <ImageBackground
                                    source={this.state.clipsSample ? { uri: this.state.clipsSample } : null}
                                    style={{
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        // width: widthPercentageToPx(100),
                                        height: heightPercentageToPx(23.39),
                                        borderRadius: widthPercentageToPx(5.33),
                                        overflow: 'hidden',
                                    }}
                                    imageStyle={{
                                    }}
                                    resizeMode="cover"
                                >
                                    <View style={styles.personalizeButtonDisplayQoinsContainer}>
                                        <images.svg.qoin style={styles.qoin} />
                                        <Text style={styles.personalizeButtonDisplayQoinsText}>
                                            {this.state[GIPHY_CLIPS]}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        }
                        <View style={[styles.headerContainer, styles.headerMargins]}>
                            <Text style={[styles.whiteText, styles.screenHeaderText]}>
                                {/* {`${translate('interactions.personalize.personalizeYourInteraction')}`} */}
                                {`Custom TTS`}
                            </Text>
                            {/* <TouchableOpacity style={styles.helpButton}>
                                <images.svg.questionMark />
                            </TouchableOpacity> */}
                        </View>
                        <TouchableOpacity onPress={() => this.navigateToSelectedMedia(GIPHY_TEXT)}>
                            <ImageBackground
                                source={this.state.giphyTextSample ? { uri: this.state.giphyTextSample } : null}
                                style={{
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    // width: widthPercentageToPx(100),
                                    height: heightPercentageToPx(23.39),
                                    borderRadius: widthPercentageToPx(5.33),
                                    overflow: 'hidden',
                                }}
                                imageStyle={{
                                }}
                                resizeMode="cover">
                                <View style={styles.personalizeButtonDisplayQoinsContainer}>
                                    <images.svg.qoin style={styles.qoin} />
                                    <Text style={styles.personalizeButtonDisplayQoinsText}>
                                        {this.state[GIPHY_TEXT]}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                        <View style={{ height: heightPercentageToPx(6.15) }} />
                        {/* <View style={styles.onlySendQoinsContainer}>
                        <TouchableOpacity style={styles.onlySendQoinsTouchable}
                            onPress={this.justSendQoins}>
                            <Text style={[styles.semitransparentText, styles.onlySendQoinsText]}>
                                {`${translate('interactions.personalize.onlySend')} `}
                                <Text style={styles.whiteText}>
                                    Qoins
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View> */}
                    </ScrollView>
                </View>
            </View>
        );
    }

}

export default InteractionsPersonalize;