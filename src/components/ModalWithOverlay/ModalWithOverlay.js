import React, { Component } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';

import styles from './style';
import images from './../../../assets/images';

class ModalWithOverlay extends Component {
    render() {
        return (
            <Modal visible={this.props.open}
                onRequestClose={this.props.onClose}
                onShow={this.props.onShow}
                animationType='slide'
                transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <TouchableOpacity style={styles.closeModalIcon} onPress={this.props.onClose}>
                            <images.svg.closeIcon style={styles.closeIcon} />
                        </TouchableOpacity>
                        {this.props.children}
                    </View>
                </View>
            </Modal>
        );
    }
}

ModalWithOverlay.defaultProps = {
    onShow: () => {}
};

export default ModalWithOverlay;