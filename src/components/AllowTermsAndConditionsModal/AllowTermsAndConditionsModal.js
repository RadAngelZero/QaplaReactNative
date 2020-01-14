import React, { Component } from 'react';
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import styles from './style';
import Images from './../../../assets/images';
import PrivacyModal from '../PrivacyModal/PrivacyModal';
import CheckBox from '../CheckBox/CheckBox';
import { auth } from '../../utilities/firebase';
import TermsAndConditionsModal from './../../components/TermsAndConditionsModal/TermsAndConditionsModal';
import { translate } from '../../utilities/i18';

const CloseIcon = Images.svg.closeIcon;

/**
 * @augments {Component<Props, State>}
 */
class AllowTermsAndConditionsModal extends Component {
    state = {
        openPrivacyModal: false,
        agreementTermsState: false,
        agreementPrivacyState: false,
        openTermsModal: false
    };

    closePrivacyModal = () => this.setState({ openPrivacyModal: false });

    closeTermsModal = () => this.setState({ openTermsModal: false });

    agreeAndClose = () => this.props.termsAndConditionAccepted(auth.currentUser);

    closeWithoutAgree = () => this.props.termsAndConditionRejected(auth.currentUser);

    toggleAgreementTermsState = () => this.setState({ agreementTermsState: !this.state.agreementTermsState });

    toggleAgreementPrivacyState = () => this.setState({ agreementPrivacyState: !this.state.agreementPrivacyState });

    render() {
        return (
            <Modal
                animationType='fade'
                transparent
                visible={this.props.open}
                onRequestClose={this.closeWithoutAgree}>
                <View style={styles.mainContainer}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalControls}>
                            <TouchableWithoutFeedback onPress={this.closeWithoutAgree}>
                                <View style={styles.closeIcon}>
                                    <CloseIcon />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.modalBody}>
                            <Text style={styles.modalText}>
                                {`${translate('AllowTermsAndConditionsModal.bodyFirstPart')} `}
                                <TouchableWithoutFeedback onPress={() => this.setState({ openTermsModal: true })}>
                                    <Text style={styles.hyperlinkText}>
                                        {translate('AllowTermsAndConditionsModal.termsAndConditions')}
                                    </Text>
                                </TouchableWithoutFeedback>
                                {` ${translate('AllowTermsAndConditionsModal.bodySecondPart')} `}
                                <TouchableWithoutFeedback onPress={() => this.setState({ openPrivacyModal: true })}>
                                    <Text style={styles.hyperlinkText}>
                                        {translate('AllowTermsAndConditionsModal.privacyPolicy')}
                                    </Text>
                                </TouchableWithoutFeedback>
                            </Text>
                            <CheckBox
                                label={translate('AllowTermsAndConditionsModal.agreeWithTerms')}
                                onPress={this.toggleAgreementTermsState} />
                            <CheckBox
                                label={translate('AllowTermsAndConditionsModal.agreeWithPrivacy')}
                                onPress={this.toggleAgreementPrivacyState}
                                style={styles.bottomCheckBox} />
                            <TouchableWithoutFeedback
                                disabled={!this.state.agreementTermsState || !this.state.agreementPrivacyState}
                                onPress={this.agreeAndClose}>
                                    <View style={styles.confirmButton}>
                                        <Text style={styles.confirmButtonText}>
                                            {translate('AllowTermsAndConditionsModal.acceptButton')}
                                        </Text>
                                    </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
                <PrivacyModal
                    open={this.state.openPrivacyModal}
                    onClose={this.closePrivacyModal} />
                <TermsAndConditionsModal
                    open={this.state.openTermsModal}
                    onClose={this.closeTermsModal} />
            </Modal>
        );
    }
}

AllowTermsAndConditionsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    termsAndConditionAccepted: PropTypes.func.isRequired,
    termsAndConditionRejected: PropTypes.func.isRequired
};

export default AllowTermsAndConditionsModal;
