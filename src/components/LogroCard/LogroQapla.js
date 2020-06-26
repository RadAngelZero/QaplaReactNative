// josep.sanahuja - 20-09-2019 - us111 - Added disabledContainer logic
// josep.sanahuja - 19-09-2019 - us114 - File creation

import React, { Component } from 'react';
import { Animated, View, TouchableWithoutFeedback } from 'react-native';

import styles from './style';
import Images from '../../../assets/images';
import LogroLifeTimeBadge from './LogroLifeTimeBadge/LogroLifeTimeBadge';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';
import { redeemLogroCloudFunction } from '../../services/functions';
import { translate, getLocaleLanguage } from '../../utilities/i18';
import QaplaText from '../QaplaText/QaplaText';

const QaploinIcon = Images.svg.qaploinsIcon;

class LogroQapla extends Component {
    state = {
        progressBarWidth: new Animated.Value(0),
        puntosCompletados: 0
    };

    shouldComponentUpdate(nextProps) {
        if (nextProps.puntosCompletados !== this.state.puntosCompletados) {
            Animated.timing(
                this.state.progressBarWidth,
                {
                    /**
                     * 70 is the maximum value of the width because the width defined in the style is also 70
                     * The operation calculate the percentage to fill based on the current progress of the user
                     * If the user don't have any progress show the 0% by default
                     */
                    toValue: widthPercentageToPx((70 / this.props.totalPuntos * nextProps.puntosCompletados) || 0),
                    duration: 375
                }
            ).start();
            this.setState({ puntosCompletados: nextProps.puntosCompletados });
        }
        return true;
    }

    /**
     * Redeem the logro calling to the cloud function
     */
    redeemLogro = () => {
        redeemLogroCloudFunction(this.props.id, this.props.qaploins);
    }

    /**
     * Select the correct event text content according to the language used by the user
     * in the app.
     * 
     * @param {object} textLangObj Object containing in JSON format a text content for each
     *                             language supported by the app
     */
    getTextBasedOnUserLanguage = (textLangObj) => {
        const res = '';
        const userLanguage = getLocaleLanguage();

        if (textLangObj && textLangObj[userLanguage]) {
            res = textLangObj[userLanguage];
        }

        return res;
    }

    render() {
        const {
            title,
            titulo,
            description,
            descripcion,
            qaploins,
            puntosCompletados,
            totalPuntos,
            tiempoLimite,
            verified
        } = this.props;

        let descriptionTranslated = getTextBasedOnUserLanguage(description);
        let titleTranslated = getTextBasedOnUserLanguage(title);

        // (01-04-2020) Events on 2019 and early 2020 used 'titulos' and 'descripcion' props, 
        // as a result of a change on the events structure data in db description and title
        // were added for internationalization. These two if conditions for 'descriptionTranslated'
        // and 'titleTranslated' are to check that the props exists in the db event element,
        // otherwise a fallback is used (not ideal situation, but to prevent app crashes to the
        // user)
        if (descriptionTranslated === '') {
            descriptionTranslated = descripcion;
        }

        if (titleTranslated === '') {
            titleTranslated = titulo;
        }
        
        return (
            <View style={verified ? styles.container : styles.disabledContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.colAContainer}>
                        <View style={styles.titleContainer}>
                            <QaplaText style={styles.title}>{titleTranslated}</QaplaText>
                        </View>
                        <QaplaText style={styles.description}>{descriptionTranslated}</QaplaText>
                    </View>
                    <View style={styles.colBContainer}>
                        <View style={styles.qaploinsContainer}>
                            <QaploinIcon height={31} width={31} style={styles.qaploinIcon} />
                            <QaplaText style={styles.qaploinsText}>{qaploins}</QaplaText>
                        </View>
                        <LogroLifeTimeBadge limitDate={tiempoLimite} />
                        {puntosCompletados >= totalPuntos &&
                            <TouchableWithoutFeedback
                                onPress={this.redeemLogro}
                                /**Just a double check on disabled property of the button */
                                disabled={puntosCompletados < totalPuntos}>
                                <View style={styles.redimirButton}>
                                    <QaplaText style={styles.redimirTextButton}>{translate('activeAchievementsScreen.qaplaAchievement.redeem')}</QaplaText>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                </View>
                {/**
                    If the user don't have progress on the logro
                    or
                    If the user have progress but not enough to redeem the logro
                 */}
                {(!puntosCompletados || puntosCompletados < totalPuntos) &&
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <Animated.View
                                style={{ width: this.state.progressBarWidth }}>
                                <View style={styles.progressBarContent} />
                            </Animated.View>
                        </View>
                        <QaplaText style={styles.progressBarCounter}>{puntosCompletados ? `${puntosCompletados}/${totalPuntos}` : `0/${totalPuntos}`}</QaplaText>
                    </View>
                }
            </View>
        );
    }
}

export default LogroQapla;

