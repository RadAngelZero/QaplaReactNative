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
        userQoins: 50,
    }

    addTip = () => {
        this.setState({ extraTip: this.state.extraTip + this.state.tipIncrement });
    }

    subTip = () => {
        console.log('sub');
        if (this.state.extraTip > 0) {
            this.setState({ extraTip: this.state.extraTip - this.state.tipIncrement });
        }
        if (this.state.extraTip < 0) {
            this.setState({ extraTip: 0 });
        }
    }

    sendInteractionHandler = () => {
        this.props.navigation.navigate('BuyQoins');
    }

    componentDidMount() {
        console.log(this.props.navigation);
        console.log(this.props.navigation.dangerouslyGetParent().state.routes);
        var arr = this.props.navigation.dangerouslyGetParent().state.routes;
        arr.map(e => {
            console.log(e);
            if (e.params) {
                if (e.params.cost) {
                    this.setState({ itemCost: e.params.cost, type: e.params.type, messageCost: e.params.messageCost });
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
                    <View style={styles.checkoutContainer}>
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
                    </View>
                </ScrollView>
                <SendInteractionModal
                    baseCost={this.state.itemCost + (this.state.message === '' ? 0 : this.state.messageCost)}
                    extraTip={this.state.extraTip}
                    addTip={this.addTip}
                    subTip={this.subTip}
                    sendInteraction={this.sendInteractionHandler}
                    cancel={() => console.log('cancel')}
                />
            </View >
        );
    }
}

export default InteractionsCheckout;