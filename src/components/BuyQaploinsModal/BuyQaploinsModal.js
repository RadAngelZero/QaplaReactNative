// diego             - 11-12-2019 - us160 - Updated analitycs
// diego             - 12-12-2019 - us166 - Added checkout (removed addQaploinsToUser)
// diego             - 21-10-2019 - us135 - Update reference for qaploins and price
// diego             - 12-09-2019 - us99 - Updated closeIcon (changed text icon for SVG icon)
// diego             - 02-09-2019 - us91 - Add track segment statistic
// diego             - 20-08-2019 - us89 - Modal.js component from components folder changed to react-nativenative modal
//                                         addQaploinsToUser for iOS beta

import React, { Component } from 'react';
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import styles from './style';
import Images from './../../../assets/images';
import { QAPLOIN_PACKAGES } from '../../utilities/Constants';

const CloseIcon = Images.svg.closeIcon;
const QaploinIcon = Images.svg.qaploinsIcon;

class BuyQaploinsModal extends Component {
    state = {
        qaploinsAdded: false
    };

    /**
     * Redirect to checkout screen (PayPal process to buy qaploins)
     */
    addQaploinsToUser = () => {
        trackOnSegment('User Buy Qaploins', {
            UserQaploins: this.props.userQaploins,
            Origin: this.props.openWhen
        });
        this.props.navigation.navigate('CheckOut', { previousScreen: this.props.currentScreen });
        this.props.onClose();
    }

    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.open}
                onRequestClose={this.props.onClose}>
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        <TouchableWithoutFeedback onPress={this.props.onClose}>
                            <View style={styles.closeIcon}>
                                <CloseIcon />
                            </View>
                        </TouchableWithoutFeedback>
                        <QaploinIcon height={40} width={40} />
                        {/**
                            Goingo to the definition of QAPLOIN_PACKAGES to get more info. about this array
                         */}
                        <Text style={styles.qaploinsToBuyText}>{QAPLOIN_PACKAGES[0].qaploins}</Text>
                        <Text style={styles.qaploinsText}>Qaploins</Text>
                        <Text style={styles.paragraph}>
                            {this.state.qaploinsAdded ?
                                'Gratis para usuarios de la versión beta'
                                :
                                this.props.body
                            }
                        </Text>
                        <TouchableWithoutFeedback onPress={this.addQaploinsToUser}>
                            <View style={styles.buyButton}>
                                {/**
                                    Goingo to the definition of QAPLOIN_PACKAGES to get more info. about this array
                                */}
                                <Text style={styles.priceText}>{this.state.qaploinsAdded ? 'Qaploins listos!' : QAPLOIN_PACKAGES[0].price }</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        userQaploins: state.userReducer.user.credits,
        currentScreen: state.screensReducer.currentScreenId
    };
}

export default connect(mapStateToProps)(withNavigation(BuyQaploinsModal));
