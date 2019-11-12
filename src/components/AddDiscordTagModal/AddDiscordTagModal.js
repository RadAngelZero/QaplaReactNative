import React, { Component } from 'react';
import { Modal, View, TouchableWithoutFeedback, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import Images from './../../../assets/images';
import { updateUserDiscordTag } from '../../services/database';

const CloseIcon = Images.svg.closeIcon;

class AddDiscordTagModal extends Component {
    state = {
        discordTag: '',
        selected: false
    };

    /**
     * Toggle the selection of the TextInput so the user can know when the text input is selected
     * (we show the cool border bottom color when selected is true)
     */
    toggleInputSelection = () => {
        this.setState({ selected: !this.state.selected });
    }

    /**
     * Clean the local state and then close the modal
     */
    closeModal = () => {
        this.setState({ discordTag: '', selected: false });
        this.props.onClose();
    }

    /**
     * Call to the database function to update the discord tag of the user and then close the modal
     */
    updateDiscordTag = () => {
        updateUserDiscordTag(this.props.uid, this.state.discordTag);
        this.closeModal();
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
                        <TouchableWithoutFeedback onPress={this.closeModal}>
                            <View style={styles.closeIcon}>
                                <CloseIcon />
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.modalTitle}>Agrega tu tag de Discord</Text>
                        <TextInput
                            onFocus={this.toggleInputSelection}
                            onBlur={this.toggleInputSelection}
                            placeholder='Inserta tu DiscordTag'
                            placeholderTextColor='#B5B5B5'
                            style={[styles.qaplaTextInput, { borderBottomColor: this.state.selected ? '#3DF9DF' : '#B5B5B5' } ]}
                            onChangeText={(discordTag) => this.setState({ discordTag })} />
                        <View style={styles.buttonsContainer}>
                            <TouchableWithoutFeedback onPress={this.closeModal}>
                                <View style={styles.cancelTextButton}>
                                    <Text style={styles.textOfButtons}>Cancelar</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={this.updateDiscordTag}>
                                <View style={styles.saveTextButton}>
                                    <Text style={styles.textOfButtons}>Listo</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    }
}

export default connect(mapStateToProps)(AddDiscordTagModal);
