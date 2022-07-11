import React, { Component } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import SendInteractionModal from '../../components/InteractionsModals/SendInteractionModal';
import { sendCheers } from '../../services/database';

class InteractionsCheckout extends Component {
    state = {
        extraTip: 0,
        tipIncrement: 50,
        interactionCost: 0,
        minimum: 0
    };

    componentDidMount() {
        const costs = this.props.navigation.getParam('costs', {});
        let interactionCost = 0;
        Object.values(costs).forEach((cost) => {
            interactionCost += cost;
        });

        this.setState({ interactionCost });
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
        const totalCost = this.state.interactionCost + this.state.extraTip;
        if (totalCost <= this.props.qoins) {
            const streamerName = this.props.navigation.getParam('displayName');
            const streamerId = this.props.navigation.getParam('streamerId');
            const selectedMedia = this.props.navigation.getParam('selectedMedia', null);
            const mediaType = this.props.navigation.getParam('mediaType');
            const message = this.props.navigation.getParam('message', '');
            let media = null;
            if (selectedMedia && selectedMedia.original) {
                media = {
                    url: selectedMedia.original.url,
                    type: mediaType
                };
            }

            console.log(
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
            /* sendCheers(
                totalCost,
                message,
                (new Date()).getTime(),
                streamerName,
                this.props.uid,
                this.props.userName,
                this.props.twitchUserName,
                this.props.photoUrl,
                streamerId
            ); */
        } else {
            this.props.navigation.navigate('BuyQoins');
        }
    }

    onCancel = () => {
        this.props.navigation.goBack();
    }

    render() {
        const selectedMedia = this.props.navigation.getParam('selectedMedia');
        const message = this.props.navigation.getParam('message');
        const costs = this.props.navigation.getParam('costs', {});

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
                    {this.state.onlyQoins &&
                        <View style={styles.sentContainer}>
                            <Text style={[styles.whiteText, styles.sentText, styles.onlyQoinsText]}>
                                {'Apoya a '}
                                <Text style={styles.accentTextColor}>
                                    {this.state.streamerName}
                                </Text>
                                {' envíando cheers de Qoins 💚 '}
                            </Text>
                        </View>
                    }
                    {!this.state.onlyQoins &&
                        <>
                            <View style={styles.checkoutContainer}>
                                <View style={styles.checkoutDataDisplayContainer}>
                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText]}>
                                        Mis Qoins
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
                                            {product}
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
                    onlyQoins={this.state.onlyQoins}
                    onSendInteraction={this.onSendInteraction}
                    onCancel={this.onCancel}
                />
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
        qoins: state.userReducer.user.credits
    };
}

export default connect(mapStateToProps)(InteractionsCheckout);