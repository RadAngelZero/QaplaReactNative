import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import { getMediaTypeCost } from '../../services/database';
import { TTS } from '../../utilities/Constants';

class InteractionsAddTTS extends Component {
    state= {
        mediaCost: null,
        dataFetched: false
    };

    componentDidMount() {
        this.fetchMediaCost()
    }

    fetchMediaCost = async () => {
        const cost = await getMediaTypeCost(TTS);
        if (cost.exists()) {
            this.setState({ mediaCost: cost.val(), dataFetched: true });
        }
    }

    sendTTS = async () => {
        const costsObject = this.props.navigation.getParam('costs', {});
        this.props.navigation.navigate('InteractionsTTS', {
            ...this.props.navigation.state.params,
            costs: {
                [TTS]: this.state.mediaCost,
                ...costsObject
            }
        });
    }

    sendOnlyMedia = () => {
        this.props.navigation.navigate('InteractionsCheckout', { ...this.props.navigation.state.params });
    }

    render() {
        const streamerName = this.props.navigation.getParam('displayName', {});

        if (this.state.dataFetched) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={[styles.innerConatiner, styles.addTTSContainer]}>
                        <Text style={[styles.whiteText, styles.screenHeaderText, styles.screenHeaderTextAddTTS]}>
                            Agrega un Text-to-Speech
                            a tu interacción
                        </Text>
                        <View style={{
                            alignItems: 'flex-start',
                        }}>
                            <TouchableOpacity
                                onPress={this.sendTTS}
                                style={styles.personalizeButtonContainer}
                            >
                                <ImageBackground
                                    source={images.png.InteractionGradient3.img}
                                    style={styles.personalizeButtonBackgroundImage}
                                >
                                    <View style={styles.personalizeButtonIconContainer}>
                                        <images.svg.interactionsTTS />
                                    </View>
                                    <Text style={styles.personalizeButtonIconText} >
                                        Text-to-Speech
                                    </Text>
                                    <View style={styles.personalizeButtonDisplayQoinsContainer}>
                                        <images.svg.qoin style={styles.qoin} />
                                        <Text style={styles.personalizeButtonDisplayQoinsText}>
                                            {this.state.mediaCost}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <View style={styles.chatBubbleContainer}>
                                <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                    {'🗣 Agrega un mensaje con Bot de Voz para' + ' '}
                                    <Text style={[styles.accentTextColor, styles.chatBubbleTextAccent]}>
                                        {streamerName + ' '}
                                    </Text>
                                    {'a tu interacción por' + ' '}
                                    <Text style={[styles.accentTextColor, styles.chatBubbleTextAccent]}>
                                        {'200' + ' '}
                                    </Text>
                                    Qoins
                                </Text>
                            </View>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                onPress={this.sendTTS}
                                style={[styles.bottomButton, styles.bottomButtonBackground]}>
                                <Text style={[styles.whiteText, styles.bottomButtonText]}>
                                    Agregar Text-to-Speech
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.sendOnlyMedia}
                                style={styles.noBottomButton}>
                                <Text style={[styles.bottomButtonText, styles.noBottomButtomText, styles.marginTop16]}>
                                    {'Sólo enviar mi' + ' '}
                                    <Text style={[styles.whiteText, styles.noBottomButtonTextAccent]}>
                                        GIF
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            );
        }

        return <SafeAreaView style={styles.container}></SafeAreaView>;
    }

}

export default InteractionsAddTTS;