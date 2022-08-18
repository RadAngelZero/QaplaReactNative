import React, { Component } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import styles from '../style';
import ConfirmSelectionModal from '../../../components/InteractionsModals/ConfirmSelectionModal';
import { getMediaTypeCost } from '../../../services/database';
import { GIPHY_CLIPS, MEME, TTS } from '../../../utilities/Constants';
import { heightPercentageToPx, widthPercentageToPx } from '../../../utilities/iosAndroidDim';
import { GiphyMediaView, GiphyVideoView } from '@giphy/react-native-sdk';

class PrepaidInteractionsConfirmSelection extends Component {
    state = {
        loadingMedia: this.props.navigation.getParam('mediaType') === MEME,
        mediaCost: null,
        muteClip: false,
        mediaType: null,
    };

    componentDidMount() {
        this.fetchMediaCost();
    }

    fetchMediaCost = async () => {
        const mediaType = this.props.navigation.getParam('mediaType');

        // The only type of media with a cost for pre paid reactions is the Giphy Clip
        if (mediaType === GIPHY_CLIPS) {
            const mediaType = this.props.navigation.getParam('mediaType');
            const cost = await getMediaTypeCost(mediaType);
            if (cost.exists()) {
                this.setState({ mediaCost: cost.val() });
            }
        } else {
            this.setState({ mediaCost: 0 });
        }
    }

    onConfirmSelection = async () => {
        const mediaType = this.props.navigation.getParam('mediaType');
        const message = this.props.navigation.getParam('message', '');
        this.setState({ muteClip: true });
        // If the user has already added TTS to their items then go directly to checkout
        // or if is a video clip
        if (message || mediaType === GIPHY_CLIPS) {
            this.props.navigation.navigate('PrepaidInteractionsCheckout', {
                ...this.props.navigation.state.params
            });
        } else {
            this.props.navigation.navigate('PrepaidInteractionsAddTTS', {
                ...this.props.navigation.state.params
            });
        }
    }

    onCancel = () => {
        this.props.navigation.goBack();
    }

    render() {
        const media = this.props.navigation.getParam('selectedMedia');
        const mediaType = this.props.navigation.getParam('mediaType');

        return (
            <View style={styles.container}>
                <View style={styles.interactionSelectedScreenContainer}>
                    <View style={styles.interactionSelectedBorderRadius}>
                        <ActivityIndicator size='large'
                            color="rgb(61, 249, 223)"
                            animating={this.state.loadingMedia} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
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

                    </View>
                </View>
                {/* Mute clip when user leave the screen */}
                <NavigationEvents onWillBlur={() => this.setState({ muteClip: true })} />
                {this.state.mediaCost !== null &&
                    <ConfirmSelectionModal mediaType={mediaType}
                        onConfirmSelection={this.onConfirmSelection}
                        onCancel={this.onCancel}
                        cost={this.state.mediaCost} />
                }
            </View>
        );
    }
}

export default PrepaidInteractionsConfirmSelection;