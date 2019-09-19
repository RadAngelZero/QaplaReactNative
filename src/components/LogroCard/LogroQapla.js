// diego          - 11-09-2019 - us70 - Add redirect to 'Mis retas' when a challenge is accepted
// diego          - 04-09-2019 - us106 - Props sended to PublicMatchCardScreen updated
// diego          - 02-09-2019 - us91 - Add track segment statistic
// josep.sanahuja - 14-08-2019 - bug6 - Add challengedUser id arg to acceptChallengeRequest
// diego          - 09-08-2019 - bug4 - Add gamerTag info. to send it as prop to avoid error on PublicMatchCardScreen
// josep.sanahuja - 08-08-2019 - us85 - + NotEnoughQaploinsModal
// diego          - 06-08-2019 - us68 - Add modal: Delete related notifications
// diego          - 05-08-2019 - us60 - Add declineMatch logic
// diego          - 05-08-2019 - us58 - Accept challenge logic added
// diego          - 01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback, Text, ActivityIndicator, Modal } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import styles from './style';
import {
    getProfileImageWithUID,
    getGameNameOfMatch,
    getMatchWitMatchId,
    declineMatch,
    getGamerTagWithUID,
    deleteNotification,
    userHasQaploinsToPlayMatch
} from '../../services/database';
import { retrieveData } from '../../utilities/persistance';
import { trackOnSegment } from '../../services/statistics';

import {widthPercentageToPx, heightPercentageToPx} from '../../utilities/iosAndroidDim';
import Images from '../../../assets/images';

const QaploinIcon = Images.svg.qaploinsIcon;

class LogroQapla extends Component {
    render() {
        const {titulo, descripcion, qaploins, photoUrl, pageLink, totalPuntos} = this.props;
        
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.colAContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{titulo}</Text>
                        </View>
                        <Text style={styles.description}>{descripcion}</Text>
                    </View>
                    <View style={styles.colBContainer}>
                        <View style={styles.qaploinsContainer}>
                            <QaploinIcon height={31} width={31} style={styles.qaploinIcon} />
                            <Text style={styles.qaploinsText}>{qaploins}</Text>  
                        </View>
                        <TouchableWithoutFeedback>
                            <View style={styles.redimirButton}>
                                <Text style={styles.redimirTextButton}>Redimir</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={{color: 'white', marginTop: heightPercentageToPx(2), marginBottom: 18}}>Miau</Text>
                </View>
            </View>
        );
    }
}

export default LogroQapla;

