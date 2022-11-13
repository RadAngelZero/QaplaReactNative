import React, { Component } from 'react';
import { connect } from 'react-redux';

import TweetReactionScreen from './TweetReactionScreen';
import { getStreamerEmotes } from '../../services/functions';
import { AVATAR, GIPHY_GIFS, GIPHY_STICKERS, GIPHY_TEXT, MEME, TTS } from '../../utilities/Constants';
import GiphyMediaSelectorModal from '../../components/GiphyMediaSelectorModal/GiphyMediaSelectorModal';
import QaplaMemeSelectorModal from '../../components/QaplaMemeSelectorModal/QaplaMemeSelectorModal';
import { getRecentStreamersDonations, getStreamerPublicData, getStreamerReactionPrice, isUserBannedWithStreamer, sendReaction } from '../../services/database';
import { retrieveData, storeData } from '../../utilities/persistance';
import { trackOnSegment } from '../../services/statistics';
import SentModal from '../../components/SentModal/SentModal';
import ChooseStreamerModal from '../../components/ChooseStreamerModal/ChooseStreamerModal';
import AvatarReactionModal from '../../components/AvatarReactionModal/AvatarReactionModal';
import Create3DTextModal from '../../components/Create3DTextModal/Create3DTextModal';
import ChooseBotVoiceModal from '../../components/ChooseBotVoiceModal/ChooseBotVoiceModal';

