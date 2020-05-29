import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import { sendRequestToJoinEvent, joinEvent, substractQaploinsToUser, joinEventWithCustomData } from '../../services/database';
import { getLocaleLanguage, translate } from '../../utilities/i18';
import { subscribeUserToTopic } from '../../services/messaging';
import { EVENTS_TOPIC } from '../../utilities/Constants';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';

class EventRegistration extends Component {
    constructor(props) {
    	super(props);

        this.textInputRefs = [];

    	this.state = {
            renderScreen: false,
            userData: {},
            requestError: false,
            error: false,
            openEntryDialog: false,
            openUserDontHaveEnoughQoinsDialog: false,
            showLoading: false
        };
    }

    componentDidMount() {
        if (this.props.game && this.props.game.informationNeededToAdd) {
            this.setState({ renderScreen: true });
        } else {
            this.setState({ renderScreen: false });
            if (this.props.event.eventEntry) {
                if (this.props.qoins >= this.props.event.eventEntry) {
                    this.setState({ openEntryDialog: true });
                } else {
                    this.setState({ openUserDontHaveEnoughQoinsDialog: true });
                }
            } else {
                this.setState({ showLoading: true }, () => {
                    setTimeout(this.saveUserRequest, 1000);
                });
            }
        }
    }

    /**
     * Save the given user information on the userData variable state
     * @param {string} key Key of the field filled
     * @param {string} value Value to save
     */
    setUserData = (key, value) => {
        const { userData } = this.state;
        userData[key] = value;
        this.setState({ userData, error: false });
    }

    /**
     * Return true if the given value matches with the given regular expression
     * @param {string} reg Regular expression on string format
     * @param {string} value Value to check
     */
    validateUserField = (reg, value) => {
        const regExp = new RegExp(reg);

        return regExp && value && regExp.test(value);
    }

    /**
     * Validate and save the request of the user
     * @returns {boolean} True when the request is successfully sent
     */
    saveUserRequest = async () => {
        if (this.props.game && this.props.game.informationNeededToAdd) {
            const neededInformation = this.props.game.informationNeededToAdd;

            /**
             * Check if all the fields are filled correctly
             */
            if (!neededInformation || !Object.keys(neededInformation).some((key) => neededInformation[key].required && !this.validateUserField(neededInformation[key].validation, this.state.userData[key]))) {

                try {
                    const userDataToRegister = this.state.userData;
                    userDataToRegister.userName = this.props.userName;
                    userDataToRegister.token = this.props.token;

                    if (this.props.event.acceptAllUsers) {
                        try {
                            joinEventWithCustomData(this.props.uid, this.props.eventId, userDataToRegister);

                            /**
                             * Subscribe user to topic of the event
                             */
                            subscribeUserToTopic(this.props.eventId, this.props.uid, EVENTS_TOPIC);
                            this.props.goToNextStep();
                        } catch (error) {
                            console.error(error);
                            this.setState({ requestError: true });
                        }
                    } else {
                        /**
                         * Save on the database the request of the user
                         */
                        await sendRequestToJoinEvent(this.props.eventId, this.props.uid, this.state.userData);
                    }

                    /**
                     * If the user is accepted by the streamer then the cloud function
                     * executed subscribe the user to the event
                     */

                    /**
                     * Send the user to the next modal
                     */
                    this.props.goToNextStep();

                    return true;
                } catch (error) {
                    console.error(error);
                    this.setState({ requestError: true });
                }
            } else {

                /**
                 * If some of the fields does not contain valid data then display the
                 * error to the user
                 */
                this.setState({ error: true });

                return false;
            }
        } else {
            try {
                joinEvent(this.props.uid, this.props.eventId, null);

                /**
                 * Subscribe user to topic of the event
                 */
                subscribeUserToTopic(this.props.eventId, this.props.uid, EVENTS_TOPIC);
                this.props.goToNextStep();

                return true;
            } catch (error) {
                console.error(error);
                this.setState({ requestError: true });

                return false;
            }
        }
    }

    onSubmitEditing = (index) => {
        if (index === Object.keys(this.props.game.informationNeededToAdd).length - 1) {
            if (this.props.event.eventEntry) {
                this.openRightEntryDialog();
            } else {
                this.saveUserRequest();
            }
        } else {
            this.textInputRefs[index + 1].focus();
        }
    }

    /**
     * Toggle the state of the entry dialog
     */
    toggleEntryDialog = () => this.setState({ openEntryDialog: !this.state.openEntryDialog });

    /**
     * Check if the user has enough qoins to send the request, send the request
     * and substract the qoins from the user profile
     */
    validateUserEntry = async () => {
        if (this.props.qoins >= this.props.event.eventEntry) {
            try {
                if (await this.saveUserRequest()) {
                    await substractQaploinsToUser(this.props.uid, this.props.qoins, this.props.event.eventEntry);
                }
            } catch (error) {
                console.error(error);
                this.setState({ requestError: true });
            }
        } else {
            this.setState({ openUserDontHaveEnoughQoinsDialog: true });
        }
    }

