// diego           - 20-08-2019 - us89 - Modal.js component from components folder changed to react-nativenative modal
//                                       addQaploinsToUser for iOS beta

import React, { Component } from 'react';
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';

import images from './../../../assets/images';
import styles from './style';
import { addQaploinsToUserCloudFunction } from '../../services/functions';

const QaploinIcon = images.svg.qaploinsIcon;

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
                animationType='none'
                transparent={true}
                visible={this.props.open}
                onRequestClose={this.props.onClose}>
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        <Text style={styles.closeIcon} onPress={this.props.onClose}>X</Text>
                        <QaploinIcon height={40} width={40} />
                        <Text style={styles.qaploinsToBuyText}>750</Text>
                        <Text style={styles.qaploinsText}>Qaploins</Text>
                        <Text style={styles.paragraph}>
                            {this.state.qaploinsAdded ?
                                'Gratis para usuarios de la versión beta'
                                :
                                'Puedes devolver los 750 Qaploins cuando quieras ¡y te haremos un reembolso!'
                            }
                        </Text>
                        <TouchableWithoutFeedback onPress={this.addQaploinsToUser}>
                            <View style={styles.buyButton}>
                                <Text style={styles.priceText}>{this.state.qaploinsAdded ? 'Qaploins listos!' : '$50 MXN'}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.smallText}>
                            {this.state.qaploinsAdded ? 
                                'Los qaploins agregados no tienen valor real y no podran ser retirados'
                                :
                                'Costo por devolución $10 MXN'
                            }
                        </Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default withNavigation(BuyQaploinsModal);
