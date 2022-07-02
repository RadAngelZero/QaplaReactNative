import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import { getScreenSizeMultiplier, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import styles from './style';

class InteractionsTTS extends Component {

    state = {
        message: '',
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 1,
                    marginTop: 42 * getScreenSizeMultiplier(),
                    paddingHorizontal: 16 * getScreenSizeMultiplier(),
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 22 * getScreenSizeMultiplier(),
                        fontWeight: '600',
                        lineHeight: 32 * getScreenSizeMultiplier(),
                        letterSpacing: 0,
                    }}>
                        Agrega un Text-to-Speech
                        a tu interacción
                    </Text>
                    <View style={{
                        flex: 1,
                        marginTop: 85 * getScreenSizeMultiplier(),
                        justifyContent: 'space-between',
                    }}>
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Image
                                    source={images.png.profileImagePlaceholder1.img}
                                    style={{
                                        width: 32 * getScreenSizeMultiplier(),
                                        height: 32 * getScreenSizeMultiplier(),
                                        borderRadius: 16 * getScreenSizeMultiplier(),
                                    }}
                                />
                                <View style={{ width: 8 * getScreenSizeMultiplier() }} />
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 14 * getScreenSizeMultiplier(),
                                    fontWeight: '600',
                                    lineHeight: 20 * getScreenSizeMultiplier(),
                                    letterSpacing: 0,
                                }}>
                                    Qaplita
                                </Text>
                            </View>
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
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 12 * getScreenSizeMultiplier(),
                        }}>
                            <View style={{
                                backgroundColor: '#141539',
                                borderRadius: 18 * getScreenSizeMultiplier(),
                                width: 297 * getScreenSizeMultiplier(),
                                height: 40 * getScreenSizeMultiplier(),
                                paddingHorizontal: 17 * getScreenSizeMultiplier(),
                            }}>
                                <TextInput style={{
                                    flex: 1,
                                    color: '#fff',
                                    fontSize: 16 * getScreenSizeMultiplier(),
                                    fontWeight: '400',
                                    lineHeight: 24 * getScreenSizeMultiplier(),
                                    letterSpacing: 0,
                                }}
                                    onChange={(e) => this.setState({ message: e.nativeEvent.text })}
                                    value={this.state.message}
                                />
                            </View>
                            <View style={{ width: 16 * getScreenSizeMultiplier() }} />
                            <TouchableOpacity
                                onPress={() => console.log('send' + this.state.message)}
                                disabled={this.state.message === ''}
                                style={{
                                    opacity: this.state.message === '' ? 0.4 : 1,
                                }}
                            >
                                <images.svg.sendChat style={{
                                    minWidth: 30 * getScreenSizeMultiplier(),
                                    minHeight: 30 * getScreenSizeMultiplier(),
                                    maxWidth: 30 * getScreenSizeMultiplier(),
                                    maxHeight: 30 * getScreenSizeMultiplier(),
                                }} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View >
        );
    }
}

export default InteractionsTTS;