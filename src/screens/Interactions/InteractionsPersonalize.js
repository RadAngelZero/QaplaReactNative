import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import { getScreenSizeMultiplier, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim'
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

    render() {
        const userHasSelectedTTS = Boolean(this.props.navigation.getParam('message', null));

        return (
            <SafeAreaView style={[styles.container, { paddingHorizontal: 16 * getScreenSizeMultiplier()}]}>
                <View style={{
                    flex: 1,
                    maxHeight: heightPercentageToPx(90),
                    justifyContent: 'space-between'
                }}>
                    <View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 22,
                                fontWeight: '600',
                                lineHeight: 32,
                                maxWidth: widthPercentageToPx(61.6)
                            }}>
                                {!userHasSelectedTTS ?
                                    'Personaliza tu interacción'
                                    :
                                    'Agrega un Gif, Sticker o Meme a tu interacción'
                                }
                            </Text>
                            {!userHasSelectedTTS &&
                                <TouchableOpacity style={{
                                    backgroundColor: '#22272F',
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 10,
                                }}>
                                    <images.svg.questionMark />
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            marginTop: 8,
                        }}>
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
                                {!userHasSelectedTTS &&
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
                                }
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
                    </View>
                    <View style={{
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity style={{
                            display: 'flex',
                            alignSelf: 'center',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                        }}
                        onPress={!userHasSelectedTTS ? this.justSendQoins : this.justSendTTS}>
                            <Text style={{
                                color: '#FFFFFF99',
                                fontSize: 16,
                                fontWeight: '500',
                                lineHeight: 28,
                                letterSpacing: 1,
                            }}>
                                {'Sólo enviar' + (!userHasSelectedTTS ? ' ' : ' mi ')}
                                {!userHasSelectedTTS ?
                                    <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>
                                        Qoins
                                    </Text>
                                    :
                                    <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>
                                        TTS
                                    </Text>
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

}

export default InteractionsPersonalize;