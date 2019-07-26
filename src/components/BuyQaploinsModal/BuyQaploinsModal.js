import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import images from './../../../assets/images';
import Modal from '../Modal/Modal';
import styles from './style';
import { withNavigation } from 'react-navigation';

const QaploinIcon = images.svg.qaploinsIcon;

class BuyQaploinsModal extends Component {
    render() {
        return (
            <Modal open={this.props.open} onClose={this.props.onClose}>
                <View style={styles.container}>
                    <QaploinIcon height={40} width={40} />
                    <Text style={styles.qaploinsToBuyText}>750</Text>
                    <Text style={styles.qaploinsText}>Qaploins</Text>
                    <Text style={styles.paragraph}>
                        Puedes devolver los 750 Qaploins cuando quieras ¡y te haremos un reembolso!
                    </Text>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CheckOut')}>
                        <View style={styles.buyButton}>
                            <Text style={styles.priceText}>$50 MXN</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.smallText}>Costo por devolución $10 MXN</Text>
                </View>
            </Modal>
        );
    }
}

export default withNavigation(BuyQaploinsModal);