    /**
     * Toggle the state of the user dont have enough Qoins dialog
     */
    toggleUserDontHaveEnoughQoinsDialog = () => this.setState({ openUserDontHaveEnoughQoinsDialog: !this.state.openUserDontHaveEnoughQoinsDialog });

    /**
     * Check if the user has enough Qoins and show the entry dialog
     * If the user do not have enough Qoins then display the user
     * do not have enough Qoins dialog
     */
    openRightEntryDialog = () => {
        if (this.props.qoins >= this.props.event.eventEntry) {
            this.toggleEntryDialog();
        } else {
            this.toggleUserDontHaveEnoughQoinsDialog();
        }
    }

    /**
     * Cancel the registration process
     */
    cancelRegistration = () => {
        this.setState({ openEntryDialog: false, openUserDontHaveEnoughQoinsDialog: false });
        if (!this.state.renderScreen) {
            this.props.closeModal();
        }
    }

    render() {
        if (this.state.renderScreen) {
            const neededInformation = this.props.game.informationNeededToAdd;
            const userLanguage = getLocaleLanguage();

            return (
                <View style={styles.fullHeightDialog}>
                    <Text style={styles.nickNameTitle}>
                        {`${translate('eventDetailsModal.nickName', { acronym: this.props.game.acronym })}`}
                    </Text>
                    <View style={styles.registrationFieldsContainer}>
                        <View style={[styles.eventCard, styles.nickNameCard, this.state.error && styles.cardError]}>
                            <View style={styles.registerContainer}>
                                <Text style={styles.nickNameBody}>
                                    {`${translate('eventDetailsModal.enterNickName', { gameName: this.props.game.name })}`}
                                </Text>
                                {Object.keys(neededInformation).map((fieldKey, index) => (
                                    <TextInput
                                        key={fieldKey}
                                        ref={(textInput) => this.textInputRefs.push(textInput)}
                                        style={styles.gameIdentifierTextInput}
                                        placeholder={`${neededInformation[fieldKey].hint[userLanguage]}${neededInformation[fieldKey].required ? '*' : ''}`}
                                        placeholderTextColor='rgba(235,235,245,0.6)'
                                        onSubmitEditing={() => this.onSubmitEditing(index)}
                                        onChangeText={(value) => this.setUserData(fieldKey, value)} />
                                ))}
                                {this.state.error &&
                                    <Text style={styles.smallErrorText}>
                                        {translate('eventDetailsModal.errorText')}
                                    </Text>
                                }
                                {this.state.requestError &&
                                    <Text style={styles.smallErrorText}>
                                        {translate('eventDetailsModal.errorOnRequest')}
                                    </Text>
                                }
                            </View>
                        </View>
                        <Image
                            source={{ uri: this.props.event.sponsorImage }}
                            style={styles.eventSponsorImageLarge} />
                        <TouchableOpacity
                            style={styles.continueButtonContainer}
                            onPress={this.props.event.eventEntry ? this.openRightEntryDialog : this.saveUserRequest}>
                            <Text style={styles.continueButtonText}>
                                {translate('eventDetailsModal.continue')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ConfirmationDialog
                        visible={this.state.openEntryDialog}
                        closeModal={this.toggleEntryDialog}
                        cancel={this.cancelRegistration}
                        accept={this.validateUserEntry}
                        body={translate('eventDetailsModal.eventEntryDialogBody', { eventEntry: this.props.event.eventEntry, qoins: this.props.qoins })} />
                    <ConfirmationDialog
                        visible={this.state.openUserDontHaveEnoughQoinsDialog}
                        closeModal={this.toggleUserDontHaveEnoughQoinsDialog}
                        cancelButton={false}
                        accept={this.cancelRegistration}
                        body={translate('eventDetailsModal.notEnoughQoinsDialogBody', { eventEntry: this.props.event.eventEntry, qoins: this.props.qoins })} />
                </View>
            );
        } else {
            return (
                <View style={[styles.fullHeightDialog, { justifyContent: 'center' }]}>
                    {this.state.showLoading &&
                        <>
                            <ActivityIndicator size='large' color='rgb(61, 249, 223)' />
                            <Text style={styles.streamerNameLink}>{translate('loadingScreen.activityIndicatorText')}</Text>
                        </>
                    }
                    <ConfirmationDialog
                        visible={this.state.openEntryDialog}
                        closeModal={this.toggleEntryDialog}
                        cancel={this.cancelRegistration}
                        accept={this.validateUserEntry}
                        body={translate('eventDetailsModal.eventEntryDialogBody', { eventEntry: this.props.event.eventEntry, qoins: this.props.qoins })} />
                    <ConfirmationDialog
                        visible={this.state.openUserDontHaveEnoughQoinsDialog}
                        closeModal={this.toggleUserDontHaveEnoughQoinsDialog}
                        cancelButton={false}
                        accept={this.cancelRegistration}
                        body={translate('eventDetailsModal.notEnoughQoinsDialogBody', { eventEntry: this.props.event.eventEntry, qoins: this.props.qoins })} />
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        userName: state.userReducer.user.userName,
        token: state.userReducer.user.token,
        qoins: state.userReducer.user.credits
    }
}

export default connect(mapStateToProps)(EventRegistration);