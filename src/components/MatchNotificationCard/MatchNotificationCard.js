// josep.sanahuja - 08-08-2019 - us85 - + NotEnoughQaploinsModal
// diego          - 06-08-2019 - us68 - Add modal: Delete related notifications
// diego          - 05-08-2019 - us60 - Add declineMatch logic
// diego          - 05-08-2019 - us58 - Accept challenge logic added
// diego          - 01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableWithoutFeedback,
    Text,
    ActivityIndicator,
    Modal
} from 'react-native';

import styles from './style';

import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import {
    getProfileImageWithUID,
    getGameNameOfMatch,
    getMatchWitMatchId,
    declineMatch,
    deleteNotification,
    userHasQaploinsToPlayMatch
} from '../../services/database';

import { retrieveData } from '../../utilities/persistance';

// Cloud Functions
import {
    acceptChallengeRequest
} from '../../services/functions';

// Components
import AcceptChallengeModal from '../AcceptChallengeModal/AcceptChallengeModal';
import NotEnoughQaploinsModal from '../NotEnoughQaploinsModal/NotEnoughQaploinsModal';


class MatchNotificationCard extends Component {
    state = {
        /*
            We use null by default because is the same value that getProfileImageWithUID returns if the user don't have profile image
            In this way the notification loads faster, was implemented because some performance problemas were found using by default value: ''
        */
        avatar: null,
        userName: '',
        gameName: '',
        loading: false,
        openAcceptChallengeModal: false,
        openNoQaploinsModal: false
    };

    componentWillMount() {
        this.fetchNotificationData();
    }

    /**
     * @description Redirect the user to the MatchCard screen, so the user can see the details of the match
     */
    async sendToMatchDetail() {
        this.setState({ loading: true });
        
        matchData = await getMatchWitMatchId(this.props.notification.idMatch);
        matchData['userName'] = this.props.notification.userName;
        
        this.props.navigation.navigate('MatchCard', { matchCard: matchData });
        
        // NOTE: This line of code after navigation seems odd, in fact it will never be called
        // because navigation happens first and changes from component.
        this.setState({ loading: false });
    }

    /**
     * @description Load the info. of the notification
     */
    async fetchNotificationData() {
        try {
            const avatar = await getProfileImageWithUID(this.props.notification.idUserSend);
            const gameName = await getGameNameOfMatch(this.props.notification.idMatch);
            
            this.setState({
                avatar,
                userName: this.props.notification.userName,
                gameName
            });
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @description Check if the user has disabled the modal, if it's not disabled
     * open the modal, if it's disabled just accept the request
     */
    tryToAcceptChallengeRequest = async () => {
        // Flag that indicates the modal notifying the user that other notifications
        // will be deleted, will be shown or not.
        const dontShowAcceptChallengeModal = await retrieveData('dont-show-delete-notifications-modal');

        // Check if the challenger user have enough Qaploins (match bet) in his account so that it can
        // play against the challenged user. 
        const enoughQaploins = await userHasQaploinsToPlayMatch(this.props.notification.idUserSend, this.props.notification.idMatch); 
        
        if (enoughQaploins !== null && !enoughQaploins) {
            this.setState({
                openNoQaploinsModal: true
            })
        } else if (dontShowAcceptChallengeModal !== 'true') {
            this.setState({ openAcceptChallengeModal: true });
        } else {
            acceptChallengeRequest(this.props.notification);
        }
    }

    render() {
        return (
            <>
                {this.state.userName !== '' ?
                    <>
                        <View style={styles.container}>
                            <View style={styles.avatarContainer}>
                                {(this.state.avatar != null && this.state.avatar !== '') ?
                                    <Image style={styles.avatarImage} source={{ uri: this.state.avatar }} />
                                    :
                                    <View style={styles.avatarImage}></View>
                                }
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.infoText}>¡{this.state.userName} quiere desafiar tu reta de {this.state.gameName}!</Text>
                                <View style={styles.infoButtonsMenu}>
                                    <TouchableWithoutFeedback onPress={() => this.tryToAcceptChallengeRequest()}>
                                        <View style={[styles.infoAcceptButton, styles.infoButton]}>
                                            <Text style={styles.infoButtonText}>Aceptar</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => declineMatch(this.props.uid, this.props.notificationKey)}>
                                        <View style={[styles.infoDeclineButton, styles.infoButton]}>
                                            <Text style={styles.infoButtonText}>Rechazar</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <TouchableWithoutFeedback onPress={() => this.sendToMatchDetail()}>
                                <View style={styles.arrowContainer}>
                                    {this.state.loading ?
                                        <ActivityIndicator size='small' color='rgb(61, 249, 223)' />
                                        :
                                        <Text style={styles.arrow}>
                                            {/*I know look like an error but we need to render the grater than character here*/}
                                            >
                                        </Text>
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <Modal animationType='none'
                            transparent
                            visible={this.state.openAcceptChallengeModal}>
                            <AcceptChallengeModal acceptNotificationsDelete={() => acceptChallengeRequest(this.props.notification)}
                                onClose={() => this.setState({ openAcceptChallengeModal: false })} />
                        </Modal>
                        <NotEnoughQaploinsModal
                            visible={this.state.openNoQaploinsModal}
                            deleteNotificationFromDB = {() => deleteNotification(this.props.uid, this.props.notificationKey)}
                            onClose={() => this.setState({openNoQaploinsModal: false})} />    
                    </>
                    :
                    null
                }
            </>
        );
    }
}

function mapDispatchToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}

export default withNavigation(connect(mapDispatchToProps)(MatchNotificationCard));

