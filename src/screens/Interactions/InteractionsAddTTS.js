import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { translate } from '../../utilities/i18';
import styles from './style';
import images from '../../../assets/images';

class InteractionsAddTTS extends Component {

    state = {
        streamerName: '',
        messageCost: 0,
        visualType: 'GIF',
    }

    componentDidMount() {
        const streamerName = this.props.navigation.dangerouslyGetParent().state.routes[0].params.streamerName;
        this.setState({ streamerName });
        var arr = this.props.navigation.dangerouslyGetParent().state.routes;
        arr.map(e => {
            console.log(e);
            if (e.params) {
                if (e.params.messageCost) {
                    this.setState({ messageCost: e.params.messageCost });
                }
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.innerConatiner, styles.addTTSContainer]}>
                    <Text style={[styles.whiteText, styles.screenHeaderText, styles.screenHeaderTextAddTTS]}>
                        {translate('interactions.addTTS.addTTSInYourInteraction')}
                    </Text>
                    <View style={{
                        alignItems: 'flex-start',
                    }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('InteractionsTTS')}
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
                                        {'200'}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                        <View style={styles.chatBubbleContainer}>
                            <Text style={[styles.whiteText, styles.chatBubbleText]}>
                                {`${translate('interactions.addTTS.addAMessageP1')} `}
                                <Text style={[styles.accentTextColor, styles.chatBubbleTextAccent]}>
                                    {`${this.state.streamerName} `}
                                </Text>
                                {`${translate('interactions.addTTS.addAMessageP2')} `}
                                <Text style={[styles.accentTextColor, styles.chatBubbleTextAccent]}>
                                    {`${this.state.messageCost} `}
                                </Text>
                                Qoins
                            </Text>
                        </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('InteractionsTTS')}
                            style={[styles.bottomButton, styles.bottomButtonBackground]}
                        >
                            <Text style={[styles.whiteText, styles.bottomButtonText]}>
                                {`${translate('interactions.addTTS.add')}`}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.bottomButton}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('InteractionsCheckout')}
                                style={styles.noBottomButton}
                            >
                                <Text style={[styles.bottomButtonText, styles.noBottomButtomText]}>
                                    {`${translate('interactions.addTTS.onlySendMy')} `}
                                    <Text style={[styles.whiteText, styles.noBottomButtonTextAccent]}>
                                        {this.state.visualType}
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        )
    }

}

export default InteractionsAddTTS;