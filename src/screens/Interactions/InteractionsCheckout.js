import React, { Component } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import styles from './style';
import SendInteractionModal from '../../components/InteractionsModals/SendInteractionModal';

class InteractionsCheckout extends Component {

    state = {
        itemID: '',
        itemURL: '',
        itemSize: 0,
        itemRatio: 0,
        itemCost: 0,
        message: '',
        messageCost: 0,
        extraTip: 0,
        tipIncrement: 50,
        minimum: 0,
        userQoins: 50,
        onlyQoins: false,
        streamerName: '',
    }

    addTip = () => {
        this.setState({ extraTip: this.state.extraTip + this.state.tipIncrement });
    }

    subTip = () => {
        console.log('sub');
        if (this.state.extraTip > this.state.minimum) {
            this.setState({ extraTip: this.state.extraTip - this.state.tipIncrement });
        }
        if (this.state.extraTip < this.state.minimum) {
            this.setState({ extraTip: this.state.minimum });
        }
    }

    yesButtonAction = () => {
        this.props.navigation.navigate('InteractionsSent');
    }

    cancel = () => {
        this.props.navigation.goBack();
    }

    componentDidMount() {
        console.log(this.props.navigation);
        console.log(this.props.navigation.dangerouslyGetParent().state.routes);
        const onlyQoins = this.props.navigation.getParam('onlyQoins', false);
        const streamerName = this.props.navigation.dangerouslyGetParent().state.routes[0].params.streamerName;
        this.setState({ streamerName });
        if (onlyQoins) {
            this.setState({ minimum: 50, extraTip: 50, onlyQoins: true });
        }
        var arr = this.props.navigation.dangerouslyGetParent().state.routes;
        arr.map(e => {
            console.log(e);
            if (e.params) {
                if (e.params.cost) {
                    this.setState({ itemCost: e.params.cost, type: e.params.type });
                }
                if (e.params.messageCost) {
                    this.setState({ messageCost: e.params.messageCost });
                }
                if (e.params.itemID) {
                    this.setState({ itemID: e.params.itemID, itemURL: e.params.itemURL, itemSize: e.params.size, itemRatio: e.params.ratio });
                }
                if (e.params.message) {
                    this.setState({ message: e.params.message });
                }
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.innerConatiner}>
                    <View>
                        {this.state.itemID !== '' &&
                            <View style={styles.checkoutItemContainer}>
                                <Image source={{ uri: this.state.itemURL }}
                                    resizeMode={'contain'}
                                    style={{
                                        aspectRatio: this.state.itemRatio,
                                    }} />
                            </View>}
                        {this.state.message !== '' &&
                            <View style={styles.checkoutChatBubble}>
                                <Text style={[styles.whiteText, styles.checkoutChatBubbleText]}>
                                    {this.state.message}
                                </Text>
                            </View>
                        }
                    </View>
                    {this.state.onlyQoins && <View style={styles.sentContainer}>
                        <Text style={[styles.whiteText, styles.sentText, styles.onlyQoinsText]}>
                            {'Apoya a '}
                            <Text style={styles.accentTextColor}>
                                {this.state.streamerName}
                            </Text>
                            {' envíando cheers de Qoins 💚 '}
                        </Text>
                    </View>}
                    {!this.state.onlyQoins && <View style={styles.checkoutContainer}>
                        <View style={styles.checkoutDataDisplayMainContainer}>
                            <View style={styles.checkoutDataDisplayContainer}>
                                <Text style={[styles.whiteText, styles.checkoutDataDisplayText]}>Mis Qoins</Text>
                                <Text style={[styles.whiteText, styles.checkoutDataDisplayText]}>{this.state.userQoins}</Text>
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
                            {this.state.itemID !== '' &&
                                <View style={[styles.checkoutDataDisplayContainer, styles.marginTop8]}>
                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                        GIF
                                    </Text>
                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                        {this.state.itemCost}
                                    </Text>
                                </View>
                            }
                            {this.state.message !== '' &&
                                <View style={[styles.checkoutDataDisplayContainer, styles.marginTop8]}>
                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                        Text-to-Speech
                                    </Text>
                                    <Text style={[styles.whiteText, styles.checkoutDataDisplayText, styles.checkoutDataDisplayTextRegular]}>
                                        {this.state.messageCost}
                                    </Text>
                                </View>
                            }
                        </View>
                        <View style={styles.checkoutMarginDisplay} />
                    </View>}
                </ScrollView>
                <SendInteractionModal
                    baseCost={this.state.itemCost + (this.state.message === '' ? 0 : this.state.messageCost)}
                    extraTip={this.state.extraTip}
                    addTip={this.addTip}
                    subTip={this.subTip}
                    minimum={this.state.minimum}
                    yesButtonAction={this.yesButtonAction}
                    onlyQoins={this.state.onlyQoins}
                    cancel={this.cancel}
                />
            </View >
        );
    }
}

export default InteractionsCheckout;