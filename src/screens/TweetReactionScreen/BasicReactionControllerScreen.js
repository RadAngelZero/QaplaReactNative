import React, { Component } from 'react';

import TweetReactionScreen from './TweetReactionScreen';
import { getStreamerEmotes, getUserToStreamerRelationData } from '../../services/functions';
import { GIPHY_GIFS, GIPHY_STICKERS, MEME } from '../../utilities/Constants';
import GiphyMediaSelectorModal from '../../components/GiphyMediaSelectorModal/GiphyMediaSelectorModal';
import QaplaMemeSelectorModal from '../../components/QaplaMemeSelectorModal/QaplaMemeSelectorModal';

class BasicReactionControllerScreen extends Component {
    state = {
        sending: false,
        message: '',
        emotes: [],
        randomEmoteUrl: '',
        userSubscriptionTier: undefined,
        openGiphyModal: false,
        openMemeModal: false,
        mediaType: GIPHY_GIFS,
        selectedMedia: null,
        extraTip: 0
    };

    componentDidMount() {
        /* this.fetchUserSubscription();
        this.fetchStreamerEmotes(); */
    }

    fetchStreamerEmotes = async () => {
        const streamerUid = this.props.navigation.getParam('streamerUid', null);

        if (streamerUid) {
            const emotesRequest = await getStreamerEmotes(streamerUid);
            const emotes = emotesRequest.data ? emotesRequest.data : null;
            if (emotes) {
                // Find the first array who has more than 0 elements
                const array = emotes.find((typeOfEmote) => typeOfEmote.data[0].length > 0);
                const randomNumber = Math.floor(Math.random() * array.data[0].length);

                this.setState({ randomEmoteUrl: array.data[0][randomNumber].images.url_1x });
            }

            this.setState({ emotes });
        }
    }

    fetchUserSubscription = async () => {
        const streamerUid = this.props.navigation.getParam('streamerUid', null);

        const relationData = await getUserToStreamerRelationData(this.props.twitchId, streamerUid);
        this.setState({ userSubscriptionTier: relationData.data ? relationData.data.subscriptionTier : null });
    }

    onSendReaction = () => {
        if (!this.state.sending) {
            this.setState({ sending: true });
        }
    }

    onMediaOptionPress = (type) => {
        switch (type) {
            case GIPHY_GIFS:
            case GIPHY_STICKERS:
                this.setState({ openGiphyModal: true, mediaType: type });
                break;
            case MEME:
                this.setState({ openMemeModal: true, mediaType: type });
                break;
            default:
                break;
        }
    }

    onDisabledMediaOptionPress = (type) => {
        console.log('dis', type);
    }

    onMediaSelect = (selectedMedia) => {
        this.setState({
            openMemeModal: false,
            openGiphyModal: false,
            selectedMedia
        });
    }

    render() {
        return (
            <>
            <TweetReactionScreen onSend={this.onSendReaction}
                mediaSelectorBarOptions={[
                    GIPHY_GIFS,
                    GIPHY_STICKERS,
                    MEME
                ]}
                message={this.state.message}
                onMessageChanged={(message) => this.setState({ message })}
                onMediaOptionPress={this.onMediaOptionPress}
                onDisabledMediaOptionPress={this.onDisabledMediaOptionPress}
                randomEmoteUrl={this.state.randomEmoteUrl}
                mediaType={this.state.mediaType}
                selectedMedia={this.state.selectedMedia}
                cleanSelectedMedia={() => this.setState({ selectedMedia: null })}
                extraTip={this.state.extraTip}
                setExtraTip={(extraTip) => this.setState({ extraTip })}
                streamerImage='https://static-cdn.jtvnw.net/jtv_user_pictures/d5316bfd-54d9-4de8-ac24-3f62292527c1-profile_image-300x300.png' />
            <GiphyMediaSelectorModal open={this.state.openGiphyModal}
                onClose={() => this.setState({ openGiphyModal: false })}
                mediaType={this.state.mediaType}
                onMediaSelect={this.onMediaSelect} />
            <QaplaMemeSelectorModal open={this.state.openMemeModal}
                onClose={() => this.setState({ openMemeModal: false })}
                onMediaSelect={this.onMediaSelect} />
            </>
        );
    }
}

export default BasicReactionControllerScreen;