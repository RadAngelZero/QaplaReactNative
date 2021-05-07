import React, { Component } from 'react';
import {
    Modal,
    View,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import styles from './style';
import QaplaIcon from '../QaplaIcon/QaplaIcon';
import Images from './../../../assets/images';
import EventDetails from './EventDetails';
import EventRegistration from './EventRegistration';
import { isUserLogged } from '../../services/auth';
import EventRegistrationSuccessful from './EventRegistrationSuccessful';
import { userHaveTwitchId, joinEventWithCustomData, getTwitchUserName, substractQaploinsToUser, sendRequestToJoinEvent } from '../../services/database';
import LinkTwitchAccountModal from '../LinkTwitchAccountModal/LinkTwitchAccountModal';
import { subscribeUserToTopic } from '../../services/messaging';
import { EVENTS_TOPIC } from '../../utilities/Constants';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import { translate } from '../../utilities/i18';

class EventDetailsModal extends Component {
    state = {
        eventRegistrationStep: 0,
        showLinkWitTwitchModal: false,
        openEntryDialog: false,
        openUserDontHaveEnoughQoinsDialog: false
    };

    /**
     * Send the user to the next component
     */
    goToNextRegistrationStep = async () => {
        if (this.state.eventRegistrationStep === 0) {
            if (isUserLogged()) {
                //Check if the user have linked their Twitch account
                if (await userHaveTwitchId(this.props.uid)){
                    this.registerTwitchUser();
                } else {
                   this.setState({ showLinkWitTwitchModal: true });
                }
            } else {
                this.props.navigation.navigate('SignIn', { streamer: this.props.events[this.props.eventId].streamerName });
                this.closeModal();
            }
        } else if (this.scrollView) {
            this.scrollView.scrollTo({ y: 0, animated: false });
            this.setState({ eventRegistrationStep: 2 });
        }
    }

    /**
     * Close the modal event
     */
    closeModal = () => {

        /**
         * Reset the step so if the user opens the modal again the first
         * component (EventDetails) is shown
         */
        this.setState({ eventRegistrationStep: 0 });

        this.props.onClose();
    }

    registerUserToEvent = async () => {
        const twitchUserName = await getTwitchUserName(this.props.uid);
        if (this.props.events[this.props.eventId].acceptAllUsers) {
            joinEventWithCustomData(this.props.uid, this.props.eventId, this.props.events[this.props.eventId].eventEntry, { "Twitch Username": twitchUserName });

            /**
             * Subscribe user to topic of the event
             */
            subscribeUserToTopic(this.props.eventId, this.props.uid, EVENTS_TOPIC);
        } else {
            /**
             * Save on the database the request of the user
             */
            await sendRequestToJoinEvent(this.props.eventId, this.props.uid, this.props.events[this.props.eventId].eventEntry, { "Twitch Username": twitchUserName });
        }

        if (this.scrollView) {
            this.scrollView.scrollTo({ y: 0, animated: false });
            this.setState({ eventRegistrationStep: 2 });
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
        if (this.props.qoins >= this.props.events[this.props.eventId].eventEntry) {
            await this.registerUserToEvent();
            await substractQaploinsToUser(this.props.uid, this.props.qoins, this.props.events[this.props.eventId].eventEntry);
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
        if (this.props.qoins >= this.props.events[this.props.eventId].eventEntry) {
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
            this.closeModal();
        }
    }

    registerTwitchUser = () => {
        if (this.props.events[this.props.eventId].eventEntry) {
            this.openRightEntryDialog();
        } else {
            this.registerUserToEvent();
        }
    }

    skipTwitchLogin = () => {
        if (this.scrollView) {
            this.scrollView.scrollTo({ y: 0, animated: false });
            this.setState({ eventRegistrationStep: 1 });
        }
    }

    render() {
        const { platform, game } = this.props.events[this.props.eventId];
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={this.props.open}
                onRequestClose={this.closeModal}>
                <View style={styles.mainContainer}>
                    <ScrollView
                        ref={(scrollView) => this.scrollView = scrollView}
                        contentContainerStyle={styles.eventInfoContainer}>
                        <QaplaIcon
                            touchableStyle={styles.closeIcon}
                            onPress={this.closeModal}>
                            <Images.svg.closeIcon />
                        </QaplaIcon>
                        <View style={styles.container}>
                            {this.state.eventRegistrationStep === 0 &&
                                <EventDetails
                                    event={this.props.events[this.props.eventId]}
                                    eventId={this.props.eventId}
                                    goToNextStep={this.goToNextRegistrationStep}
                                    closeModal={this.closeModal} />
                            }
                            {this.state.eventRegistrationStep === 1 &&
                                <EventRegistration
                                    game={platform && game ? this.props.games[platform][game] : {}}
                                    event={this.props.events[this.props.eventId]}
                                    eventId={this.props.eventId}
                                    goToNextStep={this.goToNextRegistrationStep}
                                    closeModal={this.closeModal} />
                            }
                            {this.state.eventRegistrationStep === 2 &&
                                <EventRegistrationSuccessful
                                    event={this.props.events[this.props.eventId]}
                                    finishProcess={this.closeModal} />
                            }
                        </View>
                    </ScrollView>
                </View>
                <LinkTwitchAccountModal
                    open={this.state.showLinkWitTwitchModal}
                    onClose={() => this.setState({ showLinkWitTwitchModal: false })}
                    onLinkSuccessful={this.registerTwitchUser}
                    onSkipTwitchLink={this.skipTwitchLogin} />
                <ConfirmationDialog
                    visible={this.state.openEntryDialog}
                    closeModal={this.toggleEntryDialog}
                    cancel={this.cancelRegistration}
                    accept={this.validateUserEntry}
                    body={translate('eventDetailsModal.eventEntryDialogBody', { eventEntry: this.props.events[this.props.eventId].eventEntry, qoins: this.props.qoins })} />
                <ConfirmationDialog
                    visible={this.state.openUserDontHaveEnoughQoinsDialog}
                    closeModal={this.toggleUserDontHaveEnoughQoinsDialog}
                    cancelButton={false}
                    accept={this.cancelRegistration}
                    body={translate('eventDetailsModal.notEnoughQoinsDialogBody', { eventEntry: this.props.events[this.props.eventId].eventEntry, qoins: this.props.qoins })} />
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        events: state.logrosReducer,
        games: state.gamesReducer.games,
        uid: state.userReducer.user.id,
        qoins: state.userReducer.user.credits
    }
}

export default connect(mapStateToProps)(withNavigation(EventDetailsModal));
