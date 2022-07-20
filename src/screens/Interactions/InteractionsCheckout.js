import React, { Component } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { translate } from '../../utilities/i18';
import styles from './style';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import SendInteractionModal from '../../components/InteractionsModals/SendInteractionModal';
import { sendCheers } from '../../services/database';
import LinkTwitchAccountModal from '../../components/LinkTwitchAccountModal/LinkTwitchAccountModal';
import { isUserLogged } from '../../services/auth';

class InteractionsCheckout extends Component {
    state = {
        extraTip: 0,
        tipIncrement: 50,
        interactionCost: 0,
        minimum: 0,
        openLinkWitTwitchModal: false
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
            if (true) {
                const totalCost = this.state.interactionCost + this.state.extraTip;
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
                        await sendCheers(
                            totalCost,
                            media,
                            message,
                            (new Date()).getTime(),
                            streamerName,
                            this.props.uid,
                            this.props.userName,
                            this.props.twitchUserName,
                            this.props.photoUrl,
                            streamerId
                        );

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
                    this.props.navigation.navigate('BuyQoins');
                }
            } else {
                this.setState({ openLinkWitTwitchModal: true });
            }
        } else {
            this.props.navigation.navigate('SignIn');
        }
    }

    onCancel = () => {
        this.props.navigation.goBack();
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
                        }}>
                        {selectedMedia &&
                            <Image source={selectedMedia.original.url ? { uri: selectedMedia.original.url } : null}
                                resizeMode='contain'
                                style={{
                                    maxHeight: heightPercentageToPx(20),
                                    maxWidth: '60%',
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
                            <View style={styles.checkoutContainer}>
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