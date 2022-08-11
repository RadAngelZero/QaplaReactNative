import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';

import { translate } from '../../utilities/i18';
import styles from './style';
import images from '../../../assets/images';
import { getMediaTypeCost } from '../../services/database';
import { GIPHY_GIFS, TTS } from '../../utilities/Constants';
import { trackOnSegment } from '../../services/statistics';

class InteractionsAddTTS extends Component {
    state = {
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
        trackOnSegment('TTS Added After Media Selection');

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
        trackOnSegment('Send Only Media Without TTS');
        this.props.navigation.navigate('InteractionsCheckout', { ...this.props.navigation.state.params });
    }

    state = {
        streamerName: '',
        messageCost: 0,
        visualType: 'GIF',
    }

    render() {
        const streamerName = this.props.navigation.getParam('displayName', {});
        const mediaType = this.props.navigation.getParam('mediaType', GIPHY_GIFS);

        if (this.state.dataFetched) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={[styles.innerConatiner, styles.addTTSContainer]}>
                        <Text style={[styles.whiteText, styles.screenHeaderText, styles.screenHeaderTextAddTTS]}>
                            {translate('interactions.addTTS.addTTSInYourInteraction')}
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
                                    {`${translate('interactions.addTTS.addAMessageP1')} `}
                                    <Text style={[styles.accentTextColor, styles.chatBubbleTextAccent]}>
                                        {streamerName}
                                    </Text>
                                    {`${translate('interactions.addTTS.addAMessageP2')} `}
                                    <Text style={[styles.accentTextColor, styles.chatBubbleTextAccent]}>
                                        {this.state.mediaCost}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                onPress={this.sendTTS}
                                style={[styles.bottomButton, styles.bottomButtonBackground]}>
                                <Text style={[styles.whiteText, styles.bottomButtonText]}>
                                    {`${translate('interactions.addTTS.add')}`}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.sendOnlyMedia}
                                style={styles.noBottomButton}>
                                <Text style={[styles.bottomButtonText, styles.noBottomButtomText, styles.marginTop16]}>
                                    {`${translate('interactions.addTTS.onlySendMy')} `}
                                    <Text style={[styles.whiteText, styles.noBottomButtonTextAccent]}>
                                        {translate(`interactions.addTTS.mediaTypes.${mediaType}`)}
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