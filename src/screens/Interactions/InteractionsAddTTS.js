import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

import { getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
import styles from './style';
import images from '../../../assets/images';
import { getMediaTypeCost } from '../../services/database';
import { TTS } from '../../utilities/Constants';

class InteractionsAddTTS extends Component {
    state= {
        mediaCost: null
    };

    componentDidMount() {
        this.fetchMediaCost()
    }

    fetchMediaCost = async () => {
        const cost = await getMediaTypeCost(TTS);
        if (cost.exists()) {
            this.setState({ mediaCost: cost.val() });
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
        return (
            <View style={styles.container}>
                <View style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    marginTop: 42 * getScreenSizeMultiplier(),
                    paddingHorizontal: 16 * getScreenSizeMultiplier(),
                    justifyContent: 'space-between',
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 22 * getScreenSizeMultiplier(),
                        fontWeight: '600',
                        lineHeight: 32 * getScreenSizeMultiplier(),
                        letterSpacing: 0,
                        maxWidth: 256 * getScreenSizeMultiplier(),
                    }}>
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
                        <View style={{
                            backgroundColor: '#141539',
                            paddingHorizontal: 24 * getScreenSizeMultiplier(),
                            paddingVertical: 16 * getScreenSizeMultiplier(),
                            borderRadius: 20 * getScreenSizeMultiplier(),
                            borderTopLeftRadius: 4 * getScreenSizeMultiplier(),
                            marginTop: 16 * getScreenSizeMultiplier(),
                        }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 16 * getScreenSizeMultiplier(),
                                fontWeight: '400',
                                lineHeight: 24 * getScreenSizeMultiplier(),
                                letterSpacing: 0,
                                maxWidth: 250 * getScreenSizeMultiplier(),

                            }}>
                                {'🗣 Agrega un mensaje con Bot de Voz para' + ' '}
                                <Text style={{
                                    color: '#00FFDD',
                                    fontWeight: '500',
                                }}>
                                    {'Danae' + ' '}
                                </Text>
                                {'a tu interacción por' + ' '}
                                <Text style={{
                                    color: '#00FFDD',
                                    fontWeight: '500',
                                }}>
                                    {'200' + ' '}
                                </Text>
                                Qoins
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        maxWidth: 260 * getScreenSizeMultiplier(),
                        alignSelf: 'center',
                    }}>

                        <TouchableOpacity
                            onPress={this.sendTTS}
                            style={{
                                backgroundColor: '#3B4BF9',
                                width: 260 * getScreenSizeMultiplier(),
                                height: 74 * getScreenSizeMultiplier(),
                                borderRadius: 37 * getScreenSizeMultiplier(),
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{
                                color: '#fff',
                                fontSize: 17 * getScreenSizeMultiplier(),
                                fontWeight: '600',
                                lineHeight: 22 * getScreenSizeMultiplier(),
                                letterSpacing: 0.492000013589859 * getScreenSizeMultiplier(),

                            }}>
                                Agregar Text-to-Speech
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.sendOnlyMedia}
                            style={{
                                backgroundColor: '#0000',
                                width: 260 * getScreenSizeMultiplier(),
                                height: 74 * getScreenSizeMultiplier(),
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{
                                color: '#FFFFFF99',
                                fontSize: 17 * getScreenSizeMultiplier(),
                                fontWeight: '500',
                                lineHeight: 22 * getScreenSizeMultiplier(),
                                letterSpacing: 1 * getScreenSizeMultiplier(),
                            }}>
                                {'Sólo enviar mi' + ' '}
                                <Text style={{ color: '#fff', fontWeight: '600', }}>
                                    GIF
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }

}

export default InteractionsAddTTS;