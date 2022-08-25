import React, { Component } from 'react';
import { Alert, Image, ImageBackground, Modal, ScrollView, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import { translate } from '../../utilities/i18';
import styles from './style';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import { sendCheers } from '../../services/database';
import LinkTwitchAccountModal from '../../components/LinkTwitchAccountModal/LinkTwitchAccountModal';
import { isUserLogged } from '../../services/auth';
import { GiphyMediaView } from '@giphy/react-native-sdk';
import images from '../../../assets/images';
import { CUSTOM_TTS_VOICE, MEME } from '../../utilities/Constants';
import { trackOnSegment } from '../../services/statistics';
import emoji from 'emoji-datasource';
import EmojiSelector from '../../components/EmojiSelector/EmojiSelector';
import LinearGradient from 'react-native-linear-gradient';

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
        keyboardOpened: false,
    };

    componentDidMount() {
        const onlyQoins = this.props.navigation.getParam('onlyQoins', false);
        if (!onlyQoins) {
            const costs = this.props.navigation.getParam('costs', {});
            let interactionCost = 0;
            Object.values(costs).forEach((cost) => {
                interactionCost += cost;
            });

            this.setState({ interactionCost });
        } else {
            this.setState({ minimum: 50, extraTip: 50 });
        }
        this.keyboardShow = Keyboard.addListener('keyboardDidShow', () => {
            this.setState({ keyboardOpened: true });
        });
        this.keyboardHide = Keyboard.addListener('keyboardDidHide', () => {
            this.setState({ keyboardOpened: false });
        });
    }
    componentWillUnmount() {
        this.keyboardShow.remove();
        this.keyboardHide.remove();
    }

    addTip = () => {
        this.setState({ extraTip: this.state.extraTip + this.state.tipIncrement });
    }

    subTip = () => {
        if (this.state.extraTip > this.state.minimum) {
            this.setState({ extraTip: this.state.extraTip - this.state.tipIncrement });
        }
        if (this.state.extraTip < this.state.minimum) {
            this.setState({ extraTip: this.state.minimum });
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
                            const giphyText = this.props.navigation.getParam('giphyText', {});
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

                            if (message && ((costs[CUSTOM_TTS_VOICE] && messageVoiceData) || giphyText)) {
                                messageExtraData = {
                                    ...messageVoiceData,
                                    giphyText: giphyText.original
                                }
                            }

                            sendCheers(
                                totalCost,
                                media,
                                message,
                                messageExtraData,
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

    emojiSelectedHanler = (emoji) => {
        console.log(emoji);
        this.setState({ emoji, openEmojiSelector: false });
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
                        <View style={styles.messageSentContainer}>
                            <Text style={styles.messageSentTextAccent}>
                                {`User`}
                                <Text style={styles.messageSent}>
                                    {` sent you `}
                                </Text>
                                {`200 Qoins`}
                            </Text>
                        </View>
                        {message !== '' &&
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
                                {`${translate('interactions.checkout.supportP1')} `}
                                <Text style={styles.accentTextColor}>
                                    {this.state.streamerName}
                                </Text>
                                {`${translate('interactions.checkout.supportP2')}`}
                            </Text>
                        </View>
                    }
                    {!onlyQoins &&
                        <>
                            {showAddOnsOnCheckout &&
                                <View style={styles.marginTop24}>
                                    <Text style={styles.checkoutSectionHeaderText}>
                                        {`Add Ons`}
                                    </Text>
                                    <View style={styles.addOnsContainer}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ openEmojiSelector: true })}
                                            style={styles.AddonContainer}>
                                            <ImageBackground
                                                source={images.png.InteractionGradient3.img}
                                                style={styles.checkoutAddonImageContainer}
                                            >
                                                <Text style={styles.addonEmojiText}>
                                                    {`${this.state.emoji || '🤡'}`}
                                                </Text>
                                                <Text style={styles.addonText}>
                                                    {`Emoji raid`}
                                                </Text>
                                                <View style={styles.checkoutAddonQoinDisplayCointainer}>
                                                    <images.svg.qoin style={styles.addonQoin} />
                                                    <Text style={styles.addonQoinText}>
                                                        {this.props.emojiRainCost || 100}
                                                    </Text>
                                                </View>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.AddonContainer}>
                                            <ImageBackground
                                                source={images.png.InteractionGradient6.img}
                                                style={styles.checkoutAddonImageContainer}
                                            >
                                                <Text style={styles.addonText}>
                                                    {`Custom TTS`}
                                                </Text>
                                                <View style={styles.checkoutAddonQoinDisplayCointainer}>
                                                    <images.svg.qoin style={styles.addonQoin} />
                                                    <Text style={styles.addonQoinText}>
                                                        {this.props.emojiRainCost || 100}
                                                    </Text>
                                                </View>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                            <View style={styles.marginTop24}>
                                <Text style={styles.checkoutSectionHeaderText}>
                                    {`Send Extra Tip`}
                                </Text>
                                <View style={[styles.extraTipOptionsContainer, styles.marginTop16]}>
                                    <TouchableOpacity
                                        onPress={() => console.log('200')}
                                        style={styles.extraTipContainer}>
                                        <images.svg.qoin style={styles.addonQoin} />
                                        <Text style={styles.extraTipText}>
                                            {200}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => console.log('500')}
                                        style={styles.extraTipContainer}>
                                        <images.svg.qoin style={styles.addonQoin} />
                                        <Text style={styles.extraTipText}>
                                            {500}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => console.log('1000')}
                                        style={styles.extraTipContainer}>
                                        <images.svg.qoin style={styles.addonQoin} />
                                        <Text style={styles.extraTipText}>
                                            {'1,000'}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => console.log('Custom')}
                                        style={styles.extraTipContainer}>
                                        <images.svg.qoin style={styles.addonQoin} />
                                        <Text style={styles.extraTipText}>
                                            {`Other`}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* <View style={[styles.checkoutContainer, styles.checkoutDataDisplayMainContainer]}>
                                <View style={styles.checkoutDataDisplayContainer}>
                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText]}>
                                        {`${translate('interactions.checkout.my')} Qoins`}
                                    </Text>
                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText]}>
                                        {this.props.qoins}
                                    </Text>
                                </View>
                            </View> */}
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
                                            {totalCost}
                                        </Text>
                                        <images.svg.arrowDownWhite style={[styles.totalArrow, {
                                            transform: [{ rotate: this.state.totalOpen ? '0deg' : '180deg' }],
                                        }]} />
                                    </View>

                                </View>

                            </TouchableOpacity>
                            {this.state.totalOpen && <View style={[styles.checkoutDataDisplayMainContainer, styles.marginTop16]}>
                                <View style={styles.checkoutDataDisplayContainer}>
                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                        Extra Tip
                                    </Text>
                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                        {this.state.extraTip}
                                    </Text>
                                </View>
                                {Object.keys(costs).map((product) => (
                                    <>
                                        {costs[product] !== 0 &&
                                            <View style={[styles.checkoutDataDisplayContainer, styles.marginTop8]}>
                                                <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                                    {product !== CUSTOM_TTS_VOICE ?
                                                        translate(`interactions.checkout.concepts.${product}`)
                                                        :
                                                        `${messageVoiceData.voiceName} Voice`
                                                    }
                                                </Text>
                                                <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                                    {costs[product]}
                                                </Text>
                                            </View>
                                        }
                                    </>
                                ))}
                                {this.props.navigation.state.params.message &&
                                    <View style={[styles.checkoutDataDisplayContainer, styles.marginTop8]}>
                                        <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                            {`${this.props.navigation.state.params.voiceName} Voice`}
                                        </Text>
                                        <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                            {this.props.navigation.state.params.voiceCost}
                                        </Text>
                                    </View>
                                }
                            </View>}
                            <TouchableOpacity style={styles.checkoutSendButton}>
                                <Text style={styles.checkoutSendButtonText}>
                                    Send Live Interaction
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.checkoutMarginDisplay} />
                        </>
                    }
                </ScrollView>
                <Modal
                    visible={this.state.openEmojiSelector}
                    // visible={true}

                    onRequestClose={() => this.setState({ openEmojiSelector: false })}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={{
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
                            }}>Choose an Emoji</Text>
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
                                    {`100`}
                                </Text>
                            </LinearGradient>
                        </View>
                        <View style={{
                            backgroundColor: '#141539',
                            height: this.state.keyboardOpened ? 370 : 652,
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            overflow: 'hidden',
                        }}>
                            <EmojiSelector
                                onEmojiSelected={this.emojiSelectedHanler}
                                showHistory={false}
                            />
                        </View>

                    </View>
                </Modal >
                <LinkTwitchAccountModal
                    open={this.state.openLinkWitTwitchModal}
                    onClose={() => this.setState({ openLinkWitTwitchModal: false })}
                    onLinkSuccessful={this.onSendInteraction}
                    linkingWithQreatorCode={false} />
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