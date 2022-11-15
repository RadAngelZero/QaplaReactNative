import React, { Component } from 'react';
import { connect } from 'react-redux';

import TweetReactionScreen from './TweetReactionScreen';
import { getStreamerEmotes, getUserToStreamerRelationData } from '../../services/functions';
import { AVATAR, EMOTE, GIPHY_GIFS, GIPHY_STICKERS, GIPHY_TEXT, MEME, TTS } from '../../utilities/Constants';
import GiphyMediaSelectorModal from '../../components/GiphyMediaSelectorModal/GiphyMediaSelectorModal';
import QaplaMemeSelectorModal from '../../components/QaplaMemeSelectorModal/QaplaMemeSelectorModal';
import {
    getRecentStreamersDonations,
    getStreamerPublicData,
    getStreamerReactionPrice,
    getUserReactionsCount,
    isUserBannedWithStreamer,
    saveAvatarId,
    saveAvatarUrl,
    saveReadyPlayerMeUserId,
    sendReaction
} from '../../services/database';
import { retrieveData, storeData } from '../../utilities/persistance';
import { trackOnSegment } from '../../services/statistics';
import SentModal from '../../components/SentModal/SentModal';
import ChooseStreamerModal from '../../components/ChooseStreamerModal/ChooseStreamerModal';
import AvatarReactionModal from '../../components/AvatarReactionModal/AvatarReactionModal';
import Create3DTextModal from '../../components/Create3DTextModal/Create3DTextModal';
import ChooseBotVoiceModal from '../../components/ChooseBotVoiceModal/ChooseBotVoiceModal';
import EmoteRainModal from '../../components/EmoteRainModal/EmoteRainModal';
import CreateAvatarModal from '../../components/CreateAvatarModal/CreateAvatarModal';
import SignUpModal from '../../components/SignUpModal/SignUpModal';

