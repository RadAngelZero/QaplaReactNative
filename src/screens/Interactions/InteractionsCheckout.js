import React, { Component } from 'react';
import { Alert, Image, Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';

import { translate } from '../../utilities/i18';
import styles from './style';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import SendInteractionModal from '../../components/InteractionsModals/SendInteractionModal';
import { sendCheers } from '../../services/database';
import LinkTwitchAccountModal from '../../components/LinkTwitchAccountModal/LinkTwitchAccountModal';
import { isUserLogged } from '../../services/auth';
import { BlurView } from '@react-native-community/blur';

class InteractionsCheckout extends Component {
    state = {
        extraTip: 0,
        tipIncrement: 50,
        interactionCost: 0,
        minimum: 0,
        openLinkWitTwitchModal: false,
        confirmCancelOpen: false,
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
        if (isUserLogged()) {
            if (this.props.twitchId && this.props.twitchUserName) {
                const totalCost = this.state.interactionCost + this.state.extraTip;
                console.log(totalCost, this.props.qoins);
                if (totalCost <= this.props.qoins) {
                    const streamerId = this.props.navigation.getParam('streamerId', '');
                    const streamerName = this.props.navigation.getParam('displayName', '');
                    const selectedMedia = this.props.navigation.getParam('selectedMedia', null);
                    const mediaType = this.props.navigation.getParam('mediaType');
                    const message = this.props.navigation.getParam('message', null);
                    let media = null;
                    if (selectedMedia && selectedMedia.original) {
                        media = {
                            ...selectedMedia.original,
                            type: mediaType
                        };
                    }

                    try {
                        // await sendCheers(
                        //     totalCost,
                        //     media,
                        //     message,
                        //     (new Date()).getTime(),
                        //     streamerName,
                        //     this.props.uid,
                        //     this.props.userName,
                        //     this.props.twitchUserName,
                        //     this.props.photoUrl,
                        //     streamerId
                        // );

                        this.props.navigation.navigate('InteractionsSent', {
                            ...this.props.navigation.state.params,
                            donationTotal: totalCost
                        });
                    } catch (error) {
                        Alert.alert(
                            'Error',
                            'We could not complete the operation, try again later',
                            [
                                {
                                    text: 'Ok'
                                }
                            ]
                        )
                    }
                } else {
                    // After a successful buy try to send the interaction again
                    this.props.navigation.navigate('BuyQoins', { onSuccessfulBuy: this.onSendInteraction });
                }
            } else {
                this.setState({ openLinkWitTwitchModal: true });
            }
        } else {
            this.props.navigation.navigate('SignIn');
        }
    }

    onCancel = () => {
        this.setState({ confirmCancelOpen: true });
    }

    render() {
        const selectedMedia = this.props.navigation.getParam('selectedMedia');
        const message = this.props.navigation.getParam('message', '');
        const costs = this.props.navigation.getParam('costs', {});
        const onlyQoins = this.props.navigation.getParam('onlyQoins', false);

        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.innerConatiner}>
                    <View>
                        <View style={{
                            borderRadius: 10,
                            overflow: 'hidden',
                            justifyContent: 'center',
                            maxHeight: heightPercentageToPx(20),
                            maxWidth: '60%',
                        }}>
                            {selectedMedia &&
                                <Image source={selectedMedia.original.url ? { uri: selectedMedia.original.url } : null}
                                    resizeMode="contain"
                                    style={{
                                        aspectRatio: (selectedMedia.original.width / selectedMedia.original.height) || 0,
                                    }} />
                            }
                        </View>
                        {message !== '' &&
                            <View style={styles.checkoutChatBubble}>
                                <Text style={[styles.whiteText, styles.checkoutChatBubbleText]}>
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
                            <View style={[styles.checkoutContainer, styles.checkoutDataDisplayMainContainer]}>
                                <View style={styles.checkoutDataDisplayContainer}>
                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText]}>
                                        {`${translate('interactions.checkout.my')} Qoins`}
                                    </Text>
                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText]}>
                                        {this.props.qoins}
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.checkoutDataDisplayMainContainer, styles.marginTop16]}>
                                <View style={styles.checkoutDataDisplayContainer}>
                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                        Extra Tip
                                    </Text>
                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                        {this.state.extraTip}
                                    </Text>
                                </View>
                                {Object.keys(costs).map((product) => (
                                    <View style={[styles.checkoutDataDisplayContainer, styles.marginTop8]}>
                                        <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                            {translate(`interactions.checkout.concepts.${product}`)}
                                        </Text>
                                        <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                            {costs[product]}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                            <View style={styles.checkoutMarginDisplay} />
                        </>
                    }
                </ScrollView>
                <Modal
                    visible={this.state.confirmCancelOpen}
                >
                    <TouchableWithoutFeedback
                        onPress={() => this.setState({ confirmCancelOpen: false })}
                    >
                        <View style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <BlurView style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                            }}
                                blurAmount={20}
                                blurType="dark"
                                reducedTransparencyFallbackColor="white"
                            />
                            <TouchableWithoutFeedback>
                                <View style={{
                                    backgroundColor: '#141539',
                                    padding: widthPercentageToPx(6.4),
                                    borderRadius: widthPercentageToPx(8),
                                }}>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 24,
                                    }}>
                                        ¿Estas seguro?
                                    </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: heightPercentageToPx(2),
                                        justifyContent: 'flex-end',
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ confirmCancelOpen: false })}
                                        >
                                            <Text style={{
                                                color: '#fff',
                                                fontSize: 20,
                                            }}>NO</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('MainBottomNavigator')}>
                                            <Text style={{
                                                color: '#fff',
                                                fontSize: 20,
                                                marginLeft: widthPercentageToPx(4),
                                            }}>SI</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <SendInteractionModal
                    baseCost={this.state.interactionCost}
                    extraTip={this.state.extraTip}
                    addTip={this.addTip}
                    subTip={this.subTip}
                    minimum={this.state.minimum}
                    onlyQoins={onlyQoins}
                    onSendInteraction={this.onSendInteraction}
                    onCancel={this.onCancel} />
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