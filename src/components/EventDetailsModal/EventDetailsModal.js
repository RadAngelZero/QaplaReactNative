import React, { Component } from 'react';
import {
    Modal,
    View,
    ScrollView,
    TouchableHighlight,
    Dimensions,
    Animated,
    Easing
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import styles from './style';
import QaplaIcon from '../QaplaIcon/QaplaIcon';
import QaplaText from '../../components/QaplaText/QaplaText';
import Images from './../../../assets/images';
import { translate, getLocaleLanguage } from '../../utilities/i18';
import { userHasRequestToJoinEvent, isUserParticipantOnEvent } from '../../services/database';
import EventDetails from './EventDetails';
import EventRegistration from './EventRegistration';
import { isUserLogged } from '../../services/auth';
import EventRegistrationSuccessful from './EventRegistrationSuccessful';

const screen = Dimensions.get('screen');

class EventDetailsModal extends Component {
    state = {
        eventRegistrationStep: 0,
        isParticipant: false,
        existsRequest: false,
        registerButtonAnimation: new Animated.Value(0),
    };

    /**
     * Check if the user has sent a request for this event
     */
    checkUserRequest = async () => {
        this.setState({ existsRequest: await userHasRequestToJoinEvent(this.props.uid, this.props.eventId) });
    }

    /**
     * Check if the user is a participant of this event
     */
    checkIfUserIsParticipant = async () => {
        this.setState({ isParticipant: await isUserParticipantOnEvent(this.props.uid, this.props.eventId) });
    }

    /**
     * Send the user to the next component
     */
    goToNextRegistrationStep = () => {
        if (isUserLogged()) {
            if (this.scrollView) {
                this.scrollView.scrollTo({ y: 0, animated: false });
                this.setState({ eventRegistrationStep: this.state.eventRegistrationStep + 1 });
            }
        } else {
            this.props.navigation.navigate('SignIn');
            this.closeModal();
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

        if (this.state.eventRegistrationStep === 2) {
            this.setState({ isParticipant: true });
        }

        this.state.registerButtonAnimation.setValue(0);

        this.props.onClose();
    }

    onOpenModal = () => {
        this.checkIfUserIsParticipant();
        this.checkUserRequest();
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

    render() {
        const { platform, game } = this.props.events[this.props.eventId];
        return (
            <Modal
                onShow={this.onOpenModal}
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
                        <View style={[styles.container]}>
                            {this.state.eventRegistrationStep === 0 &&
                                <EventDetails
                                    event={this.props.events[this.props.eventId]}
                                    eventId={this.props.eventId}
                                    goToNextStep={this.goToNextRegistrationStep}
                                    closeModal={this.closeModal}
                                    existsRequest={this.state.existsRequest}
                                    isParticipant={this.state.isParticipant} />
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
                    {(!this.state.existsRequest && !this.state.isParticipant && this.state.eventRegistrationStep===0) ?
                    <>
                        <Animated.View style={{height: this.state.registerButtonAnimation.interpolate({inputRange:[0,12], outputRange: [0, + screen.height * 0.115]})}}/>
                        <Animated.View
                            style={[styles.participateButtonContainer, { transform:
                                [{translateY: this.state.registerButtonAnimation.interpolate({inputRange:[0,12], outputRange: [0, - screen.height * 0.115]})}] } ]}
                        >
                            <TouchableHighlight
                            style={{flex:1}}
                            underlayColor='#2aa897'
                            onPress={this.goToNextRegistrationStep}>
                                <QaplaText style={styles.participateButtonText}>
                                    {translate('eventDetailsModal.participate')}
                                </QaplaText>
                            </TouchableHighlight>
                        </Animated.View>
                    </>
                    :
                        <></>
                    }
                </View>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        events: state.logrosReducer,
        games: state.gamesReducer.games,
        uid: state.userReducer.user.id
    }
}

export default connect(mapStateToProps)(withNavigation(EventDetailsModal));
