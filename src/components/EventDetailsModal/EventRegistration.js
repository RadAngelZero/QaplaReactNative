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
import { sendRequestToJoinEvent } from '../../services/database';
import { getLocaleLanguage, translate } from '../../utilities/i18';

class EventRegistration extends Component {
    state = {
        userData: {},
        error: false
    };

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
    saveUserRequest = () => {
        const neededInformation = this.props.game.informationNeededToAdd;

        /**
         * Check if all the fields are filled correctly
         */
        if (!Object.keys(neededInformation).some((key) => neededInformation[key].required && !this.validateUserField(neededInformation[key].validation, this.state.userData[key]))) {

            /**
             * Save on the database the request of the user
             */
            sendRequestToJoinEvent(this.props.eventId, this.props.uid, this.state.userData);

            /**
             * Send the user to the next modal
             */
            this.props.goToNextStep();
        } else {

            /**
             * If some of the fields does not contain valid data then display the
             * error to the user
             */
            this.setState({ error: true });
        }
    }

    render() {
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
                            {Object.keys(neededInformation).map((fieldKey) => (
                                <TextInput
                                    key={fieldKey}
                                    style={styles.gameIdentifierTextInput}
                                    placeholder={`${neededInformation[fieldKey].hint[userLanguage]}${neededInformation[fieldKey].required ? '*' : ''}`}
                                    placeholderTextColor='rgba(235,235,245,0.6)'
                                    onChangeText={(value) => this.setUserData(fieldKey, value)} />
                            ))}
                            {this.state.error &&
                                <Text style={styles.smallErrorText}>
                                    {translate('eventDetailsModal.errorText')}
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
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    }
}

export default connect(mapStateToProps)(EventRegistration);