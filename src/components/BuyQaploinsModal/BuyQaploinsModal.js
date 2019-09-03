// diego          - 02-09-2019 - us91 - Add track segment statistic
// diego           - 20-08-2019 - us89 - Removed custom Modal component and change to react native modal
//                                       addQaploinsToUser for iOS beta

import React, { Component } from 'react';
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';

import images from './../../../assets/images';
import styles from './style';
import { addQaploinsToUserCloudFunction } from '../../services/functions';
import { trackOnSegment } from '../../services/statistics';

const QaploinIcon = images.svg.qaploinsIcon;

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
            <Modal animationType='none'
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
