import React, { Component } from 'react';
import { Alert, Image, ImageBackground, Keyboard, Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { GiphyMediaView } from '@giphy/react-native-sdk';

import { translate } from '../../utilities/i18';
import styles from './style';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import { getMediaTypeCost, sendCheers } from '../../services/database';
import LinkTwitchAccountModal from '../../components/LinkTwitchAccountModal/LinkTwitchAccountModal';
import { isUserLogged } from '../../services/auth';
import images from '../../../assets/images';
import { CUSTOM_TTS_VOICE, EMOJI, GIPHY_TEXT, MEME } from '../../utilities/Constants';
import { trackOnSegment } from '../../services/statistics';
import EmojiSelector from '../../components/EmojiSelector/EmojiSelector';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationEvents } from 'react-navigation';
import InsertExtraTipModal from './InsertExtraTipModal';
import EmoteSelector from '../../components/EmojiSelector/EmoteSelector';
import { getStreamerEmotes } from '../../services/functions';

const ExtraTip = ({ value, onPress, selected }) => (
    <TouchableOpacity onPress={() => onPress(value)}>
        <LinearGradient useAngle
            angle={118.67}
            colors={selected ? ['#2D07FA', '#A716EE'] : ['#141833', '#141833']}
            style={styles.extraTipContainer}>
            <images.svg.qoin style={styles.addonQoin} />
            <Text style={styles.extraTipText} numberOfLines={1}>
                {value.toLocaleString()}
            </Text>
        </LinearGradient>
    </TouchableOpacity>
);

class InteractionsCheckout extends Component {
    state = {
        extraTip: 0,
        tipIncrement: 50,
        interactionCost: 0,
        minimum: 0,
        openLinkWitTwitchModal: false,
        openEmojiSelector: false,
        sendingInteraction: false,
        totalOpen: false,
        emoji: '',
        giphyText: null,
        emojiRainCost: 0,
        giphyTextCost: 0,
        localCosts: {},
        keyboardHeight: 0,
        keyboardOpen: false,
        openExtraTipModal: false,
        emojiTab: false,
        emoteUrl: '',
        emotes: []
    };

