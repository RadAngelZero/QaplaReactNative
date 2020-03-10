import React, { Component } from 'react';
import { Modal, View, TouchableWithoutFeedback, Text } from 'react-native';

import styles from './style';
import Images from './../../../assets/images';
import { translate } from '../../utilities/i18';

const CloseIcon = Images.svg.closeIcon;

class EventRequirementsModal extends Component {

    /**
     * Close the modal and retry the process of add information to join to a event
     */
    reTryEvent = () => {
        this.props.closeModal();
        this.props.reTry();
    }

    render() {
        return (
            <Modal
                animationType='fade'
                transparent
                visible={this.props.open}
                onRequestClose={this.props.closeModal}>
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        <TouchableWithoutFeedback onPress={this.props.closeModal}>
                            <View style={styles.closeIcon}>
                                <CloseIcon />
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.modalTitle}>{translate('activeAchievementsScreen.eventAchievement.eventRequirementsModal.title')}</Text>
                        <Text style={styles.description}>
                            {translate('activeAchievementsScreen.eventAchievement.eventRequirementsModal.body')}
                        </Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableWithoutFeedback onPress={this.props.closeModal}>
                                <View style={styles.cancelTextButton}>
                                    <Text style={styles.textOfButtons}>{translate('activeAchievementsScreen.eventAchievement.eventRequirementsModal.close')}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={this.reTryEvent}>
                                <View style={styles.saveTextButton}>
                                    <Text style={styles.textOfButtons}>{translate('activeAchievementsScreen.eventAchievement.eventRequirementsModal.addInfo')}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default EventRequirementsModal;
