import React, { Component } from 'react';
import {
    Modal,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Animated,
    Easing,
    Text,
    Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { BlurView, VibrancyView } from '@react-native-community/blur';

import styles from './style';
import QaplaText from '../../components/QaplaText/QaplaText';
import Images from './../../../assets/images';
import { getQaplaLevels, userHasRequestToJoinEvent } from '../../services/database';
import EventDetails from './EventDetails';
import EventRegistration from './EventRegistration';
import { isUserLogged } from '../../services/auth';
import EventRegistrationSuccessful from './EventRegistrationSuccessful';
import { userHaveTwitchId, joinEventWithCustomData, getTwitchUserName, substractQaploinsToUser, sendRequestToJoinEvent } from '../../services/database';
import LinkTwitchAccountModal from '../LinkTwitchAccountModal/LinkTwitchAccountModal';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import { translate, getLocaleLanguage } from '../../utilities/i18';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import { copyDataToClipboard } from '../../utilities/utils';

class EventDetailsModal extends Component {
    state = {
        eventRegistrationStep: 0,
        isParticipant: false,
        existsRequest: false,
        registerButtonAnimation: new Animated.Value(0),
        showLinkWitTwitchModal: false,
        openEntryDialog: false,
        openUserDontHaveEnoughQoinsDialog: false,
        streamTitle: '',
        twitchURLCopied: false,
        qaplaLevels: [],
        qoinsToGive: 0
    };

    userLanguage = getLocaleLanguage();

    componentDidMount() {
        this.getQaplaLevels();
    }

    getQaplaLevels = async () => {
        const qaplaLevels = await getQaplaLevels();
        console.log(qaplaLevels.val());
        this.setState({ qaplaLevels: qaplaLevels.val() });
    }

    /**
     * Check if the user has sent a request for this event
     */
    checkUserRequest = async () => {
        this.setState({ existsRequest: await userHasRequestToJoinEvent(this.props.uid, this.props.stream.id) });
    }

    /**
     * Check if the user is a participant of this event
     */
    checkIfUserIsParticipant = async () => {
        if (this.props.stream) {
            this.setState({ isParticipant: this.props.stream.isUserAParticipant });
        }
    }

    getStreamTite = () => {
        return this.props.stream.title && this.props.stream.title[this.userLanguage] ? this.props.stream.title[this.userLanguage] : this.props.stream.titulo;
    }

    /**
     * Send the user to the next component
     */
    goToNextRegistrationStep = async () => {
        if (this.state.eventRegistrationStep === 0) {
            if (isUserLogged()) {
                //Check if the user have linked their Twitch account
                if (await userHaveTwitchId(this.props.uid)) {
                    this.registerTwitchUser();
                } else {
                    this.setState({ showLinkWitTwitchModal: true });
                }
            } else {
                this.props.navigation.navigate('SignIn', { streamer: this.props.stream.streamerName });
                this.closeModal();
            }
        } else {
            this.setState({ eventRegistrationStep: 2 });
        }
    }

    copyStreamerTwitchURL = () => {
        const { streamerChannelLink } = this.props.stream;
        copyDataToClipboard(streamerChannelLink);
        this.setState({ twitchURLCopied: true });
        setTimeout(() => {
            this.setState({ twitchURLCopied: false });
        }, 3000);
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

        if (this.state.eventRegistrationStep === 2) {
            this.setState({ isParticipant: true });
        }

        this.state.registerButtonAnimation.setValue(0);

        this.props.onClose();
    }

    onOpenModal = () => {
        this.checkIfUserIsParticipant();
        this.checkUserRequest();
        this.setState({ qoinsToGive: 0 }, () => {
            this.setState({ qoinsToGive: this.state.qaplaLevels[this.props.lastSeasonLevel] ? (this.state.qaplaLevels[this.props.lastSeasonLevel].qoinsToGive * this.props.stream.customRewardsMultipliers.qoins) : 0 });
        });
        Animated.sequence([
            Animated.delay(300),
            Animated.timing(this.state.registerButtonAnimation, {
                toValue: 12,
                duration: 250,
                easing: Easing.cubic,
                useNativeDriver: false,
            }),
        ]).start();
    }

    registerUserToEvent = async () => {
        const twitchUserName = await getTwitchUserName(this.props.uid);
        if (this.props.stream.acceptAllUsers) {
            joinEventWithCustomData(this.props.uid, this.props.stream.id, this.props.stream.eventEntry, { "Twitch Username": twitchUserName });
        } else {
            /**
             * Save on the database the request of the user
             */
            await sendRequestToJoinEvent(this.props.stream.id, this.props.uid, this.props.stream.eventEntry, { "Twitch Username": twitchUserName });
        }
        this.setState({ eventRegistrationStep: 2 });
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
        if (this.props.qoins >= this.props.stream.eventEntry) {
            await this.registerUserToEvent();
            await substractQaploinsToUser(this.props.uid, this.props.qoins, this.props.stream.eventEntry);
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
        if (this.props.qoins >= this.props.stream.eventEntry) {
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
        if (this.props.stream.eventEntry) {
            this.openRightEntryDialog();
        } else {
            this.registerUserToEvent();
        }
    }

    skipTwitchLogin = () => {
        this.setState({ eventRegistrationStep: 1 });
    }

    render() {
        if (this.props.stream) {
            const { platform, game } = this.props.stream;

            return (
                <Modal
                    onShow={this.onOpenModal}
                    animationType='slide'
                    transparent={true}
                    visible={this.props.open}
                    onRequestClose={this.closeModal}>
                    <View style={styles.mainContainer}>
                        {Platform.OS === 'ios' ?
                            <VibrancyView
                                blurAmount={100}
                                blurType='thinMaterialDark'
                                reducedTransparencyFallbackColor='black'
                                style={styles.blurView} />
                            :
                            <BlurView
                                blurAmount={100}
                                blurType='dark'
                                style={styles.blurView} />
                        }
                        <View
                            contentContainerStyle={styles.eventInfoContainer}
                            style={styles.modalMainContainer}
                        >
                            <View style={styles.topContainer}>
                                <TouchableOpacity
                                    style={styles.closeIcon}
                                    onPress={this.closeModal}>
                                    <View style={{
                                    }}>
                                        <Images.svg.closeIcon />
                                    </View>
                                </TouchableOpacity>
                                {this.state.eventRegistrationStep !== 2 &&
                                    <Text style={[styles.whiteText, styles.streamTitle]}>
                                        {this.getStreamTite()}
                                    </Text>
                                }
                            </View>
                            <View style={[styles.container,
                                // { marginBottom: (!this.state.existsRequest && !this.state.isParticipant && this.state.eventRegistrationStep === 0) ? heightPercentageToPx(7.5) : 0 }
                            ]}>
                                {this.state.eventRegistrationStep === 0 &&
                                    <EventDetails
                                        qoinsToGive={this.state.qoinsToGive}
                                        event={this.props.stream}
                                        eventId={this.props.stream.id}
                                        goToNextStep={this.goToNextRegistrationStep}
                                        closeModal={this.closeModal}
                                        existsRequest={this.state.existsRequest}
                                        isParticipant={this.state.isParticipant} />
                                }
                                {this.state.eventRegistrationStep === 1 &&
                                    <EventRegistration
                                        game={platform && game ? this.props.games[platform][game] : {}}
                                        event={this.props.stream}
                                        eventId={this.props.stream.id}
                                        goToNextStep={this.goToNextRegistrationStep}
                                        closeModal={this.closeModal} />
                                }
                                {this.state.eventRegistrationStep === 2 &&
                                    <EventRegistrationSuccessful
                                        event={this.props.stream}
                                        finishProcess={this.closeModal} />
                                }
                                {(!this.state.existsRequest && !this.state.isParticipant && this.state.eventRegistrationStep === 0) ?
                                    <Animated.View
                                        style={[styles.participateButtonContainer, {
                                            transform:
                                                [{ translateY: this.state.registerButtonAnimation.interpolate({ inputRange: [0, 12], outputRange: [heightPercentageToPx(15), 0] }) }]
                                        }]}
                                    >
                                        <TouchableHighlight
                                            style={styles.flex1}
                                            underlayColor='#2aa897'
                                            onPress={this.goToNextRegistrationStep}>
                                            <QaplaText style={styles.participateButtonText}>
                                                {translate('eventDetailsModal.participate')}
                                            </QaplaText>
                                        </TouchableHighlight>
                                    </Animated.View>
                                    :
                                    <></>
                                }
                            </View>
                        </View>
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
                        body={translate('eventDetailsModal.eventEntryDialogBody', { eventEntry: this.props.stream.eventEntry, qoins: this.props.qoins })} />
                    <ConfirmationDialog
                        visible={this.state.openUserDontHaveEnoughQoinsDialog}
                        closeModal={this.toggleUserDontHaveEnoughQoinsDialog}
                        cancelButton={false}
                        accept={this.cancelRegistration}
                        body={translate('eventDetailsModal.notEnoughQoinsDialogBody', { eventEntry: this.props.stream.eventEntry, qoins: this.props.qoins })} />
                </Modal>
            );
        }

        return null;
    }
}

function mapStateToProps(state) {
    return {
        games: state.gamesReducer.games,
        uid: state.userReducer.user.id,
        qoins: state.userReducer.user.credits,
        lastSeasonLevel: state.userReducer.user.lastSeasonLevel || 0
    }
}

export default connect(mapStateToProps)(withNavigation(EventDetailsModal));
