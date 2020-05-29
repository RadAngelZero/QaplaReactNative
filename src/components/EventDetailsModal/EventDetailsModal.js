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

class EventDetailsModal extends Component {
    state = {
        eventRegistrationStep: 0
    };

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

        this.props.onClose();
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
                                    goToNextStep={this.goToNextRegistrationStep} />
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
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        events: state.logrosReducer,
        games: state.gamesReducer.games
    }
}

export default connect(mapStateToProps)(withNavigation(EventDetailsModal));
