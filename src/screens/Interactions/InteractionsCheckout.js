import React, { Component } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import MaskedView from '@react-native-community/masked-view';
import styles from './style';
import { getScreenSizeMultiplier, heightPercentageToPx } from '../../utilities/iosAndroidDim';
import LinearGradient from 'react-native-linear-gradient';
import SendInteractionModal from "../../components/InteractionsModals/SendInteractionModal";

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
        console.log('sub')
        if (this.state.extraTip > 0) {
            this.setState({ extraTip: this.state.extraTip - this.state.tipIncrement });
        }
        if (this.state.extraTip < 0) {
            this.setState({ extraTip: 0 });
        }
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
                <ScrollView style={{
                    flex: 1,
                    marginTop: 32 * getScreenSizeMultiplier(),
                    paddingHorizontal: 16 * getScreenSizeMultiplier(),
                }}>
                    <View>
                        {this.state.itemID !== '' &&
                            <View style={{
                                borderRadius: 10,
                                maxHeight: heightPercentageToPx(20),
                                maxWidth: '60%',
                                overflow: 'hidden',
                                justifyContent: 'center',
                            }}>
                                <Image source={{ uri: this.state.itemURL }}
                                    resizeMode={'contain'}
                                    style={{
                                        aspectRatio: this.state.itemRatio,
                                    }} />
                            </View>}
                        {this.state.message !== '' &&
                            <View style={{
                                backgroundColor: '#3B4BF9',
                                borderRadius: 20,
                                borderTopLeftRadius: 4,
                                paddingHorizontal: 24,
                                paddingVertical: 16,
                                marginTop: 8,
                            }}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: '600',
                                    lineHeight: 24,
                                    letterSpacing: 0,
                                }}>{this.state.message}</Text>
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
                                }}>{this.state.userQoins}</Text>
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
                            {this.state.itemID !== '' &&
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
                                    }}>GIF</Text>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 16,
                                        fontWeight: '500',
                                        lineHeight: 32,
                                        letterSpacing: 0,
                                    }}>{this.state.itemCost}</Text>
                                </View>
                            }
                            {this.state.message !== '' &&
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
                                    }}>Text-to-Speech</Text>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 16,
                                        fontWeight: '500',
                                        lineHeight: 32,
                                        letterSpacing: 0,
                                    }}>{this.state.messageCost}</Text>
                                </View>
                            }
                        </View>
                        <View style={{ height: heightPercentageToPx(40) }} />
                    </View>
                </ScrollView>
                <SendInteractionModal
                    baseCost={this.state.itemCost + (this.state.message === '' ? 0 : this.state.messageCost)}
                    extraTip={this.state.extraTip}
                    addTip={this.addTip}
                    subTip={this.subTip}
                />
            </View >
        );
    }
}

export default InteractionsCheckout;