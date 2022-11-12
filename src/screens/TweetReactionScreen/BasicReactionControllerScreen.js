import React, { Component } from 'react';
import { connect } from 'react-redux';

import TweetReactionScreen from './TweetReactionScreen';
import { getStreamerEmotes, getUserToStreamerRelationData } from '../../services/functions';
import { GIPHY_GIFS, GIPHY_STICKERS, MEME } from '../../utilities/Constants';
import GiphyMediaSelectorModal from '../../components/GiphyMediaSelectorModal/GiphyMediaSelectorModal';
import QaplaMemeSelectorModal from '../../components/QaplaMemeSelectorModal/QaplaMemeSelectorModal';
import { getRecentStreamersDonations, getStreamerPublicData, getUserReactionsCount, isUserBannedWithStreamer, sendReaction } from '../../services/database';
import { retrieveData, storeData } from '../../utilities/persistance';
import { trackOnSegment } from '../../services/statistics';
import SentModal from '../../components/SentModal/SentModal';

class BasicReactionControllerScreen extends Component {
    state = {
        sending: false,
        message: '',
        emotes: [],
        randomEmoteUrl: '',
        userSubscriptionTier: undefined,
        openGiphyModal: false,
        openMemeModal: false,
        modalMediaType: GIPHY_GIFS,
        mediaType: GIPHY_GIFS,
        selectedMedia: null,
        extraTip: 0,
        openSentModal: false,
        numberOfReactions: undefined,
        streamerData: {
            streamerUid: '',
            streamerImage: '',
            stramerName: ''
        }
    };

    componentDidMount() {
        this.fetchInitialData();
    }

    fetchInitialData = async () => {
        await this.fetchStreamerData(() => {
            /* this.fetchUserSubscription();
            this.fetchStreamerEmotes();
            this.fetchNumberOfReactions(); */
        });
    }

    fetchStreamerData = async (onFinished) => {
        // User may come from a profile, with the data already loaded
        const streamerUid = this.props.navigation.getParam('streamerUid', null);
        if (streamerUid) {
            const streamerImage = this.props.navigation.getParam('streamerImage', 'https://static-cdn.jtvnw.net/jtv_user_pictures/aefc7460-f43e-4491-9658-74b80bf006c9-profile_image-300x300.png');
            const stramerName = this.props.navigation.getParam('stramerName', 'mr_yuboto');
            this.setState({
                streamerData: {
                    streamerUid,
                    streamerImage,
                    stramerName
                }
            }, onFinished);
        } else {
            if (this.props.uid) {
                // If we have no data then we get their most recent donation
                const lastDonationStreamer = await getRecentStreamersDonations(this.props.uid, 1);
                if (lastDonationStreamer.exists()) {
                    let streamerKey = '';
                    lastDonationStreamer.forEach((streamer) => streamerKey = streamer.key );
                    const streamerData = await getStreamerPublicData(streamerKey);
                    this.setState({
                        streamerData: {
                            streamerUid: streamerKey,
                            streamerImage: streamerData.val().photoUrl,
                            stramerName: streamerData.val().displayName
                        }
                    }, onFinished);
                }
            }
        }
    }

