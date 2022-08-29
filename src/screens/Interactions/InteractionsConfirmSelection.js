import React, { Component } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import styles from './style';
import ConfirmSelectionModal from '../../components/InteractionsModals/ConfirmSelectionModal';
import { getMediaTypeCost } from '../../services/database';
import { GIPHY_CLIPS, GIPHY_TEXT, MEME } from '../../utilities/Constants';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import { GiphyMediaView, GiphyVideoView } from '@giphy/react-native-sdk';

class InteractionsConfirmSelection extends Component {
    state = {
        loadingMedia: this.props.navigation.getParam('mediaType', '') === MEME || Object.keys(this.props.navigation.getParam('giphyText', {})).length,
        mediaCost: null,
        muteClip: false,
        mediaType: null,
        fetchingMedia: false
    };

    componentDidMount() {
        this.fetchMediaCost();
    }

    fetchMediaCost = async () => {
        const mediaType = this.props.navigation.getParam('mediaType');
        const giphyText = this.props.navigation.getParam('giphyText', null);
        const cost = await getMediaTypeCost(giphyText ? GIPHY_TEXT : mediaType);

        if (cost.exists()) {
            this.setState({ mediaCost: cost.val(), fetchingMedia: false });
        }
    }

    onConfirmSelection = async () => {
        const mediaType = this.props.navigation.getParam('mediaType');
        const message = this.props.navigation.getParam('message', '');
        const giphyText = this.props.navigation.getParam('giphyText', null);
        const costsObject = this.props.navigation.getParam('costs', {});
        this.setState({ muteClip: true });
        // If the user has already added TTS
        // or if the media is a video clip
        // or if the media is Giphy Text
        // Then go directly to checkout
        if (message || mediaType === GIPHY_CLIPS || giphyText) {
            const text = this.props.navigation.getParam('text', '');
            const giphyTextData = giphyText ? { message: text } : {};

            this.props.navigation.navigate('InteractionsCheckout', {
                ...giphyTextData,
                ...this.props.navigation.state.params,
                costs: {
                    [giphyText ? GIPHY_TEXT : mediaType]: this.state.mediaCost,
                    ...costsObject
                }
            });
        } else {
            this.props.navigation.navigate('InteractionsAddTTS', {
                ...this.props.navigation.state.params,
                costs: {
                    [mediaType]: this.state.mediaCost,
                    ...costsObject
                }
            });
        }
    }

    onCancel = () => {
        this.props.navigation.goBack();
    }

    render() {
        const media = this.props.navigation.getParam('selectedMedia');
        const mediaType = this.props.navigation.getParam('mediaType');
        const giphyText = this.props.navigation.getParam('giphyText', null);

        return (
            <View style={styles.container}>
                <View style={styles.interactionSelectedScreenContainer}>
                    <View style={styles.interactionSelectedBorderRadius}>
                        <ActivityIndicator size='large'
                            color="rgb(61, 249, 223)"
                            animating={Boolean(this.state.loadingMedia).valueOf()} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
                        {giphyText ?
                            <Image
                                onLoadEnd={() => this.setState({ loadingMedia: false })}
                                source={{ uri: giphyText.original.url }}
                                style={[styles.interactionSelectedConatiner, {
                                    opacity: this.state.loadingMedia ? 0 : 1,
                                    aspectRatio: giphyText.original.width / giphyText.original.height,
                                },
                                giphyText.original.width >= giphyText.original.height ?
                                    {
                                        width: widthPercentageToPx(80),
                                    }
                                    :
                                    {
                                        height: heightPercentageToPx(40),
                                    },
                                ]}
                                resizeMode="contain" />
                            :
                            <>
                            {mediaType === MEME ?
                                <Image
                                    onLoadEnd={() => this.setState({ loadingMedia: false })}
                                    source={{ uri: media.original.url }}
                                    style={[styles.interactionSelectedConatiner, {
                                        opacity: this.state.loadingMedia ? 0 : 1,
                                        aspectRatio: media.original.width / media.original.height,
                                    },
                                    media.original.width >= media.original.height ?
                                        {
                                            width: widthPercentageToPx(80),
                                        }
                                        :
                                        {
                                            height: heightPercentageToPx(40),
                                        },
                                    ]}
                                    resizeMode="contain" />
                                :
                                mediaType === GIPHY_CLIPS ?
                                    <GiphyVideoView
                                        muted={this.state.muteClip}
                                        onMute={() => this.setState({ muteClip: true })}
                                        onUnmute={() => this.setState({ muteClip: false })}
                                        autoPlay
                                        media={media}
                                        showCheckeredBackground={false}
                                        style={[{
                                            aspectRatio: media.aspectRatio,
                                        },
                                        media.aspectRatio > 1 ?
                                            {
                                                width: widthPercentageToPx(80),
                                            }
                                            :
                                            {
                                                height: heightPercentageToPx(40),
                                            },
                                        ]}
                                    />
                                    :
                                    <GiphyMediaView
                                        media={media}
                                        showCheckeredBackground={false}
                                        style={[{
                                            aspectRatio: media.aspectRatio,
                                        },
                                        media.aspectRatio > 1 ?
                                            {
                                                width: widthPercentageToPx(80),
                                            }
                                            :
                                            {
                                                height: heightPercentageToPx(40),
                                            },
                                        ]}
                                    />
                            }
                            </>
                        }

                    </View>
                </View>
                {/* Mute clip when user leave the screen */}
                <NavigationEvents onWillFocus={this.fetchMediaCost}
                    onWillBlur={() => this.setState({ muteClip: true, fetchingMedia: true })} />
                {this.state.mediaCost !== null && !this.state.fetchingMedia &&
                    <ConfirmSelectionModal mediaType={giphyText ? GIPHY_TEXT : mediaType}
                        onConfirmSelection={this.onConfirmSelection}
                        onCancel={this.onCancel}
                        cost={this.state.mediaCost} />
                }
            </View>
        );
    }
}

export default InteractionsConfirmSelection;