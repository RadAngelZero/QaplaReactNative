import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import { sendRequestToJoinEvent, joinEvent } from '../../services/database';
import { getLocaleLanguage, translate } from '../../utilities/i18';
import { subscribeUserToTopic } from '../../services/messaging';
import { EVENTS_TOPIC } from '../../utilities/Constants';

class EventRegistration extends Component {
    constructor(props) {
    	super(props);

        this.textInputRefs = [];

    	this.state = {
            userData: {},
            requestError: false,
            error: false
        };
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

                    /**
                     * Save on the database the request of the user
                     */
                    await sendRequestToJoinEvent(this.props.eventId, this.props.uid, this.state.userData);

                    /**
                     * If the user is accepted by the streamer then the cloud function
                     * executed subscribe the user to the event
                     */

                    /**
                     * Send the user to the next modal
                     */
                    this.props.goToNextStep();
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
            }
        } else {
            try {
                joinEvent(this.props.uid, this.props.eventId, null);

                /**
                 * Subscribe user to topic of the event
                 */
                subscribeUserToTopic(this.props.eventId, this.props.uid, EVENTS_TOPIC);
                this.props.goToNextStep();
            } catch (error) {
                console.error(error);
                this.setState({ requestError: true });
            }
        }
    }

    onSubmitEditing = (index) => {
        if (index === Object.keys(this.props.game.informationNeededToAdd).length - 1) {
            this.saveUserRequest();
        } else {
            this.textInputRefs[index + 1].focus();
        }
    }

    render() {
        if (this.props.game && this.props.game.informationNeededToAdd) {
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
                            onPress={this.saveUserRequest}>
                            <Text style={styles.continueButtonText}>
                                {translate('eventDetailsModal.continue')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            this.saveUserRequest();
            return (<></>);
        }
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        userName: state.userReducer.user.userName,
        token: state.userReducer.user.token
    }
}

export default connect(mapStateToProps)(EventRegistration);