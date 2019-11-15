// diego             - 21-10-2019 - us135 - Update reference for qaploins and price
// diego             - 12-09-2019 - us99 - Updated closeIcon (changed text icon for SVG icon)
// diego             - 02-09-2019 - us91 - Add track segment statistic
// diego             - 20-08-2019 - us89 - Modal.js component from components folder changed to react-nativenative modal
//                                         addQaploinsToUser for iOS beta

import React, { Component } from 'react';
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './style';
import { addQaploinsToUserCloudFunction } from '../../services/functions';
import Images from './../../../assets/images';
import { trackOnSegment } from '../../services/statistics';
import { QAPLOIN_PACKAGES } from '../../utilities/Constants';

const CloseIcon = Images.svg.closeIcon;
const QaploinIcon = Images.svg.qaploinsIcon;

/**
 * The logic of this component was changed for the iOS beta, instead of navigate to CheckOutPaymentScreen just
 * add qaploins to the user calling a cloud function, once the beta has finished the code must be changed for
 * the original (Original code in commit: 5029533a510c1164d4d5996e1041c00db8d8c735)
 */
class BuyQaploinsModal extends Component {
    state = {
        qaploinsAdded: false
    };

    /**
     * Call the CF to add qaploins to the user (iOS beta version)
     */
    addQaploinsToUser = async () => {
        try {
            if (!this.state.qaploinsAdded) {
                addQaploinsToUserCloudFunction();
                this.setState({ qaploinsAdded: true });
                trackOnSegment('Add Qaploins To User');
            } else {
                this.props.onClose();
            }
        } catch (error) {
            console.error(error);
        }
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
                                'Puedes devolver los 300 Qaploins cuando quieras ¡y te haremos un reembolso!'
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

export default withNavigation(BuyQaploinsModal);
