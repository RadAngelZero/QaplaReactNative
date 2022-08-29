import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native';

import styles from '../style';
import images from '../../../../assets/images';
import { GIPHY_CLIPS, GIPHY_GIFS, GIPHY_STICKERS, GIPHY_TEXT, MEME, TTS } from '../../../utilities/Constants';
import { getAllMediaTypeCosts, getReactionSample, getReactionsSamplesCount } from '../../../services/database';
import { translate } from '../../../utilities/i18';
import DeckButton from '../../../components/DeckButton/DeckButton';
import { heightPercentageToPx, widthPercentageToPx } from '../../../utilities/iosAndroidDim';
import { trackOnSegment } from '../../../services/statistics';

class PrepaidInteractionsPersonalize extends Component {
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
        videoContent: null
    };

    componentDidMount() {
        this.fetchCosts();
        this.fetchClipsSample();
        this.fetchGiphyTextSample();
    }

    fetchCosts = async () => {
        const costs = await getAllMediaTypeCosts();
        if (costs.exists()) {
            this.setState({ ...costs.val() });
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

        this.setState({ giphyTextSample: giphyTextSample.val(), dataFetched: true });
    }

    navigateToSelectedMedia = (mediaType) => {
        trackOnSegment('Media For Interaction Selected', {
            MediaType: mediaType
        });

        if (mediaType === MEME) {
            this.props.navigation.navigate('PrepaidInteractionsMemeSelector', {
                mediaType,
                ...this.props.navigation.state.params,
            });
        } else if (mediaType === GIPHY_TEXT) {
            this.props.navigation.navigate('PrepaidInteractionsInsertGiphyText', {
                showAddOnsOnCheckout: false,
                giphyTextSelectedFirst: true,
                ...this.props.navigation.state.params,
            });
        } else {
            this.props.navigation.navigate('PrepaidInteractionsGiphyMediaSelector', {
                showAddOnsOnCheckout: mediaType !== GIPHY_CLIPS,
                mediaType,
                ...this.props.navigation.state.params,
            });
        }
    }

    navigateToWriteMessage = () => {
        trackOnSegment('Media For Interaction Selected', {
            MediaType: 'TTS'
        });

        this.props.navigation.navigate('PrepaidInteractionsTTS', {
            ...this.props.navigation.state.params
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerConatiner}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.headerContainer}>
                            <Text style={[styles.whiteText, styles.screenHeaderText]}>
                                {translate('interactions.personalize.personalizeYourInteraction')}
                            </Text>
                            {/* <TouchableOpacity style={styles.helpButton}>
                            <images.svg.questionMark />
                        </TouchableOpacity> */}
                        </View>
                        <View style={[styles.prepaidReactionsContainer, styles.marginTop24]}>
                            <View style={styles.prepaidReactionsBody}>
                                <images.svg.interactions  />
                                <Text style={styles.reactionsText}>
                                    {`(${this.props.navigation.getParam('numberOfReactions', 0).toLocaleString()}) Reactions`}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.personalizeButtonsContainer}>
                            <DeckButton
                                onPress={() => this.navigateToSelectedMedia(GIPHY_GIFS)}
                                label="GIFs"
                                backgroundIndex={0}
                                icon={images.svg.interactionsGIF}
                                hideCost
                            />
                            <DeckButton
                                onPress={() => this.navigateToSelectedMedia(GIPHY_STICKERS)}
                                label="Sticker"
                                backgroundIndex={3}
                                icon={images.svg.interactionsSticker}
                                hideCost
                            />
                            <DeckButton
                                onPress={this.navigateToWriteMessage}
                                label="Text-to-Speech"
                                backgroundIndex={2}
                                icon={images.svg.interactionsTTS}
                                hideCost
                            />
                            <DeckButton
                                onPress={() => this.navigateToSelectedMedia(MEME)}
                                label="Memes"
                                backgroundIndex={5}
                                icon={images.svg.interactionsMemes}
                                hideCost
                            />
                        </View>
                        <View style={[styles.headerContainer, styles.headerMargins]}>
                            <Text style={[styles.whiteText, styles.screenHeaderText]}>
                                {translate('interactions.personalize.clips')}
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
                                {translate('interactions.personalize.giphyText')}
                            </Text>
                            {/* <TouchableOpacity style={styles.helpButton}>
                                <images.svg.questionMark />
                            </TouchableOpacity> */}
                        </View>
                        {this.state.dataFetched &&
                            <TouchableOpacity onPress={() => this.navigateToSelectedMedia(GIPHY_TEXT)} style={{
                                backgroundColor: this.state.giphyTextSample ? this.state.giphyTextSample.background : 'transparent',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                height: heightPercentageToPx(23.39),
                                borderRadius: 20,
                                overflow: 'hidden',
                            }}>
                                <Image
                                    source={this.state.giphyTextSample ? { uri: this.state.giphyTextSample.url } : null}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: widthPercentageToPx(100),
                                        height: heightPercentageToPx(15.6),
                                        borderRadius: 20,
                                        overflow: 'hidden',
                                    }}
                                    resizeMode="cover" />
                                    <View style={styles.personalizeButtonDisplayQoinsContainer}>
                                        <images.svg.qoin style={styles.qoin} />
                                        <Text style={styles.personalizeButtonDisplayQoinsText}>
                                            {this.state[GIPHY_TEXT]}
                                        </Text>
                                    </View>
                            </TouchableOpacity>
                        }
                        <View style={{ height: heightPercentageToPx(6.15) }} />
                    </ScrollView>
                </View>
            </View>
        );
    }

}

export default PrepaidInteractionsPersonalize;