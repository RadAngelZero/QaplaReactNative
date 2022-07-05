import React, { Component } from 'react';
import { View, Image, Text, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import { heightPercentageToPx, getScreenSizeMultiplier } from '../../utilities/iosAndroidDim'

class InteractionsPersonalize extends Component {
    render() {
        const photoUrl = this.props.navigation.getParam('photoUrl', '');
        const displayName = this.props.navigation.getParam('displayName', '');
        const isStreaming = this.props.navigation.getParam('isStreaming', '');

        return (
            <SafeAreaView style={[styles.container, { paddingHorizontal: 16 * getScreenSizeMultiplier()}]}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: heightPercentageToPx(2),
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: '#141539',
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 4,
                    }}
                        onPress={() => this.props.navigation.goBack()}>
                        <images.svg.leftArrowThiccIcon />
                    </TouchableOpacity>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 16,
                    }}>
                        <Image
                            source={{ uri: photoUrl }}
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                            }}
                        />
                        <Text style={{
                            color: '#fff',
                            fontSize: 18,
                            fontWeight: '500',
                            letterSpacing: 0.5,
                            lineHeight: 20,
                            marginLeft: 8,
                        }}>
                            {displayName}
                        </Text>
                        {isStreaming &&
                            <View style={{
                                backgroundColor: '#FF006B',
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                marginLeft: 6,
                            }} />
                        }
                    </View>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 16,
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 22,
                        fontWeight: '600',
                        lineHeight: 32,
                    }}>
                        {'Personaliza tu interacción'}
                    </Text>
                    <TouchableOpacity style={{
                        backgroundColor: '#22272F',
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 10,
                    }}>
                        <images.svg.questionMark />
                    </TouchableOpacity>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    marginTop: 8,
                }}>
                    <TouchableOpacity
                        onPress={() => console.log('a')}
                        style={styles.personalizeButtonContainer}
                    >
                        <ImageBackground
                            source={images.png.InteractionGradient1.img}
                            style={styles.personalizeButtonBackgroundImage}
                        >
                            <View style={styles.personalizeButtonIconContainer}>
                                <images.svg.interactionsGIF />
                            </View>
                            <Text style={styles.personalizeButtonIconText} >
                                GIFs
                            </Text>
                            <View style={styles.personalizeButtonDisplayQoinsContainer}>
                                <images.svg.qoin />
                                <Text style={styles.personalizeButtonDisplayQoinsText}>
                                    {'100'}
                                </Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log('b')}
                        style={styles.personalizeButtonContainer}
                    >
                        <ImageBackground
                            source={images.png.InteractionGradient2.img}
                            style={styles.personalizeButtonBackgroundImage}
                        >
                            <View style={styles.personalizeButtonIconContainer}>
                                <images.svg.interactionsSticker />
                            </View>
                            <Text style={styles.personalizeButtonIconText} >
                                Sticker
                            </Text>
                            <View style={styles.personalizeButtonDisplayQoinsContainer}>
                                <images.svg.qoin />
                                <Text style={styles.personalizeButtonDisplayQoinsText}>
                                    {'100'}
                                </Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log('c')}
                        style={styles.personalizeButtonContainer}
                    >
                        <ImageBackground
                            source={images.png.InteractionGradient3.img}
                            style={styles.personalizeButtonBackgroundImage}
                        >
                            <View style={styles.personalizeButtonIconContainer}>
                                <images.svg.interactionsClip />
                            </View>
                            <Text style={styles.personalizeButtonIconText} >
                                Clips
                            </Text>
                            <View style={styles.personalizeButtonDisplayQoinsContainer}>
                                <images.svg.qoin />
                                <Text style={styles.personalizeButtonDisplayQoinsText}>
                                    {'200'}
                                </Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log('d')}
                        style={styles.personalizeButtonContainer}
                    >
                        <ImageBackground
                            source={images.png.InteractionGradient4.img}
                            style={styles.personalizeButtonBackgroundImage}
                        >
                            <View style={styles.personalizeButtonIconContainer}>
                                <images.svg.interactionsTtGiphy />
                            </View>
                            <Text style={styles.personalizeButtonIconText} >
                                Texto Giphy
                            </Text>
                            <View style={styles.personalizeButtonDisplayQoinsContainer}>
                                <images.svg.qoin />
                                <Text style={styles.personalizeButtonDisplayQoinsText}>
                                    {'50'}
                                </Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log('e')}
                        style={styles.personalizeButtonContainer}
                    >
                        <ImageBackground
                            source={images.png.InteractionGradient5.img}
                            style={styles.personalizeButtonBackgroundImage}
                        >
                            <View style={styles.personalizeButtonIconContainer}>
                                <images.svg.interactionsTTS />
                            </View>
                            <Text style={styles.personalizeButtonIconText} >
                                TTS
                            </Text>
                            <View style={styles.personalizeButtonDisplayQoinsContainer}>
                                <images.svg.qoin />
                                <Text style={styles.personalizeButtonDisplayQoinsText}>
                                    {'200'}
                                </Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log('f')}
                        style={styles.personalizeButtonContainer}
                    >
                        <ImageBackground
                            source={images.png.InteractionGradient6.img}
                            style={styles.personalizeButtonBackgroundImage}
                        >
                            <View style={styles.personalizeButtonIconContainer}>
                                <images.svg.interactionsMemes />
                            </View>
                            <Text style={styles.personalizeButtonIconText} >
                                Memes
                            </Text>
                            <View style={styles.personalizeButtonDisplayQoinsContainer}>
                                <images.svg.qoin />
                                <Text style={styles.personalizeButtonDisplayQoinsText}>
                                    {'100'}
                                </Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity style={{
                        display: 'flex',
                        alignSelf: 'center',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                    }}>
                        <Text style={{
                            color: '#FFFFFF99',
                            fontSize: 16,
                            fontWeight: '500',
                            lineHeight: 28,
                            letterSpacing: 1,
                        }}>
                            {'Sólo enviar' + ' '}
                            <Text style={{ color: '#FFFFFF' }}>
                                Qoins
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

}

export default InteractionsPersonalize;