    componentDidMount() {
        const showAddOnsOnCheckout = this.props.navigation.getParam('showAddOnsOnCheckout', true);
        if (showAddOnsOnCheckout) {
            this.calculateCosts();
            this.fetchAddOnsCosts();
            this.fetchStreamerEmotes();
        }

        this.keyboardWillShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            this.setState({ keyboardHeight: parseInt(e.endCoordinates.height) });
        });
        this.keyboardWillHideListener = Keyboard.addListener('keyboardDidHide', () => {
            this.setState({ keyboardHeight: 0 });
        });
    }

    componentWillUnmount() {
        this.keyboardWillHideListener.remove();
        this.keyboardWillShowListener.remove();
    }

    fetchAddOnsCosts = async () => {
        const giphyTextCost = await getMediaTypeCost(GIPHY_TEXT);
        const emojiRainCost = await getMediaTypeCost(EMOJI);
        this.setState({ giphyTextCost: giphyTextCost.val() || 0, emojiRainCost: emojiRainCost.val() || 0 });
    }

    calculateCosts = () => {
        const onlyQoins = this.props.navigation.getParam('onlyQoins', false);
        if (!onlyQoins) {
            const costs = this.props.navigation.getParam('costs', {});
            let interactionCost = 0;
            Object.values(costs).forEach((cost) => {
                interactionCost += cost;
            });

            const giphyText = this.props.navigation.getParam('giphyText', null);

            this.setState({ interactionCost: !this.state.emoji ? interactionCost : this.state.emojiRainCost + interactionCost, giphyText });
        } else {
            this.setState({ minimum: 50, extraTip: 50 });
        }
    }

    fetchStreamerEmotes = async () => {
        const streamerId = this.props.navigation.getParam('streamerId', null);

        if (streamerId) {
            const emotesRequest = await getStreamerEmotes(this.props.twitchId, streamerId);
            this.setState({ emotes: emotesRequest.data.emotes });
        }
    }

    addTip = (tip) => {
        const extraTip = Number(tip);

        if (!isNaN(extraTip) && extraTip >= 0) {
            this.setState({ extraTip: Math.floor(extraTip) });
        } else {
            Alert.alert('Error', 'Verifica que el valor insertado sea un numero valido y positivo');
        }
    }

    onSendInteraction = async () => {
        if (!this.state.sendingInteraction) {
            this.setState({ sendingInteraction: true }, () => {
                if (isUserLogged()) {
                    if (this.props.twitchId && this.props.twitchUserName) {
                        const totalCost = this.state.interactionCost + this.state.extraTip;
                        if (totalCost <= this.props.qoins) {
                            const streamerId = this.props.navigation.getParam('streamerId', '');
                            const streamerName = this.props.navigation.getParam('displayName', '');
                            const selectedMedia = this.props.navigation.getParam('selectedMedia', null);
                            const mediaType = this.props.navigation.getParam('mediaType');
                            const message = this.props.navigation.getParam('message', null);
                            const messageVoiceData = this.props.navigation.getParam('messageVoice', null);
                            const costs = this.props.navigation.getParam('costs', {});

                            let media = null;
                            let messageExtraData = null;

                            if (selectedMedia) {
                                if (selectedMedia.data && selectedMedia.data.images && selectedMedia.data.images.original) {
                                    media = {
                                        id: selectedMedia.data.id,
                                        ...selectedMedia.data.images.original,
                                        type: mediaType
                                    };
                                } else if (selectedMedia.original) {
                                    media = {
                                        ...selectedMedia.original,
                                        type: mediaType
                                    };
                                }
                            }

                            if (message && ((costs[CUSTOM_TTS_VOICE] && messageVoiceData) || this.state.giphyText)) {
                                messageExtraData = {
                                    ...messageVoiceData,
                                    giphyText: this.state.giphyText ? { ...this.state.giphyText.original, id: this.state.giphyText.id } : {}
                                }
                            }

                            const emojiArray = [];
                            if (this.state.emoji) {
                                emojiArray.push(this.state.emoji);
                            }

                            sendCheers(
                                totalCost,
                                media,
                                message,
                                messageExtraData,
                                // Overlay expects an array of emojis but app only supports one emoji for now
                                emojiArray,
                                (new Date()).getTime(),
                                streamerName,
                                this.props.uid,
                                this.props.userName,
                                this.props.twitchUserName,
                                this.props.photoUrl,
                                streamerId,
                                () => {
                                    trackOnSegment('Interaction Sent', {
                                        MessageLength: message ? message.length : null,
                                        messageExtraData,
                                        Media: media ? true : false,
                                        ExtraTip: this.state.extraTip,
                                        TotalQoins: totalCost
                                    });

                                    this.props.navigation.navigate('InteractionsSent', {
                                        ...this.props.navigation.state.params,
                                        donationTotal: totalCost,
                                    });
                                },
                                () => this.setState({ sendingInteraction: false })
                            );
                        } else {
                            this.setState({ sendingInteraction: false });
                            // After a successful buy try to send the interaction again
                            this.props.navigation.navigate('BuyQoins', { onSuccessfulBuy: this.onSendInteraction });
                        }
                    } else {
                        this.setState({ openLinkWitTwitchModal: true, sendingInteraction: false });
                    }
                } else {
                    this.setState({ sendingInteraction: false });
                    this.props.navigation.navigate('SignIn');
                }
            });
        }
    }

    onCancel = () => {
        Alert.alert(
            translate('interactions.checkout.discardInteraction'),
            translate('interactions.checkout.areYouSure'),
            [
                {
                    text: translate('interactions.checkout.no'),
                    style: 'cancel',
                },
                {
                    text: translate('interactions.checkout.yes'),
                    onPress: this.props.navigation.dismiss
                }
            ]
        );
    }

    emojiSelectedHandler = (emoji) => {
        const emojiOrEmoteSelected = this.state.emoji || this.state.emoteUrl ? true : false;

        this.setState({
            emoji,
            emoteUrl: '',
            openEmojiSelector: false,
            localCosts: {
                'emoji': this.state.emojiRainCost
            },
            interactionCost: !emojiOrEmoteSelected ? this.state.interactionCost + this.state.emojiRainCost : this.state.interactionCost
        });
    }

    emoteSelectedHandler = (emoteUrl) => {
        const emojiOrEmoteSelected = this.state.emoji || this.state.emoteUrl ? true : false;

        this.setState({
            emoteUrl,
            emoji: '',
            openEmojiSelector: false,
            interactionCost: !emojiOrEmoteSelected ? this.state.interactionCost + this.state.emojiRainCost : this.state.interactionCost
        });
    }

    removeEmoji = () => {
        this.setState({
            emoji: '',
            emoteUrl: '',
            localCosts: {},
            interactionCost: this.state.interactionCost - this.state.emojiRainCost
        });
    }

    removeGiphyText = () => {
        this.setState({
            giphyText: null,
            interactionCost: this.state.interactionCost - this.state.giphyTextCost
        });
    }

    navigateToCustomTTS = async () => {
        const costsObject = this.props.navigation.getParam('costs', {});

        if (this.state.giphyTextCost) {
            const message = this.props.navigation.getParam('message', '');

            if (message && message.length <= 50) {
                this.props.navigation.navigate('InteractionsGiphyTextSelector', {
                    ...this.props.navigation.state.params,
                    isAddOn: true,
                    text: message,
                    costs: {
                        [GIPHY_TEXT]: this.state.giphyTextCost,
                        ...costsObject
                    }
                });
            } else {
                this.props.navigation.navigate('InteractionsInsertGiphyText', {
                    ...this.props.navigation.state.params,
                    isAddOn: true,
                    showCutTextWarning: message.length > 50,
                    costs: {
                        [GIPHY_TEXT]: this.state.giphyTextCost,
                        ...costsObject
                    }
                });
            }
        }
    }

    render() {
        const selectedMedia = this.props.navigation.getParam('selectedMedia');
        const mediaType = this.props.navigation.getParam('mediaType');
        const message = this.props.navigation.getParam('message', '');
        const costs = this.props.navigation.getParam('costs', {});
        const onlyQoins = this.props.navigation.getParam('onlyQoins', false);
        const messageVoiceData = this.props.navigation.getParam('messageVoice', null);
        const showAddOnsOnCheckout = this.props.navigation.getParam('showAddOnsOnCheckout', true);
        const totalCost = this.state.interactionCost + this.state.extraTip;
        const giphyText = this.state.giphyText;
        const emojiOrEmoteSelected = this.state.emoji || this.state.emoteUrl ? true : false;

        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.innerConatiner}>
                    <View>
                        {selectedMedia &&
                            <>
                                {mediaType !== MEME ?
                                    <View style={[styles.interactionSelectedBorderRadius,
                                    {
                                        aspectRatio: selectedMedia.aspectRatio,
                                    },
                                    selectedMedia.aspectRatio > 1 ?
                                        {
                                            width: widthPercentageToPx(60),
                                        }
                                        :
                                        {
                                            height: heightPercentageToPx(20),
                                        },
                                    ]}>
                                        <GiphyMediaView
                                            showCheckeredBackground={false}
                                            media={selectedMedia}
                                            style={[{
                                                aspectRatio: selectedMedia.aspectRatio,
                                                borderRadius: 10,
                                            },
                                            selectedMedia.aspectRatio > 1 ?
                                                {
                                                    width: widthPercentageToPx(60),
                                                }
                                                :
                                                {
                                                    height: heightPercentageToPx(20),
                                                },
                                            ]}
                                        />
                                    </View>
                                    :
                                    <Image source={selectedMedia.original.url ? { uri: selectedMedia.original.url } : null}
                                        resizeMode="contain"
                                        style={[{
                                            borderRadius: 10,
                                            maxHeight: heightPercentageToPx(20),
                                            maxWidth: '60%',
                                            aspectRatio: (selectedMedia.original.width / selectedMedia.original.height) || 0,
                                        }]} />
                                }
                            </>

                        }
                        {giphyText ?
                            <Image source={giphyText.original.url ? { uri: giphyText.original.url } : null}
                                resizeMode="contain"
                                style={[{
                                    borderRadius: 10,
                                    maxHeight: heightPercentageToPx(20),
                                    maxWidth: '60%',
                                    aspectRatio: (giphyText.original.width / giphyText.original.height) || 0,
                                }]} />
                            :
                            message !== '' &&
                            <View style={styles.messageSentMessageContainer}>
                                <Text style={styles.messageSentMessageText}>
                                    {message}
                                </Text>
                            </View>
                        }
                    </View>
                    {onlyQoins &&
                        <View style={styles.sentContainer}>
                            <Image source={{ uri: 'https://media.giphy.com/media/5QP99om3Co7s8YJPez/giphy.gif' }}
                                style={styles.onlyQoinsImage} />
                            <Text style={[styles.whiteText, styles.sentText, styles.onlyQoinsText]}>
                                {translate('interactions.checkout.supportP1')}
                                <Text style={styles.accentTextColor}>
                                    {this.state.streamerName}
                                </Text>
                                {translate('interactions.checkout.supportP2')}
                            </Text>
                        </View>
                    }
                    {!onlyQoins &&
                        <>
                            {showAddOnsOnCheckout &&
                                <View style={styles.marginTop24}>
                                    <Text style={styles.checkoutSectionHeaderText}>
                                        Add Ons
                                    </Text>
                                    <View style={styles.addOnsContainer}>
                                        {this.state.emojiRainCost !== 0 &&
                                            <TouchableOpacity
                                                onPress={() => this.setState({ openEmojiSelector: true })}
                                                style={styles.AddonContainer}>
                                                <ImageBackground
                                                    source={emojiOrEmoteSelected ? images.png.InteractionGradient1.img : images.png.InteractionGradient3.img}
                                                    style={styles.checkoutAddonImageContainer}
                                                >
                                                    <ImageBackground source={images.gif.emojiRaid.img}
                                                        style={styles.checkoutAddonImageContainer}>
                                                        {emojiOrEmoteSelected &&
                                                            <TouchableOpacity onPress={this.removeEmoji} style={styles.deleteAddOnIconContainer}>
                                                                <images.svg.deleteIcon />
                                                            </TouchableOpacity>
                                                        }
                                                        {!this.state.emoteUrl ?
                                                            <Text style={styles.addonEmojiText}>
                                                                {this.state.emoji || '🤡'}
                                                            </Text>
                                                            :
                                                            <Image source={{ uri: this.state.emoteUrl }} style={{ aspectRatio: 1, height: 26 }} />
                                                        }
                                                        <Text style={styles.addonText}>
                                                            Emoji raid
                                                        </Text>
                                                        <View style={styles.checkoutAddonQoinDisplayCointainer}>
                                                            <images.svg.qoin style={styles.addonQoin} />
                                                            <Text style={styles.addonQoinText}>
                                                                {this.state.emojiRainCost}
                                                            </Text>
                                                        </View>
                                                    </ImageBackground>
                                                </ImageBackground>
                                            </TouchableOpacity>
                                        }
                                        {this.state.giphyTextCost !== 0 &&
                                            <TouchableOpacity style={styles.AddonContainer} onPress={this.navigateToCustomTTS}>
                                                <ImageBackground
                                                    source={giphyText ? images.png.InteractionGradient1.img : images.png.InteractionGradient6.img}
                                                    style={styles.checkoutAddonImageContainer}
                                                >
                                                    {giphyText &&
                                                        <TouchableOpacity onPress={this.removeGiphyText} style={styles.deleteAddOnIconContainer}>
                                                            <images.svg.deleteIcon />
                                                        </TouchableOpacity>
                                                    }
                                                    <Image style={styles.customTTSImage} source={giphyText ? images.gif.slaaay.img : images.gif.makeItPop.img} />
                                                    <Text style={[styles.addonText, { color: giphyText ? '#FFF' : '#0D1021' }]}>
                                                        {translate('interactions.checkout.customTTS')}
                                                    </Text>
                                                    <View style={styles.checkoutAddonQoinDisplayCointainer}>
                                                        <images.svg.qoin style={styles.addonQoin} />
                                                        <Text style={styles.addonQoinText}>
                                                            {this.state.giphyTextCost}
                                                        </Text>
                                                    </View>
                                                </ImageBackground>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                </View>
                            }
                            <View style={styles.marginTop24}>
                                <Text style={styles.checkoutSectionHeaderText}>
                                    {translate('interactions.checkout.sendExtraTip')}
                                </Text>
                                <View style={[styles.extraTipOptionsContainer, styles.marginTop16]}>
                                    <ExtraTip value={200}
                                        onPress={this.addTip}
                                        selected={this.state.extraTip === 200} />
                                    <ExtraTip value={500}
                                        onPress={this.addTip}
                                        selected={this.state.extraTip === 500} />
                                    <ExtraTip value={1000}
                                        onPress={this.addTip}
                                        selected={this.state.extraTip === 1000} />
                                    <ExtraTip value={translate('interactions.checkout.other')}
                                        onPress={() => this.setState({ openExtraTipModal: true })}
                                        selected={this.state.extraTip !== 0 && this.state.extraTip !== 200 && this.state.extraTip !== 500 && this.state.extraTip !== 1000} />
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.setState({ totalOpen: !this.state.totalOpen })}
                                style={[styles.checkoutDataDisplayMainContainer, styles.marginTop24]}>
                                <View style={styles.checkoutDataDisplayContainer}>
                                    <Text style={[styles.whiteText, styles.checkoutTotalText]}>
                                        Total
                                    </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <Text style={[styles.whiteText, styles.checkoutTotalText]}>
                                            {totalCost.toLocaleString()}
                                        </Text>
                                        <images.svg.arrowDownWhite style={[styles.totalArrow, {
                                            transform: [{ rotate: this.state.totalOpen ? '0deg' : '180deg' }],
                                        }]} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {this.state.totalOpen &&
                                <View style={[styles.checkoutDataDisplayMainContainer, styles.marginTop16]}>
                                    <View style={styles.checkoutDataDisplayContainer}>
                                        <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                            Extra Tip
                                        </Text>
                                        <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                            {this.state.extraTip.toLocaleString()}
                                        </Text>
                                    </View>
                                    {Object.keys(costs).map((product) => (
                                        <>
                                            {(this.state.giphyText || product !== GIPHY_TEXT) && costs[product] !== 0 &&
                                                <View style={[styles.checkoutDataDisplayContainer, styles.marginTop8]}>
                                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                                        {product !== CUSTOM_TTS_VOICE ?
                                                            translate(`interactions.checkout.concepts.${product}`)
                                                            :
                                                            `${messageVoiceData.voiceName} Voice`
                                                        }
                                                    </Text>
                                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                                        {costs[product].toLocaleString()}
                                                    </Text>
                                                </View>
                                            }
                                        </>
                                    ))}
                                    {Object.keys(this.state.localCosts).map((product) => (
                                        <>
                                            {this.state.localCosts[product] !== 0 &&
                                                <View style={[styles.checkoutDataDisplayContainer, styles.marginTop8]}>
                                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                                        {product !== CUSTOM_TTS_VOICE ?
                                                            translate(`interactions.checkout.concepts.${product}`)
                                                            :
                                                            `${messageVoiceData.voiceName} Voice`
                                                        }
                                                    </Text>
                                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                                        {this.state.localCosts[product].toLocaleString()}
                                                    </Text>
                                                </View>
                                            }
                                        </>
                                    ))}
                                </View>
                            }
                            <TouchableOpacity style={styles.checkoutSendButton} onPress={this.onSendInteraction}>
                                <Text style={styles.checkoutSendButtonText}>
                                    {translate(`interactions.checkout.sendInteraction`)}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.checkoutMarginDisplay} />
                        </>
                    }
                </ScrollView>
                <Modal
                    visible={this.state.openEmojiSelector}
                    onRequestClose={() => this.setState({ openEmojiSelector: false })}
                    transparent={true}
                    animationType="slide"
                >
                    <ScrollView keyboardShouldPersistTaps='never' scrollEnabled={false} contentContainerStyle={{
                        backgroundColor: '#0D1021',
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ openEmojiSelector: false })}
                            style={{
                                marginBottom: 20,
                                marginLeft: 16,
                            }}>
                            <images.svg.backIcon />
                        </TouchableOpacity>
                        <View style={{
                            marginLeft: 16,
                            marginBottom: 20,
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 22,
                                fontWeight: '700',
                                lineHeight: 32,
                            }}>
                                {translate(`interactions.checkout.emojiModal.chooseAnEmoji`)}
                            </Text>
                            <LinearGradient
                                colors={['#2D07FA', '#A716EE']}
                                style={{
                                    paddingVertical: 6,
                                    paddingHorizontal: 13,
                                    marginLeft: 8,
                                    borderRadius: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    alignSelf: 'flex-start',
                                }}
                                useAngle
                                angle={90}
                            >
                                <images.svg.qoin style={{
                                    maxWidth: 16,
                                    maxHeight: 16,
                                }} />
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: '700',
                                    lineHeight: 19,
                                    marginLeft: 8,
                                }}>
                                    {this.state.emojiRainCost}
                                </Text>
                            </LinearGradient>
                        </View>
                        <View style={{
                            backgroundColor: '#141539',
                            height: (Platform.OS === 'android' && this.state.keyboardHeight) ? this.state.keyboardHeight : heightPercentageToPx(70),
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            overflow: 'hidden',
                        }}>
                            {this.state.emojiTab ?
                                <EmojiSelector
                                    onEmojiSelected={this.emojiSelectedHandler}
                                    showHistory={false}
                                />
                                :
                                <EmoteSelector
                                    data={this.state.emotes}
                                    onEmoteSelect={this.emoteSelectedHandler}
                                />
                            }
                        </View>
                    </ScrollView>
                    <View style={{
                        backgroundColor: '#141539',
                        height: 75,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: !this.state.emojiTab ? '#29326B' : '#0000',
                            paddingHorizontal: 13,
                            paddingVertical: 6,
                            borderRadius: 6,
                            marginHorizontal: 4,
                        }}
                            disabled={!this.state.emojiTab}
                            onPress={() => this.setState({ emojiTab: false })}
                        >
                            <Text style={{
                                color: !this.state.emojiTab ? '#fff' : '#FFFFFF99',
                                fontSize: 17,
                                fontWeight: '600',
                                lineHeight: 22,
                            }}>
                                {`Emotes`}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: this.state.emojiTab ? '#29326B' : '#0000',
                            paddingHorizontal: 13,
                            paddingVertical: 6,
                            borderRadius: 6,
                        }}
                            disabled={this.state.emojiTab}
                            onPress={() => this.setState({ emojiTab: true })}
                        >
                            <Text style={{
                                color: this.state.emojiTab ? '#fff' : '#FFFFFF99',
                                fontSize: 17,
                                fontWeight: '600',
                                lineHeight: 22,
                                marginHorizontal: 4,
                            }}>
                                {`Emojis`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <NavigationEvents onWillFocus={this.calculateCosts} />
                <LinkTwitchAccountModal
                    open={this.state.openLinkWitTwitchModal}
                    onClose={() => this.setState({ openLinkWitTwitchModal: false })}
                    onLinkSuccessful={this.onSendInteraction}
                    linkingWithQreatorCode={false} />
                <InsertExtraTipModal setExtraTip={(extraTip) => this.setState({ extraTip })}
                    open={this.state.openExtraTipModal}
                    onClose={() => this.setState({ openExtraTipModal: false })} />
            </View >
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        userName: state.userReducer.user.userName,
        twitchUserName: state.userReducer.user.twitchUsername,
        photoUrl: state.userReducer.user.photoUrl,
        qoins: state.userReducer.user.credits,
        twitchId: state.userReducer.user.twitchId,
    };
}

export default connect(mapStateToProps)(InteractionsCheckout);