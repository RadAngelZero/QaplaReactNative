import React, { Component } from 'react';
import { Alert, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import * as RNIap from 'react-native-iap';
/* import {
    endConnection,
    finishTransaction,
    flushFailedPurchasesCachedAsPendingAndroid,
    getProducts,
    initConnection,
    purchaseErrorListener,
    purchaseUpdatedListener,
    requestPurchase
} from 'react-native-iap'; */

import { getScreenSizeMultiplier, heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import images from '../../../assets/images';
import styles from './style';
import { translate } from '../../utilities/i18';
import { getProductsQonversion, purchaseProduct } from '../../services/Qonversion';
import { isUserLogged } from '../../services/auth';
import { iOSPurchasesTest } from '../../services/database';

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


    componentDidMount() {
        this.setPurchasesListeners();
    }

    setPurchasesListeners = async () => {
        try {
            await this.fetchProducts();
        } catch (error) {
            console.log('Error while connecting to store', error);
        }
    }

    componentWillUnmount() {
        RNIap.endConnection();
        if (this.purchaseUpdateSubscription) {
            this.purchaseUpdateSubscription.remove();
            this.purchaseUpdateSubscription = null;
        }
        if (this.purchaseErrorSubscription) {
            this.purchaseErrorSubscription.remove();
            this.purchaseErrorSubscription = null;
        }
    }

    requestPurchase = async (sku) => {
        try {
            const purchase = await RNIap.requestPurchase(sku, false);
            console.log('After Buy call');
        } catch (err) {
            console.warn(err.code, err.message);
        }
    }

    fetchProducts = async () => {
        const rniapProds = await RNIap.getProducts(productIds);
        this.setState({ qoins1: rniapProds[0], qoins2: rniapProds[1] });
    }

    handlePack1 = () => {
        if (isUserLogged()) {
            purchaseProduct(this.props.uid, this.state.qoins1, () => {
                this.props.navigation.goBack();
            }, () => {
                Alert.alert(
                    translate('buyQoins.pendingPaymentAlert.title'),
                    translate('buyQoins.pendingPaymentAlert.message'),
                    [
                        {
                            text: 'Ok'
                        }
                    ]
                )
            });
        } else {
            this.props.navigation.navigate('SignIn');
        }
    }

    handlePack2 = () => {
        if (isUserLogged()) {
            purchaseProduct(this.props.uid, this.state.qoins2, () => {
                this.props.navigation.goBack();
            }, () => {
                Alert.alert(
                    translate('buyQoins.pendingPaymentAlert.title'),
                    translate('buyQoins.pendingPaymentAlert.message'),
                    [
                        {
                            text: 'Ok'
                        }
                    ]
                )
            });
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

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}

export default connect(mapStateToProps)(BuyQoins);