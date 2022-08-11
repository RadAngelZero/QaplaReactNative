import React, { Component } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import * as RNIap from 'react-native-iap';

import { getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
import images from '../../../assets/images';
import styles from './style';
import { translate } from '../../utilities/i18';
import { isUserLogged } from '../../services/auth';
import { setOnPurchaseFinished } from '../../actions/purchasesActions';
import { trackOnSegment } from '../../services/statistics';

const productIds = Platform.select({
    ios: [
        '2kQoins',
        '4kQoinsPlus'
    ],
    android: [
        '2kqoins',
        '4kqoinsplus'
    ]
});

class BuyQoins extends Component {
    state = {
        qoins1: null,
        qoins2: null,
    };
    purchaseUpdateSubscription = null;
    purchaseErrorSubscription = null;

    componentDidMount() {
        trackOnSegment('Buy Qoins Screen Opened');
        this.fetchProducts();
    }

    fetchProducts = async () => {
        const rniapProds = await RNIap.getProducts(productIds);
        this.setState({ qoins1: rniapProds[0], qoins2: rniapProds[1] });
    }

    requestPurchase = async (sku) => {
        if (isUserLogged()) {
            trackOnSegment('Purchase Attempt');
            try {
                this.props.setOnFinishPurchase(this.props.navigation.getParam('onSuccessfulBuy', () => { }));
                await RNIap.requestPurchase(sku, false);
            } catch (err) {
                console.warn(err.code, err.message);
            }
        } else {
            this.props.navigation.navigate('SignIn');
        }
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
                        <Image source={images.gif.llevare10.img}
                            style={styles.centralGIFSize}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={styles.bubbleChat}>
                        <Text style={[styles.whiteText, styles.bubbleChatText]}>
                            {`${translate('buyQoins.pharases.p1')}`}
                        </Text>
                    </View>
                </LinearGradient>
                <View style={styles.mainContentContainer}>
                    <Text style={[styles.whiteText, styles.header]}>
                        {`${translate('buyQoins.sendInteractiunsUsingQoins')}`}
                    </Text>
                    {this.state.qoins1 && this.state.qoins2 &&
                        <View style={styles.pricesContainer}>
                            <TouchableOpacity
                                onPress={() => this.requestPurchase(this.state.qoins1.productId)}
                                style={styles.pack1Container}>
                                <View style={styles.qoinsContainer}>
                                    <MaskedView maskElement={
                                        <Text style={[styles.whiteText, styles.qoinsText]}>
                                            {this.state.qoins1.description}
                                        </Text>
                                    }>
                                        <LinearGradient
                                            colors={['#FFD4FB', '#F5FFCB', '#82FFD2']}
                                            locations={[0.09, 0.49, 0.90]}
                                            useAngle
                                            angle={227}>
                                            <Text style={[styles.transparentText, styles.qoinsText]}>
                                                {this.state.qoins1.description}
                                            </Text>
                                        </LinearGradient>
                                    </MaskedView>
                                    <images.svg.qoin style={styles.qoin} />
                                </View>
                                <View style={styles.marginTop16}>
                                    <Text style={[styles.whiteText, styles.paddingTopFix, styles.bigSubText]}>
                                        {`$${this.state.qoins1.price} `}
                                        <Text style={styles.smallSubText}>
                                            {this.state.qoins1.currency}
                                        </Text>
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.requestPurchase(this.state.qoins2.productId)}
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
                                            {this.state.qoins2.title !== '' && <MaskedView maskElement={
                                                <Text style={[styles.whiteText, styles.qoinsText]}>
                                                    {this.state.qoins2.description}
                                                </Text>
                                            }>
                                                <LinearGradient
                                                    colors={['#FFD4FB', '#F5FFCB', '#82FFD2']}
                                                    locations={[0.09, 0.49, 0.90]}
                                                    useAngle
                                                    angle={197}
                                                >
                                                    <Text style={[styles.transparentText, styles.qoinsText]}>
                                                        {this.state.qoins2.description}
                                                    </Text>
                                                </LinearGradient>
                                            </MaskedView>}
                                            <images.svg.qoin style={styles.qoin} />
                                        </View>
                                        <View style={styles.marginTop16}>
                                            <Text style={[styles.whiteText, styles.paddingTopFix, styles.bigSubText]}>
                                                {`$${this.state.qoins2.price} `}
                                                <Text style={styles.smallSubText}>
                                                    {this.state.qoins2.currency}
                                                </Text>
                                            </Text>
                                        </View>
                                        <View style={styles.marginTop16}>
                                            <Text style={[styles.whiteText, styles.bigSubText, styles.smallSubText]}>
                                                {translate('buyQoins.save')}
                                            </Text>
                                        </View>
                                    </View>
                                    <Image source={images.gif.thugDoug.img} style={styles.thugDoug} />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={styles.closeIconContainer}>
                    <images.svg.closeIcon />
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setOnFinishPurchase: (onFinishPurchase) => setOnPurchaseFinished(onFinishPurchase)(dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyQoins);