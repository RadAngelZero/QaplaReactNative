// diego -          01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableWithoutFeedback,
    Text,
    ActivityIndicator
} from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './style';
import {
    getProfileImageWithUID,
    getGameNameOfMatch,
    getMatchWitMatchId
} from '../../services/database';

class MatchNotificationCard extends Component {
    state = {
        /*
            We use null by default because is the same value that getProfileImageWithUID returns if the user don't have profile image
            In this way the notification loads faster, was implemented because some performance problemas were found using by default value: ''
        */
        avatar: null,
        userName: '',
        gameName: '',
        loading: false
    };

    componentWillMount() {
        this.fetchNotificationData();
    }

    async sendToMatchDetail() {
        this.setState({ loading: true });
        const matchData = await getMatchWitMatchId(this.props.notification.idMatch);
        matchData['userName'] = this.props.notification.userName;
        this.props.navigation.navigate('MatchCard', { matchCard: matchData });
        this.setState({ loading: false });
    }

    async fetchNotificationData() {
        const avatar = await getProfileImageWithUID(this.props.notification.idUserSend);
        const gameName = await getGameNameOfMatch(this.props.notification.idMatch);
        this.setState({
            avatar,
            userName: this.props.notification.userName,
            gameName
        });
    }

    render() {
        return (
            <>
                {this.state.userName !== '' ?
                    <View style={styles.container}>
                        <View style={styles.avatarContainer}>
                            {this.state.avatar != null ?
                                <Image style={styles.avatarImage} source={{ uri: this.state.avatar }} />
                                :
                                <View style={styles.avatarImage}></View>
                            }
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>¡{this.state.userName} quiere desafiar tu reta de {this.state.gameName}!</Text>
                            <View style={styles.infoButtonsMenu}>
                                <TouchableWithoutFeedback>
                                    <View style={[styles.infoAcceptButton, styles.infoButton]}>
                                        <Text style={styles.infoButtonText}>Aceptar</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback>
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

export default withNavigation(MatchNotificationCard);
