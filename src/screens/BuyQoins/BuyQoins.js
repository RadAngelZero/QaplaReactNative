import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { getScreenSizeMultiplier, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
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
                    style={styles.gifsContainerLinearGradient}
                >
                    <Image source={images.gif.markRebillet.img}
                        style={styles.markRebillet}
                        resizeMode={'cover'}
                    />
                    <Image source={images.gif.loveTwitch.img}
                        style={styles.loveTwitch}
                        resizeMode={'cover'}
                    />
                    <Image source={images.gif.heartLoveSticker.img}
                        style={styles.heartLoveSticker}
                        resizeMode={'cover'}
                    />
                    <Image source={images.gif.frankTwitch.img}
                        style={styles.frankTwitch}
                        resizeMode={'cover'}
                    />
                    <Image source={images.gif.vibesCat.img}
                        style={styles.vibesCat}
                        resizeMode={'cover'}
                    />
                    <View style={styles.centralGIFContainer}>
                        <Image source={images.gif.whatTheWtf.img}
                            style={styles.centralGIFSize}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={styles.bubbleChat}>
                        <Text style={[styles.whiteText, styles.bubbleChatText]}>
                            {`Diablos señorita 😳`}
                        </Text>
                    </View>
                </LinearGradient>
                <View style={styles.mainContentContainer}>
                    <Text style={[styles.whiteText, styles.header]}>
                        Envía interacciones en vivo
                        usando tus Qoins
                    </Text>
                    <View style={styles.pricesContainer}>
                        <TouchableOpacity
                            onPress={this.handlePack1}
                            style={styles.pack1Container}
                        >
                            <View style={styles.qoinsContainer}>
                                {this.state.qoins1 !== '' && <MaskedView maskElement={
                                    <Text style={[styles.whiteText, styles.qoinsText]}>{this.state.qoins1}</Text>
                                }>
                                    <LinearGradient
                                        colors={['#FFD4FB', '#F5FFCB', '#82FFD2']}
                                        locations={[0.09, 0.49, 0.90]}
                                        useAngle
                                        angle={227}
                                    >
                                        <Text style={[styles.transparentText, styles.qoinsText]}>
                                            {this.state.qoins1}
                                        </Text>
                                    </LinearGradient>
                                </MaskedView>}
                                <images.svg.qoin style={styles.qoin} />
                            </View>
                            <View style={styles.marginTop16}>
                                <Text style={[styles.whiteText, styles.paddingTopFix, styles.bigSubText]}>
                                    {'$2 '}
                                    <Text style={styles.smallSubText}>
                                        USD
                                    </Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.handlePack2}
                            style={{
                                height: 165 * getScreenSizeMultiplier(),
                                marginTop: 9 * getScreenSizeMultiplier(),
                            }}
                        >
                            <LinearGradient
                                colors={['#A716EE', '#2C07FA']}
                                useAngle
                                angle={136}
                                style={styles.pack2Container}>
                                <View style={{
                                    justifyContent: 'center',
                                }}>
                                    <View style={styles.qoinsContainer}>
                                        {this.state.qoins1 !== '' && <MaskedView maskElement={
                                            <Text style={[styles.whiteText, styles.qoinsText]}>
                                                {this.state.qoins2}
                                            </Text>
                                        }>
                                            <LinearGradient
                                                colors={['#FFD4FB', '#F5FFCB', '#82FFD2']}
                                                locations={[0.09, 0.49, 0.90]}
                                                useAngle
                                                angle={197}
                                            >
                                                <Text style={[styles.transparentText, styles.qoinsText]}>
                                                    {this.state.qoins2}
                                                </Text>
                                            </LinearGradient>
                                        </MaskedView>}
                                        <images.svg.qoin style={styles.qoin} />
                                    </View>
                                    <View style={styles.marginTop16}>
                                        <Text style={[styles.whiteText, styles.paddingTopFix, styles.bigSubText]}>
                                            {'$4 '}
                                            <Text style={styles.smallSubText}>
                                                USD
                                            </Text>
                                        </Text>
                                    </View>
                                    <View style={styles.marginTop16}>
                                        <Text style={[styles.whiteText, styles.bigSubText, styles.smallSubText]}>
                                            {'Ahorras 25%'}
                                        </Text>
                                    </View>
                                </View>
                                <Image source={images.gif.thugDoug.img} style={styles.thugDoug} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={{
                        position: 'absolute',
                        backgroundColor: '#141539',
                        top: heightPercentageToPx(4.91),
                        right: widthPercentageToPx(6.4),
                        width: widthPercentageToPx(10.66),
                        height: widthPercentageToPx(10.66),
                        borderRadius: widthPercentageToPx(5.33),
                        shadowColor: '#000',
                        shadowOffset: { width: widthPercentageToPx(1), height: heightPercentageToPx(1.23) },
                        shadowOpacity: 0.5,
                        shadowRadius: widthPercentageToPx(2.66),
                        elevation: widthPercentageToPx(2.66),
                    }}>
                    <images.svg.closeThiccIcon style={{
                        marginLeft: widthPercentageToPx(-0.4),
                    }} />
                </TouchableOpacity>
            </View>
        );
    }
}

export default BuyQoins;