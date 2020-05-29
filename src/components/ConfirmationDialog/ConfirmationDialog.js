import React, { Component } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

import styles from './style';
import QaplaIcon from '../QaplaIcon/QaplaIcon';
import Images from '../../../assets/images';
import { isFunction } from '../../utilities/utils';
import { translate } from '../../utilities/i18';

class ConfirmationDialog extends Component {
    cancelOption = () => {
        if (isFunction(this.props.cancel)) {
            this.props.cancel();
        }

        this.props.closeModal();
    }

    acceptOption = () => {
        if (isFunction(this.props.accept)) {
            this.props.accept();
        }

        this.props.closeModal();
    }

    render() {
        return (
            <Modal
                animationType='fade'
                transparent
                visible={this.props.visible}
                onRequestClose={this.cancelOption}>
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        <QaplaIcon onPress={this.cancelOption} touchableStyle={styles.closeIcon}>
                            <Images.svg.closeIcon />
                        </QaplaIcon>
                        <Text style={styles.modalTitle}>
                            {this.props.body}
                        </Text>
                        <View style={styles.buttonsContainer}>
                            {this.props.cancelButton &&
                                <TouchableOpacity
                                    style={styles.cancelTextButton}
                                    onPress={this.cancelOption}>
                                    <Text style={styles.textOfButtons}>
                                        {this.props.cancelText ?
                                            this.props.cancelText
                                            :
                                            translate('confirmationDialog.cancelButton')
                                        }
                                    </Text>
                                </TouchableOpacity>
                            }
                            <TouchableOpacity
                                style={styles.saveTextButton}
                                onPress={this.acceptOption}>
                                <Text style={styles.textOfButtons}>
                                    {this.props.acceptText ?
                                        this.props.acceptText
                                        :
                                        translate('confirmationDialog.acceptButton')
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

ConfirmationDialog.defaultProps = {
    cancelButton: true
};

export default ConfirmationDialog;