class Level2ReactionControllerScreen extends Component {
    state = {
        sending: false,
        message: '',
        randomEmoteUrl: '',
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
            streamerName: ''
        },
        openSearchStreamerModal: false,
        openAvatarModal: false,
        avatarReaction: null,
        open3DTextModal: false,
        custom3DText: null,
        openBotVoiceModal: false,
        selectedVoiceBot: null,
        cost: undefined
    };

    componentDidMount() {
        this.fetchInitialData();
    }

    fetchInitialData = async () => {
        await this.fetchStreamerData(() => {
            this.fetchStreamerEmotes();
            this.fetchReactionCost();
        });
    }

    fetchStreamerData = async (onFinished) => {
        // User may come from a profile, with the data already loaded
        const streamerUid = this.props.navigation.getParam('streamerUid', null);
        if (streamerUid) {
            const streamerImage = this.props.navigation.getParam('streamerImage', '');
            const streamerName = this.props.navigation.getParam('streamerName', '');
            this.setState({
                streamerData: {
                    streamerUid,
                    streamerImage,
                    streamerName
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
                            streamerName: streamerData.val().displayName
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
        }
    }

    fetchReactionCost = async () => {
        const costSnapshot = await getStreamerReactionPrice(this.state.streamerData.streamerUid, 'level2');
        const cost = costSnapshot.val() ?? 500;
        if (this.props.uid) {
            const freeReactionsSent = await retrieveData('freeReactionsSent');
            if (!freeReactionsSent) {
                const hasUserReactedBefore = await getRecentStreamersDonations(this.props.uid);
                this.setState({ cost: hasUserReactedBefore.exists() ? cost : 0 });
            } else {
                this.setState({ cost });
            }
        } else {
            const freeReactionsSent = await retrieveData('freeReactionsSent');
            this.setState({ cost: !freeReactionsSent ? 0 : cost });
        }
    }

    onSendReaction = () => {
        if (!this.state.sending) {
            this.setState({ sending: true }, async () => {
                /**
                 * New users have one reaction for free
                 */
                const freeReactionsSent = await retrieveData('freeReactionsSent');

                const userQoins = this.props.qoins ?? 0;
                if (this.state.cost <= userQoins) {
                    const isUserBanned = await isUserBannedWithStreamer(this.props.twitchId, this.state.streamerData.streamerUid);
                    if (!isUserBanned.exists()) {

                        const totalCost = this.state.cost + this.state.extraTip;
                        if (totalCost <= userQoins) {

                            let messageExtraData = this.state.selectedVoiceBot ?
                                {
                                    voiceAPIName: this.state.selectedVoiceBot.voiceAPIName,
                                    voiceName: this.state.selectedVoiceBot.key
                                }
                                :
                                {};

                            messageExtraData.giphyText = this.state.custom3DText ?
                                this.state.custom3DText.original
                                :
                                {};

                            sendReaction(
                                this.props.uid ?? 'Anonymus',
                                this.props.userName ?? '',
                                this.props.twitchUserName ?? '',
                                this.props.photoUrl ?? '',
                                this.state.streamerData.streamerUid,
                                this.state.streamerData.streamerName,
                                this.state.selectedMedia ?
                                    {
                                        ...this.state.selectedMedia.data.images.original,
                                        type: this.state.mediaType
                                    }
                                    :
                                    {},
                                this.state.message,
                                messageExtraData,
                                {}, // No emote/emoji rain
                                totalCost,
                                this.props.avatarId,
                                this.props.avatarBackground,
                                this.state.avatarReaction?.id,
                                () => {
                                    trackOnSegment('Level 2 Interaction Sent', {
                                        MessageLength: this.state.message ? this.state.message.length : null,
                                        MediaType: this.state.mediaType,
                                        Media: this.state.selectedMedia ? true : false,
                                        ExtraTip: this.state.extraTip,
                                        StreamerUid: this.state.streamerData.streamerUid,
                                        StreamerName: this.state.streamerData.streamerName,
                                        FreeReaction: !freeReactionsSent,
                                        BotVoice: this.state.selectedVoiceBot ? this.state.selectedVoiceBot.key : 'Default',
                                        Custom3DText: this.state.custom3DText ? true : false
                                    });

                                    if (!this.props.uid) {
                                        storeData('freeReactionsSent', 'true');
                                    }

                                    this.setState({ openSentModal: true });
                                },
                                () => this.setState({ sending: false }),
                                false
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
            case AVATAR:
                this.setState({ openAvatarModal: true });
                break;
            case GIPHY_TEXT:
                this.setState({ open3DTextModal: true });
                break;
            case TTS:
                this.setState({ openBotVoiceModal: true });
                break
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

    onStreamerPress = (streamerData) => {
        this.setState({ streamerData }, () => {
            this.fetchStreamerEmotes();
            this.fetchReactionCost();
        });
        this.setState({ openSearchStreamerModal: false });
    }

    onAvatarReactionSelected = (avatarReactionId) => {
        this.setState({ avatarReaction: {
                id: avatarReactionId,
                timestamp: new Date().getTime(),
                title: 'Avatar On',
                type: AVATAR,
                onRemove: () => this.setState({ avatarReaction: null })
            },
            openAvatarModal: false
        });
    }

    on3DTextSelected = (message, custom3DText) => {
        this.setState({ message, custom3DText, open3DTextModal: false });
    }

    onVoiceSelected = (selectedVoiceBot) => {
        this.setState({ selectedVoiceBot: {
                ...selectedVoiceBot,
                title: selectedVoiceBot.key,
                type: TTS,
                onRemove: () => this.setState({ selectedVoiceBot: null }),
                timestamp: new Date().getTime()
            },
            openBotVoiceModal: false
        });
    }

    render() {
        return (
            <>
            <TweetReactionScreen onSend={this.onSendReaction}
                sending={this.state.sending}
                qoins
                cost={this.state.cost}
                mediaSelectorBarOptions={[
                    GIPHY_TEXT,
                    TTS,
                    AVATAR,
                    GIPHY_GIFS,
                    GIPHY_STICKERS,
                    MEME
                ]}
                numberOfReactions={this.state.numberOfReactions}
                avatarReaction={this.state.avatarReaction}
                custom3DText={this.state.custom3DText}
                onRemoveCustom3DText={() => this.setState({ custom3DText: null })}
                voiceBot={this.state.selectedVoiceBot}
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
                onCancel={() => this.props.navigation.dismiss()}
                onOpenSearchStreamerModal={() => this.setState({ openSearchStreamerModal: true })} />
            <GiphyMediaSelectorModal open={this.state.openGiphyModal}
                onClose={() => this.setState({ openGiphyModal: false })}
                mediaType={this.state.modalMediaType}
                onMediaSelect={this.onMediaSelect} />
            <QaplaMemeSelectorModal open={this.state.openMemeModal}
                onClose={() => this.setState({ openMemeModal: false })}
                onMediaSelect={this.onMediaSelect} />
            <SentModal open={this.state.openSentModal}
                onClose={() => this.setState({ openSentModal: false })}
                displayName={this.state.streamerData.streamerName} />
            <ChooseStreamerModal open={this.state.openSearchStreamerModal}
                onClose={() => this.setState({ openSearchStreamerModal: false })}
                selectedStreamer={{
                    ...this.state.streamerData,
                    numberOfReactions: this.state.numberOfReactions
                }}
                uid={this.props.uid}
                onStreamerPress={this.onStreamerPress} />
            <AvatarReactionModal open={this.state.openAvatarModal}
                onClose={() => this.setState({ openAvatarModal: false })}
                avatarId={this.props.avatarId}
                onReactionSelected={this.onAvatarReactionSelected} />
            <Create3DTextModal open={this.state.open3DTextModal}
                onClose={() => this.setState({ open3DTextModal: false })}
                defaultMessage={this.state.message}
                on3DTextSelected={this.on3DTextSelected} />
            <ChooseBotVoiceModal open={this.state.openBotVoiceModal}
                onClose={() => this.setState({ openBotVoiceModal: false })}
                currentVoice={this.state.selectedVoiceBot}
                onVoiceSelected={this.onVoiceSelected} />
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

export default connect(mapStateToProps)(Level2ReactionControllerScreen);