// diego           - 11-12-2019 - us165 - Validate if the user is logged before execute joinEvent
// diego           - 14-11-2019 - us146 - File creation

import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback, Linking } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import styles from './style';
import { joinEvent } from '../../services/database';
import { isUserLogged } from '../../services/auth';

import LogroLifeTimeBadge from '../LogroCard/LogroLifeTimeBadge/LogroLifeTimeBadge';
import { translate } from '../../utilities/i18';
import { QAPLA_DISCORD_CHANNEL } from '../../utilities/Constants';

class EventCard extends Component {
    /**
     * Allow the user to join the tournament
     */
    joinEvent = () => {
        if (isUserLogged()) {
            joinEvent(this.props.uid, this.props.id);
        } else {
            this.props.navigation.navigate('SignIn');
        }
    }

    /**
     * Sends the user to the event (a discord channel)
     */
    goToEvent = () => Linking.openURL(QAPLA_DISCORD_CHANNEL);

    render() {
        const { photoUrl, titulo, description, tiempoLimite, verified, priceQaploins } = this.props;

        return (
            <View style={verified ? styles.container : styles.disabledContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.colASocialContainer}>
                        <Image style={styles.picture} source={{ uri: photoUrl }} />
                    </View>
                    <View style={styles.colBSocialContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{titulo}</Text>
                        </View>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                    <View style={styles.colBContainer}>
                        <LogroLifeTimeBadge limitDate={tiempoLimite} />
                        {(priceQaploins === null || priceQaploins === undefined) &&
                            <TouchableWithoutFeedback onPress={this.joinEvent}>
                                <View style={styles.participateButton}>
                                    <Text style={styles.participateTextButton}>{translate('activeAchievementsScreen.eventAchievement.participate')}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                </View>
                {(priceQaploins !== null && priceQaploins !== undefined) &&
                    <View style={styles.eventInfoContainer}>
                        <TouchableWithoutFeedback onPress={this.goToEvent}>
                            <Text style={styles.goToEvent}>
                                {translate('activeAchievementsScreen.eventAchievement.goToEvent')}
                            </Text>
                        </TouchableWithoutFeedback>
                        <View style={styles.participatingTextContainer}>
                            <Text style={styles.participatingText}>{translate('activeAchievementsScreen.eventAchievement.alreadyParticipating')}</Text>
                        </View>
                    </View>
                }
            </View>
        );
    }
}

function mapDispatchToProps(state) {
    return {
        uid: state.userReducer.user.id
    }
}

export default connect(mapDispatchToProps)(withNavigation(EventCard));