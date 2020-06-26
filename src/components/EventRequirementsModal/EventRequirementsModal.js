import React, { Component } from 'react';
import { Modal, View, TouchableWithoutFeedback } from 'react-native';

import styles from './style';
import Images from './../../../assets/images';
import { translate } from '../../utilities/i18';
import QaplaIcon from '../QaplaIcon/QaplaIcon';
import QaplaText from '../QaplaText/QaplaText';

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
                        <QaplaIcon onPress={this.props.closeModal} touchableStyle={styles.closeIcon}>
                            <CloseIcon />
                        </QaplaIcon>
                        <QaplaText style={styles.modalTitle}>
                            {translate('activeAchievementsScreen.eventAchievement.eventRequirementsModal.title')}
                        </QaplaText>
                        <QaplaText style={styles.description}>
                            {translate('activeAchievementsScreen.eventAchievement.eventRequirementsModal.body')}
                        </QaplaText>
                        <View style={styles.buttonsContainer}>
                            <TouchableWithoutFeedback onPress={this.props.closeModal}>
                                <View style={styles.cancelTextButton}>
                                    <QaplaText style={styles.textOfButtons}>
                                        {translate('activeAchievementsScreen.eventAchievement.eventRequirementsModal.close')}
                                    </QaplaText>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={this.reTryEvent}>
                                <View style={styles.saveTextButton}>
                                    <QaplaText style={styles.textOfButtons}>
                                        {translate('activeAchievementsScreen.eventAchievement.eventRequirementsModal.addInfo')}
                                    </QaplaText>
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