class TweetReactionControllerScreen extends Component {
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
        numberOfReactions: 0,
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
        costs: [
            0,
            undefined,
            undefined
        ],
        emotes: [],
        userToStreamerRelationData: undefined,
        openEmoteModal: false,
        selectedEmote: null,
        openCreateAvatarModal: false,
        avatarId: this.props.avatarId,
        reactionLevel: this.props.level,
        openSignUpModal: false,
        openEmotesAfterStreamerSelected: false
    };

    componentDidMount() {
        this.fetchInitialData();
    }

    fetchInitialData = async () => {
        await this.fetchStreamerData(() => {
            this.fetchUserSubscription();
            this.fetchStreamerEmotes();
            this.fetchReactionsCosts();
            this.fetchNumberOfReactions();
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
        } else if (this.props.uid) {
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
        } else {
            onFinished();
        }
    }

    fetchStreamerEmotes = () => {
        if (this.state.streamerData.streamerUid) {
            this.setState({ emotes: [] }, async () => {
                const emotesRequest = await getStreamerEmotes(this.state.streamerData.streamerUid);
                const emotes = emotesRequest.data ? emotesRequest.data : null;
                if (emotes) {
                    // Find the first array who has more than 0 elements
                    const array = emotes.find((typeOfEmote) => typeOfEmote.data[0].length > 0);
                    const randomNumber = Math.floor(Math.random() * array.data[0].length);

                    this.setState({ randomEmoteUrl: array.data[0][randomNumber].images.url_1x });
                }

                this.setState({ emotes });
            });
        }
    }

    fetchUserSubscription = async () => {
        if (this.props.twitchId) {
            const relationData = await getUserToStreamerRelationData(this.props.twitchId, this.state.streamerData.streamerUid);
            this.setState({ userToStreamerRelationData: relationData.data ? relationData.data : null });
        }
    }

    fetchReactionsCosts = async () => {
        let costs = [0];
        for (let i = 2; i <= 3; i++) {
            const costSnapshot = await getStreamerReactionPrice(this.state.streamerData.streamerUid, `level${i}`);
            const cost = costSnapshot.val() ?? (i === 2 ? 500 : 800);
            if (this.props.uid) {
                const freeReactionsSent = await retrieveData('freeReactionsSent');
                if (!freeReactionsSent) {
                    const hasUserReactedBefore = await getRecentStreamersDonations(this.props.uid);
                    costs.push(hasUserReactedBefore.exists() ? cost : 0);
                } else {
                    costs.push(cost);
                }
            } else {
                const freeReactionsSent = await retrieveData('freeReactionsSent');
                costs.push(!freeReactionsSent ? 0 : cost);
            }
        }

        this.setState({ costs });
    }

    fetchNumberOfReactions = async () => {
        if (this.props.uid) {
            const numberOfReactions = await getUserReactionsCount(this.props.uid, this.state.streamerData.streamerUid);
            if (numberOfReactions.val()) {
                this.setState({ numberOfReactions: numberOfReactions.val() });
            } else {
                const freeReactionsSent = await retrieveData('freeReactionsSent');
                if (!freeReactionsSent) {
                    const hasUserReactedBefore = await getRecentStreamersDonations(this.props.uid, 1);
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
        if (this.state.streamerData.streamerUid === '') {
            return this.setState({ openSearchStreamerModal: true });
        }

        if (!this.state.sending) {
            this.setState({ sending: true }, async () => {
                /**
                 * New users have one reaction for free
                 */
                const freeReactionsSent = await retrieveData('freeReactionsSent');

                const userQoins = this.props.qoins ?? 0;
                if (this.state.costs[this.state.reactionLevel - 1] <= userQoins) {
                    const isUserBanned = await isUserBannedWithStreamer(this.props.twitchId, this.state.streamerData.streamerUid);
                    if (!isUserBanned.exists()) {

                        const totalCost = this.state.costs[this.state.reactionLevel - 1] + this.state.extraTip;
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

                            const emoteArray = [];

                            if (this.state.selectedEmote) {
                                emoteArray.push(this.state.selectedEmote.url);
                            }

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
                                {
                                    type: EMOTE,
                                    emojis: emoteArray
                                },
                                totalCost,
                                this.state.avatarId,
                                this.props.avatarBackground,
                                this.state.avatarReaction?.id,
                                () => {
                                    trackOnSegment('Level 3 Interaction Sent', {
                                        MessageLength: this.state.message ? this.state.message.length : null,
                                        MediaType: this.state.mediaType,
                                        Media: this.state.selectedMedia ? true : false,
                                        ExtraTip: this.state.extraTip,
                                        StreamerUid: this.state.streamerData.streamerUid,
                                        StreamerName: this.state.streamerData.streamerName,
                                        FreeReaction: !freeReactionsSent,
                                        BotVoice: this.state.selectedVoiceBot ? this.state.selectedVoiceBot.key : 'Default',
                                        Custom3DText: this.state.custom3DText ? true : false,
                                        EmoteRaid: emoteArray.length > 0
                                    });

                                    if (!freeReactionsSent) {
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
                if (this.state.avatarId) {
                    this.setState({ openAvatarModal: true });
                } else {
                    this.setState({ openCreateAvatarModal: true });
                }
                break;
            case GIPHY_TEXT:
                this.setState({ open3DTextModal: true });
                break;
            case TTS:
                this.setState({ openBotVoiceModal: true });
                break
            case EMOTE:
                if (this.state.streamerData.streamerUid !== '') {
                    this.setState({ openEmoteModal: true });
                } else {
                    this.setState({ openSearchStreamerModal: true, openEmotesAfterStreamerSelected: true });
                }
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

    onStreamerPress = (streamerData) => {
        this.setState({ streamerData, costs: [0, undefined, undefined], selectedEmote: null }, () => {
            this.fetchUserSubscription();
            this.fetchStreamerEmotes();
            this.fetchReactionsCosts();
            this.fetchNumberOfReactions();
        });

        if (this.state.openEmotesAfterStreamerSelected) {
            this.setState({ openEmoteModal: true });
        }

        this.setState({ openSearchStreamerModal: false, openEmotesAfterStreamerSelected: false });
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
        this.setState({ selectedVoiceBot: selectedVoiceBot ? {
                    ...selectedVoiceBot,
                    title: selectedVoiceBot.key,
                    type: TTS,
                    onRemove: () => this.setState({ selectedVoiceBot: null }),
                    timestamp: new Date().getTime()
                } : null,
            openBotVoiceModal: false
        });
    }

    onEmoteSelected = (emote) => {
        this.setState({ selectedEmote: {
                url: emote,
                title: 'Emote Raid',
                type: EMOTE,
                onRemove: () => this.setState({ selectedEmote: null }),
                timestamp: new Date().getTime()
            },
            openEmoteModal: false
        });
    }

    onAvatarCreated = async (avatarId, rpmUid) => {
        if (this.props.uid) {
            await saveAvatarId(this.props.uid, avatarId);
            await saveAvatarUrl(this.props.uid, `https://api.readyplayer.me/v1/avatars/${avatarId}.glb`);
            if (rpmUid) {
                await saveReadyPlayerMeUserId(this.props.uid, rpmUid);
            }
        }

        this.setState({ avatarId, openCreateAvatarModal: false, openAvatarModal: true });
    }

    onUpgradeReaction = (reactionLevel, mediaUnlocked) => {
        const costs = [...this.state.costs];
        this.onMediaOptionPress(mediaUnlocked);
        this.setState({ reactionLevel, costs: [0, undefined, undefined] }, () => {
            this.setState({ costs });
        });
    }

    onSignUpSuccess = () => {
        this.fetchInitialData();
        this.setState({ openSignUpModal: false });
    }

    onCloseSentModal = () => {
        if (!this.props.uid) {
            this.setState({ openSignUpModal: true });
        } else {
            // Send to send more reactions
        }

        this.setState({ openSentModal: false });
    }

    render() {
        let availableContent = [];
        switch (this.state.reactionLevel) {
            case 1:
                availableContent = [
                    GIPHY_GIFS,
                    GIPHY_STICKERS,
                    MEME
                ];
                break;
            case 2:
                availableContent = [
                    GIPHY_TEXT,
                    TTS,
                    AVATAR,
                    GIPHY_GIFS,
                    GIPHY_STICKERS,
                    MEME
                ];
                break;
            case 3:
                availableContent = [
                    EMOTE,
                    GIPHY_TEXT,
                    TTS,
                    AVATAR,
                    GIPHY_GIFS,
                    GIPHY_STICKERS,
                    MEME
                ];
                break;
            default:
                availableContent = [
                    GIPHY_GIFS,
                    GIPHY_STICKERS,
                    MEME
                ];
                break;
        }

        return (
            <>
            <TweetReactionScreen onSend={this.onSendReaction}
                sending={this.state.sending}
                qoins={this.state.reactionLevel !== 1}
                currentReactioncost={this.state.costs[this.state.reactionLevel - 1]}
                costsPerReactionLevel={this.state.costs}
                mediaSelectorBarOptions={availableContent}
                numberOfReactions={this.state.numberOfReactions}
                avatarReaction={this.state.avatarReaction}
                custom3DText={this.state.custom3DText}
                onRemoveCustom3DText={() => this.setState({ custom3DText: null })}
                voiceBot={this.state.selectedVoiceBot}
                emoteRaid={this.state.selectedEmote}
                message={this.state.message}
                onMessageChanged={(message) => this.setState({ message })}
                onMediaOptionPress={this.onMediaOptionPress}
                randomEmoteUrl={this.state.randomEmoteUrl}
                mediaType={this.state.mediaType}
                selectedMedia={this.state.selectedMedia}
                cleanSelectedMedia={() => this.setState({ selectedMedia: null })}
                extraTip={this.state.extraTip}
                setExtraTip={(extraTip) => this.setState({ extraTip: undefined }, () =>
                    // setTimeout 0 to trick the MaskedView on Android
                    setTimeout(() => {
                        this.setState({ extraTip })
                    }, 0)
                )}
                streamerImage={this.state.streamerData.streamerImage}
                streamerUid={this.state.streamerData.streamerUid}
                onCancel={() => this.props.navigation.popToTop()}
                onOpenSearchStreamerModal={() => this.setState({ openSearchStreamerModal: true })}
                onUpgradeReaction={this.onUpgradeReaction} />
            <GiphyMediaSelectorModal open={this.state.openGiphyModal}
                onClose={() => this.setState({ openGiphyModal: false })}
                mediaType={this.state.modalMediaType}
                onMediaSelect={this.onMediaSelect} />
            <QaplaMemeSelectorModal open={this.state.openMemeModal}
                onClose={() => this.setState({ openMemeModal: false })}
                onMediaSelect={this.onMediaSelect} />
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
                avatarId={this.state.avatarId}
                onReactionSelected={this.onAvatarReactionSelected} />
            <Create3DTextModal open={this.state.open3DTextModal}
                onClose={() => this.setState({ open3DTextModal: false })}
                defaultMessage={this.state.message}
                on3DTextSelected={this.on3DTextSelected} />
            <ChooseBotVoiceModal open={this.state.openBotVoiceModal}
                onClose={() => this.setState({ openBotVoiceModal: false })}
                currentVoice={this.state.selectedVoiceBot}
                onVoiceSelected={this.onVoiceSelected} />
            <EmoteRainModal open={this.state.openEmoteModal}
                onClose={() => this.setState({ openEmoteModal: false })}
                emotes={this.state.emotes}
                onEmoteSelected={this.onEmoteSelected}
                userToStreamerRelation={this.state.userToStreamerRelationData} />
            <CreateAvatarModal open={this.state.openCreateAvatarModal}
                onClose={() => this.setState({ openCreateAvatarModal: false })}
                onAvatarCreated={this.onAvatarCreated} />
            <SentModal open={this.state.openSentModal}
                onClose={this.onCloseSentModal} />
            <SignUpModal open={this.state.openSignUpModal}
                onClose={() => this.setState({ openSignUpModal: false })}
                title='Cool! isn’t it? 👀'
                benefits={[
                    '⚡️ Use channel points to send custom memes',
                    '👽 Create your custom avatar',
                    '🔥 Upgrade your memes'
                ]}
                onSignUpSuccess={this.onSignUpSuccess} />
            </>
        );
    }
}

TweetReactionControllerScreen.defaultProps = {
    level: 1
};

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

export default connect(mapStateToProps)(TweetReactionControllerScreen);
