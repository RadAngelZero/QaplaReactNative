import React, { Component } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import { getScreenSizeMultiplier, heightPercentageToPx } from '../../utilities/iosAndroidDim';
import SendInteractionModal from '../../components/InteractionsModals/SendInteractionModal';
import { sendCheers } from '../../services/database';

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
        mediaType: '',
        selectedMedia: {
            original: {
                url: '',
                width: 0,
                height: 0
            }
        },
        tipIncrement: 50,
        interactionCost: 0
    };

    componentDidMount() {
        const costs = this.props.navigation.getParam('costs', {});
        let interactionCost = 0;
        Object.values(costs).forEach((cost) => {
            console.log(cost);
            interactionCost += cost;
        });

        this.setState({ interactionCost });
    }

    addTip = () => {
        this.setState({ extraTip: this.state.extraTip + this.state.tipIncrement });
    }

    subTip = () => {
        console.log('sub')
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

    onSendInteraction = async () => {
        const totalCost = this.state.interactionCost + this.state.extraTip;
        if (totalCost <= this.props.qoins) {
            const streamerName = this.props.navigation.getParam('displayName');
            const streamerId = this.props.navigation.getParam('streamerId');
            const selectedMedia = this.props.navigation.getParam('selectedMedia');
            const mediaType = this.props.navigation.getParam('mediaType');
            const media = {
                url: selectedMedia.original.url,
                type: mediaType
            };

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
                <ScrollView showsVerticalScrollIndicator={false} style={{
                    flex: 1,
                    marginTop: 32 * getScreenSizeMultiplier(),
                    paddingHorizontal: 16 * getScreenSizeMultiplier(),
                }}>
                    <View>
                            <View style={{
                                borderRadius: 10,
                                overflow: 'hidden',
                                justifyContent: 'center',
                            }}>
                            <Image source={selectedMedia.original.url ? { uri: selectedMedia.original.url } : null}
                                resizeMode='contain'
                                style={{
                                    maxHeight: heightPercentageToPx(20),
                                    maxWidth: '60%',
                                    aspectRatio: (selectedMedia.original.width / selectedMedia.original.height) || 0,
                                }} />
                            </View>
                        {message !== '' &&
                            <View style={{
                                backgroundColor: '#3B4BF9',
                                borderRadius: 20,
                                borderTopLeftRadius: 4,
                                paddingHorizontal: 24,
                                paddingVertical: 16,
                                marginTop: 8,
                                alignSelf: 'flex-start',
                            }}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: '600',
                                    lineHeight: 24,
                                    letterSpacing: 0,
                                }}>{message}</Text>
                            </View>
                        }
                    </View>
                    <View style={{
                        marginTop: 16,
                    }}>
                        <View style={{
                            backgroundColor: '#141539',
                            padding: 24,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderRadius: 25,
                        }}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: '600',
                                    lineHeight: 19,
                                    letterSpacing: 1,
                                }}>Mis Qoins</Text>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: '600',
                                    lineHeight: 19,
                                    letterSpacing: 1,
                                }}>{this.props.qoins}</Text>
                        </View>
                        <View style={{
                            backgroundColor: '#141539',
                            padding: 24,
                            borderRadius: 25,
                            marginTop: 16,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: '500',
                                    lineHeight: 32,
                                    letterSpacing: 0,
                                }}>Extra Tip</Text>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: '500',
                                    lineHeight: 32,
                                    letterSpacing: 0,
                                }}>{this.state.extraTip}</Text>
                            </View>
                            {Object.keys(costs).map((product) => (
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 8,
                                }}>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 16,
                                        fontWeight: '500',
                                        lineHeight: 32,
                                        letterSpacing: 0,
                                    }}>
                                        {product}
                                    </Text>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 16,
                                        fontWeight: '500',
                                        lineHeight: 32,
                                        letterSpacing: 0,
                                    }}>
                                        {costs[product]}
                                    </Text>
                                </View>
                            ))}
                        </View>
                        <View style={{ height: heightPercentageToPx(40) }} />
                    </View>
                </ScrollView>
                <SendInteractionModal
                    baseCost={this.state.interactionCost}
                    extraTip={this.state.extraTip}
                    addTip={this.addTip}
                    subTip={this.subTip}
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
        twitchUserName: state.userReducer.user.twitchUserName,
        photoUrl: state.userReducer.user.photoUrl,
        qoins: state.userReducer.user.credits
    };
}

export default connect(mapStateToProps)(InteractionsCheckout);