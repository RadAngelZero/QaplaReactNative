import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
import images from '../../../assets/images';
import styles from './style';

class BuyQoins extends Component {
    state = {
        qoins1: '',
        qoins2: '',
    };

    componentDidMount() {
        setTimeout(() => { this.setState({ qoins1: '2,000', qoins2: '4,500' }) }, 1000);
    }

    handlePack1 = () => {
        console.log('Cobrese 2 dolares');
        this.props.navigation.goBack();
    }

    handlePack2 = () => {
        console.log('Cobrese 4 dolares');
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['#FFD4FB', '#F5FFCB', '#82FFD2']}
                    locations={[0.12, 0.49, 0.85]}
                    useAngle
                    angle={224}
                    style={{
                        width: '100%',
                        height: 287 * getScreenSizeMultiplier(),
                    }}
                >
                    <Image source={images.gif.markRebillet.img}
                        style={{
                            position: 'absolute',
                            width: 72 * getScreenSizeMultiplier(),
                            height: 97 * getScreenSizeMultiplier(),
                            top: 56 * getScreenSizeMultiplier(),
                            left: 68 * getScreenSizeMultiplier(),
                        }}
                        resizeMode={'cover'}
                    />
                    <Image source={images.gif.loveTwitch.img}
                        style={{
                            position: 'absolute',
                            width: 146 * getScreenSizeMultiplier(),
                            height: 151 * getScreenSizeMultiplier(),
                            top: -2.5 * getScreenSizeMultiplier(),
                            left: 196.5 * getScreenSizeMultiplier(),
                            transform: [{ rotate: '35deg' }],
                        }}
                        resizeMode={'cover'}
                    />
                    <Image source={images.gif.heartLoveSticker.img}
                        style={{
                            position: 'absolute',
                            width: 115 * getScreenSizeMultiplier(),
                            height: 96 * getScreenSizeMultiplier(),
                            top: 42 * getScreenSizeMultiplier(),
                            left: 127 * getScreenSizeMultiplier(),
                        }}
                        resizeMode={'cover'}
                    />
                    <Image source={images.gif.frankTwitch.img}
                        style={{
                            position: 'absolute',
                            width: 134 * getScreenSizeMultiplier(),
                            height: 99 * getScreenSizeMultiplier(),
                            top: 138 * getScreenSizeMultiplier(),
                            left: 33 * getScreenSizeMultiplier(),
                        }}
                        resizeMode={'cover'}
                    />
                    <Image source={images.gif.vibesCat.img}
                        style={{
                            position: 'absolute',
                            width: 112 * getScreenSizeMultiplier(),
                            height: 76 * getScreenSizeMultiplier(),
                            top: 143 * getScreenSizeMultiplier(),
                            left: 232 * getScreenSizeMultiplier(),
                        }}
                        resizeMode={'cover'}
                    />
                    <View style={{
                        marginTop: 91 * getScreenSizeMultiplier(),
                        borderRadius: 10 * getScreenSizeMultiplier(),
                        width: 167 * getScreenSizeMultiplier(),
                        height: 167 * getScreenSizeMultiplier(),
                        alignSelf: 'center',
                        overflow: 'hidden',
                    }}>
                        <Image source={images.gif.whatTheWtf.img}
                            style={{
                                width: 167 * getScreenSizeMultiplier(),
                                height: 167 * getScreenSizeMultiplier(),
                            }}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={{
                        backgroundColor: '#3B4BF9',
                        marginTop: 12,
                        paddingHorizontal: 22.5,
                        paddingVertical: 11,
                        borderRadius: 20,
                        borderTopRightRadius: 4,
                        alignSelf: 'center',
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 14,
                            fontWeight: '600',
                            lineHeight: 24,
                            letterSpacing: 0.30000001192092896,
                        }}>Diablos señorita 😳</Text>
                    </View>
                </LinearGradient>
                <View style={{
                    flex: 1,
                    marginTop: 44 * getScreenSizeMultiplier(),
                    paddingHorizontal: 24 * getScreenSizeMultiplier(),
                    justifyContent: 'space-between',
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 22,
                        fontWeight: '600',
                        lineHeight: 26,
                        letterSpacing: 0,
                        maxWidth: 265 * getScreenSizeMultiplier(),
                        textAlign: 'center',
                        alignSelf: 'center',
                    }}>
                        Envía interacciones en vivo
                        usando tus Qoins
                    </Text>
                    <View style={{
                        marginBottom: 40 * getScreenSizeMultiplier(),
                    }}>
                        <TouchableOpacity
                            onPress={this.handlePack1}
                            style={{
                                backgroundColor: '#141539',
                                borderRadius: 20 * getScreenSizeMultiplier(),
                                height: 119 * getScreenSizeMultiplier(),
                                width: '100%',
                                justifyContent: 'center',
                                paddingLeft: 22 * getScreenSizeMultiplier(),
                            }}
                        >
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                {this.state.qoins1 !== '' && <MaskedView maskElement={
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 30,
                                        fontWeight: '700',
                                        lineHeight: 36,
                                        letterSpacing: 1,
                                    }}>{this.state.qoins1}</Text>
                                }>
                                    <LinearGradient
                                        colors={['#FFD4FB', '#F5FFCB', '#82FFD2']}
                                        locations={[0.09, 0.49, 0.90]}
                                        useAngle
                                        angle={227}
                                    >
                                        <Text style={{
                                            color: '#fff0',
                                            fontSize: 30,
                                            fontWeight: '700',
                                            lineHeight: 36,
                                            letterSpacing: 1,
                                        }}>{this.state.qoins1}</Text>
                                    </LinearGradient>
                                </MaskedView>}
                                <images.svg.qoin style={{
                                    minWidth: 32 * getScreenSizeMultiplier(),
                                    maxWidth: 32 * getScreenSizeMultiplier(),
                                    minHeight: 32 * getScreenSizeMultiplier(),
                                    maxHeight: 32 * getScreenSizeMultiplier(),
                                    marginLeft: 10 * getScreenSizeMultiplier(),
                                }} />
                            </View>
                            <View style={{
                                marginTop: 16 * getScreenSizeMultiplier(),
                            }}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 20,
                                    lineHeight: 24,
                                    fontWeight: '600',
                                    letterSpacing: 1,
                                    paddingTop: 5,
                                }}>{'$2 '}
                                    <Text style={{
                                        fontSize: 14,
                                        lineHeight: 17,
                                    }}>USD</Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.handlePack2}
                            style={{
                                height: 165 * getScreenSizeMultiplier(),
                                width: '100%',
                                marginTop: 9 * getScreenSizeMultiplier(),
                            }}
                        >
                            <LinearGradient
                                colors={['#A716EE', '#2C07FA']}
                                locations={[-0.018, 0.88]}
                                useAngle
                                angle={136}
                                style={{
                                    flex: 1,
                                    borderRadius: 20 * getScreenSizeMultiplier(),
                                    paddingLeft: 22 * getScreenSizeMultiplier(),
                                    paddingRight: 24 * getScreenSizeMultiplier(),
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                <View style={{
                                    justifyContent: 'center',
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        {this.state.qoins1 !== '' && <MaskedView maskElement={
                                            <Text style={{
                                                color: '#fff',
                                                fontSize: 30,
                                                fontWeight: '700',
                                                lineHeight: 36,
                                                letterSpacing: 1,
                                            }}>{this.state.qoins2}</Text>
                                        }>
                                            <LinearGradient
                                                colors={['#FFD4FB', '#F5FFCB', '#82FFD2']}
                                                locations={[0.09, 0.49, 0.90]}
                                                useAngle
                                                angle={227}
                                            >
                                                <Text style={{
                                                    color: '#fff0',
                                                    fontSize: 30,
                                                    fontWeight: '700',
                                                    lineHeight: 36,
                                                    letterSpacing: 1,
                                                }}>{this.state.qoins2}</Text>
                                            </LinearGradient>
                                        </MaskedView>}
                                        <images.svg.qoin style={{
                                            minWidth: 32 * getScreenSizeMultiplier(),
                                            maxWidth: 32 * getScreenSizeMultiplier(),
                                            minHeight: 32 * getScreenSizeMultiplier(),
                                            maxHeight: 32 * getScreenSizeMultiplier(),
                                            marginLeft: 10 * getScreenSizeMultiplier(),
                                        }} />
                                    </View>
                                    <View style={{
                                        marginTop: 16 * getScreenSizeMultiplier(),
                                    }}>
                                        <Text style={{
                                            color: '#fff',
                                            fontSize: 20,
                                            lineHeight: 24,
                                            fontWeight: '600',
                                            letterSpacing: 1,
                                            paddingTop: 5,
                                        }}>{'$4 '}
                                            <Text style={{
                                                fontSize: 14,
                                                lineHeight: 17,
                                            }}>USD</Text>
                                        </Text>
                                    </View>
                                    <View style={{
                                        marginTop: 16 * getScreenSizeMultiplier(),
                                    }}>
                                        <Text style={{
                                            color: '#fff',
                                            fontSize: 14,
                                            fontWeight: '600',
                                            lineHeight: 17,
                                            letterSpacing: 1,
                                        }}>
                                            {'Ahorras 25%'}
                                        </Text>
                                    </View>
                                </View>
                                <Image source={images.gif.thugDoug.img} style={{
                                    width: 96 * getScreenSizeMultiplier(),
                                    height: 96 * getScreenSizeMultiplier(),
                                    alignSelf: 'center',
                                }} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default BuyQoins;