    fetchStreamerEmotes = async () => {
        if (this.state.streamerData.streamerUid) {
            const emotesRequest = await getStreamerEmotes(this.state.streamerData.streamerUid);
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
        const relationData = await getUserToStreamerRelationData(this.props.twitchId, this.state.streamerData.streamerUid);
        this.setState({ userSubscriptionTier: relationData.data ? relationData.data.subscriptionTier : null });
    }

    fetchNumberOfReactions = async () => {
        if (this.props.uid) {
            const numberOfReactions = await getUserReactionsCount(this.props.uid, this.state.streamerData.streamerUid);
            if (numberOfReactions.val()) {
                this.setState({ numberOfReactions: numberOfReactions.val() });
            } else {
                const freeReactionsSent = await retrieveData('freeReactionsSent');
                if (!freeReactionsSent) {
                    const hasUserReactedBefore = await getRecentStreamersDonations(this.props.uid);
                    this.setState({ numberOfReactions: hasUserReactedBefore.exists() ? 0 : 1 });
                } else {
                    this.setState({ numberOfReactions: 0 });
                }
            }
        } else {
            const freeReactionsSent = await retrieveData('freeReactionsSent');
            this.setState({ numberOfReactions: !freeReactionsSent ? 1 : 0 });
        }
    }

    onSendReaction = () => {
        if (!this.state.sending) {
            this.setState({ sending: true }, async () => {
                /**
                 * New users have one reaction for free
                 */
                const freeReactionsSent = await retrieveData('freeReactionsSent');

                if (this.state.numberOfReactions) {
                    const isUserBanned = await isUserBannedWithStreamer(this.props.twitchId, this.state.streamerData.streamerUid);
                    if (!isUserBanned.exists()) {

                        const userQoins = this.props.qoins ?? 0;
                        if (this.state.extraTip <= userQoins) {

                            sendReaction(
                                this.props.uid ?? 'Anonymus',
                                this.props.userName ?? '',
                                this.props.twitchUserName ?? '',
                                this.props.photoUrl ?? '',
                                this.state.streamerData.streamerUid,
                                this.state.streamerData.stramerName,
                                this.state.selectedMedia ?
                                    {
                                        ...this.state.selectedMedia.data.images.original,
                                        type: this.state.mediaType
                                    }
                                    :
                                    {},
                                this.state.message,
                                {}, // No extra data
                                {}, // No emote/emoji rain
                                this.state.extraTip,
                                this.props.avatarId,
                                this.props.avatarBackground,
                                () => {
                                    trackOnSegment('Pre Paid Interaction Sent', {
                                        MessageLength: this.state.message ? this.state.message.length : null,
                                        MediaType: this.state.mediaType,
                                        Media: this.state.selectedMedia ? true : false,
                                        ExtraTip: this.state.extraTip,
                                        StreamerUid: this.state.streamerData.streamerUid,
                                        StreamerName: this.state.streamerData.stramerName,
                                        freeReaction: !freeReactionsSent
                                    });

                                    if (!this.props.uid) {
                                        storeData('freeReactionsSent', 'true');
                                    }

                                    this.setState({ openSentModal: true });
                                },
                                () => this.setState({ sending: false })
                            );
                        } else {
                            this.setState({ sending: false });

                            if (!this.props.uid) {
                                this.props.navigation.navigate('SignIn');
                            } else {
                                // After a successful buy try to send the reaction again
                                this.props.navigation.navigate('BuyQoins', { onSuccessfulBuy: this.onSendReaction });
                            }
                        }
                    }
                } else {
                    this.setState({ sending: false });
                    this.props.navigation.navigate('SignIn');
                }
            });
        }
    }

    onMediaOptionPress = (mediaType) => {
        switch (mediaType) {
            case GIPHY_GIFS:
            case GIPHY_STICKERS:
                this.setState({ openGiphyModal: true, modalMediaType: mediaType });
                break;
            case MEME:
                this.setState({ openMemeModal: true, modalMediaType: mediaType });
                break;
            default:
                break;
        }
    }

    onMediaSelect = (selectedMedia, mediaType) => {
        this.setState({
            openMemeModal: false,
            openGiphyModal: false,
            selectedMedia,
            mediaType
        });
    }

    render() {
        return (
            <>
            <TweetReactionScreen onSend={this.onSendReaction}
                sending={this.state.sending}
                mediaSelectorBarOptions={[
                    GIPHY_GIFS,
                    GIPHY_STICKERS,
                    MEME
                ]}
                numberOfReactions={this.state.numberOfReactions}
                message={this.state.message}
                onMessageChanged={(message) => this.setState({ message })}
                onMediaOptionPress={this.onMediaOptionPress}
                randomEmoteUrl={this.state.randomEmoteUrl}
                mediaType={this.state.mediaType}
                selectedMedia={this.state.selectedMedia}
                cleanSelectedMedia={() => this.setState({ selectedMedia: null })}
                extraTip={this.state.extraTip}
                setExtraTip={(extraTip) => this.setState({ extraTip })}
                streamerImage={this.state.streamerData.streamerImage}
                streamerUid={this.state.streamerData.streamerUid}
                onCancel={() => this.props.navigation.dismiss()} />
            <GiphyMediaSelectorModal open={this.state.openGiphyModal}
                onClose={() => this.setState({ openGiphyModal: false })}
                mediaType={this.state.modalMediaType}
                onMediaSelect={this.onMediaSelect} />
            <QaplaMemeSelectorModal open={this.state.openMemeModal}
                onClose={() => this.setState({ openMemeModal: false })}
                onMediaSelect={this.onMediaSelect} />
            <SentModal open={this.state.openSentModal}
                onClose={() => this.setState({ openSentModal: false })}
                displayName={this.state.streamerData.stramerName} />
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        avatarBackground: state.userReducer.user.avatarBackground,
        avatarId: state.userReducer.user.avatarId,
        userName: state.userReducer.user.userName,
        twitchUserName: state.userReducer.user.twitchUsername,
        photoUrl: state.userReducer.user.photoUrl,
        qoins: state.userReducer.user.credits,
        twitchId: state.userReducer.user.twitchId
    };
}

export default connect(mapStateToProps)(BasicReactionControllerScreen);