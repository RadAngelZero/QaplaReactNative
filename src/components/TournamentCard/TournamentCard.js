// diego          - 11-12-2019 - us165 - Validate if the user is logged before execute joinInTournament

import React, { Component } from 'react';
import { Animated, View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import styles from './style';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';
import { joinInTournament } from '../../services/database';
import { isUserLogged } from '../../services/auth';

import LogroLifeTimeBadge from '../LogroCard/LogroLifeTimeBadge/LogroLifeTimeBadge';
import { translate, getLocaleLanguage } from '../../utilities/i18';

class TournamentCard extends Component {
    state = {
        progressBarWidth: new Animated.Value(0),
        completedPoints: 0
    };

    shouldComponentUpdate(nextProps) {
        if (nextProps.puntosCompletados !== this.state.completedPoints) {
            /**
             * 70 is the maximum value of the width of the progress bar because the width defined in the style
             * is also 70 rhe operation calculate the percentage to fill based on the current progress of the
             * user. If the user don't have any progress show the 0% by default
             */
            const progressPercentage = (70 / this.props.totalPuntos * nextProps.puntosCompletados) || 0;
            const progressBarWidth = progressPercentage <= 70 ? progressPercentage : 70;

            Animated.timing (
                this.state.progressBarWidth,
                {
                    toValue: widthPercentageToPx(progressBarWidth),
                    duration: 375
                }
            ).start();
            this.setState({ completedPoints: nextProps.puntosCompletados });
        }
        return true;
    }

    /**
     * Allow the user to join in the tournament
     */
    joinInTournament = () => {
        if (isUserLogged()) {
            joinInTournament(this.props.uid, this.props.id /* <- Tournament id */, this.props.totalPuntos );
        } else {
            this.props.navigation.navigate('SignIn');
        }
    }

    /**
     * Select the correct event description according to the language used by the user
     * in the app.
     * 
     * @param {object} descriptionObj Object containing in JSON format a description for each
     *                                language supported by the app
     */
    getDescriptionBasedOnUserLanguage = (descriptionObj) => {
        const res = '';
        const userLanguage = getLocaleLanguage();

        if (descriptionObj[userLanguage] !== null && descriptionObj[userLanguage] != undefined) {
            res = descriptionObj[userLanguage].content;
        }

        return res;
    }

    render() {
        const { photoUrl, titulo, descripcion, totalPuntos, puntosCompletados, tiempoLimite, verified } = this.props;

        const description = getDescriptionBasedOnUserLanguage(descripcion);

        return (
            <View style={verified ? styles.container : styles.disabledContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.colASocialContainer}>
                        <Image style={styles.picture} source={{uri: photoUrl}} />
                    </View>
                    <View style={styles.colBSocialContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{titulo}</Text>
                        </View>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                    <View style={styles.colBContainer}>
                        <LogroLifeTimeBadge limitDate={tiempoLimite} />
                        {(puntosCompletados === null || puntosCompletados === undefined) &&
                            <TouchableWithoutFeedback onPress={this.joinInTournament}>
                                <View style={styles.redimirButton}>
                                    <Text style={styles.redimirTextButton}>{translate('activeAchievementsScreen.tournamentAchivement.participate')}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                </View>
                {(puntosCompletados !== null && puntosCompletados !== undefined) &&
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <Animated.View
                                style={{ width: this.state.progressBarWidth }}>
                                <View style={styles.progressBarContent} />
                            </Animated.View>
                        </View>
                        <Text style={styles.progressBarCounter}>{`${puntosCompletados}/${totalPuntos}`}</Text>
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

export default connect(mapDispatchToProps)(withNavigation(TournamentCard));