
// diego          - 05-08-2019 - us60 - Add declineMatch logic
// diego          - 05-08-2019 - us58    - Accept challenge logic added
// diego          - 01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableWithoutFeedback,
    Text,
    ActivityIndicator
} from 'react-native';

import styles from './style';

import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import {
    getProfileImageWithUID,
    getGameNameOfMatch,
    getMatchWitMatchId,
    declineMatch
} from '../../services/database';

// Cloud Functions
import { acceptChallengeRequest } from '../../services/functions';

class MatchNotificationCard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            /*
                We use null by default because is the same value that getProfileImageWithUID returns if the user don't have profile image
                In this way the notification loads faster, was implemented because some performance problemas were found using by default value: ''
            */
            avatar: null,
            userName: '',
            gameName: '',
            loading: false,
            showNotEQapModal: false
        };

        // Binding functions without parameters
        this.acceptChallengeReq = this.acceptChallengeReq.bind(this);
    }

    componentWillMount() {
        this.fetchNotificationData();
    }

    /**
     * Description:
     * Accepts a challenge request to a match of the challenged user and deletes
     * all the other notifications from the same match.
     * 
     * Params NONE
     */
    async acceptChallengeReq() {
        // let opponentQaploins = await getUserQaploins(uid);

        // if (opponentQaploins >= ) {
        //     this.setState({
        //         showNotEQapModal: true
        //     }) 
        // }

        await acceptChallengeRequest(this.props.notificationKey, this.props.uid);
    }

    async sendToMatchDetail() {
        this.setState({ loading: true });
        
        matchData = await getMatchWitMatchId(this.props.notification.idMatch);
        matchData['userName'] = this.props.notification.userName;
        
        this.props.navigation.navigate('MatchCard', { matchCard: matchData });
        
        // NOTE: This line of code after navigation seems odd, in fact it will never be called
        // because navigation happens first and changes from component.
        this.setState({ loading: false });
    }

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

    render() {
        return (
            <>
                {this.state.userName !== '' ?
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
                                <TouchableWithoutFeedback onPress={this.acceptChallengeReq}>
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

