import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './style';
import images from '../../../assets/images';

class InteractionsAddTTS extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.innerConatiner, styles.addTTSContainer]}>
                    <Text style={[styles.whiteText, styles.screenHeaderText, styles.screenHeaderTextAddTTS]}>
                        Agrega un Text-to-Speech
                        a tu interacción
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
                                {'🗣 Agrega un mensaje con Bot de Voz para' + ' '}
                                <Text style={[styles.accentTextColor, styles.chatBubbleTextAccent]}>
                                    {'Danae' + ' '}
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
                            onPress={() => this.props.navigation.navigate('InteractionsTTS')}
                            style={[styles.bottomButton, styles.bottomButtonBackground]}
                        >
                            <Text style={[styles.whiteText, styles.bottomButtonText]}>
                                Agregar Text-to-Speech
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.bottomButton}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('InteractionsCheckout')}
                                style={styles.noBottomButton}
                            >
                                <Text style={[styles.bottomButtonText, styles.noBottomButtomText]}>
                                    {'Sólo enviar mi' + ' '}
                                    <Text style={[styles.whiteText, styles.noBottomButtonTextAccent]}>
                                        GIF
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