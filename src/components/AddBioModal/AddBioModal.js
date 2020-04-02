import React, { Component } from 'react';
import { Modal, View, TouchableWithoutFeedback, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import Images from './../../../assets/images';
import { updateUserBio } from '../../services/database';
import { translate } from '../../utilities/i18';
import QaplaIcon from '../QaplaIcon/QaplaIcon';

const CloseIcon = Images.svg.closeIcon;

class AddBioModal extends Component {
    state = {
        bio: '',
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
        this.setState({ Bio: '', selected: false });
        this.props.onClose();
    }

    /**
     * Call to the database function to update the biography of the user and then close the modal
     */
    updateBio = () => {
        updateUserBio(this.props.uid, this.state.bio);
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
                        <QaplaIcon onPress={this.closeModal} touchableStyle={styles.closeIcon}>
                            <CloseIcon />
                        </QaplaIcon>
                        <Text style={styles.modalTitle}>{translate('settingsMenuScreen.addBioModal.title')}</Text>
                        <TextInput
                            onFocus={this.toggleInputSelection}
                            onBlur={this.toggleInputSelection}
                            placeholder={translate('settingsMenuScreen.addBioModal.placeholder')}
                            placeholderTextColor='#B5B5B5'
                            defaultValue={this.props.bio}
                            multiline
                            numberOfLines={2}
                            style={[styles.qaplaTextInput, { borderBottomColor: this.state.selected ? '#3DF9DF' : '#B5B5B5' } ]}
                            autoCapitalize='none'
                            onChangeText={(bio) => this.setState({ bio })} />
                        <View style={styles.buttonsContainer}>
                            <TouchableWithoutFeedback onPress={this.closeModal}>
                                <View style={styles.cancelTextButton}>
                                    <Text style={styles.textOfButtons}>{translate('settingsMenuScreen.addBioModal.cancel')}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={this.updateBio}>
                                <View style={styles.saveTextButton}>
                                    <Text style={styles.textOfButtons}>{translate('settingsMenuScreen.addBioModal.done')}</Text>
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
        uid: state.userReducer.user.id,
        bio: state.userReducer.user.bio
    }
}

export default connect(mapStateToProps)(AddBioModal);
