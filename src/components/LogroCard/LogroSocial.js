// josep.sanahuja - 20-09-2019 - us111 - Added disabledContainer logic
// josep.sanahuja - 19-09-2019 - us114 - File creation

import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback, Text } from 'react-native';

import styles from './style';
import Images from '../../../assets/images';
import LogroLifeTimeBadge from './LogroLifeTimeBadge/LogroLifeTimeBadge';
import { redeemLogroCloudFunction } from '../../services/functions';

const QaploinIcon = Images.svg.qaploinsIcon;

class LogroSocial extends Component {

    /**
     * Redeem the logro calling to the cloud function
     */
    redeemLogro = () => {
        redeemLogroCloudFunction(this.props.id, this.props.qaploins);
    }

    render() {
        const { titulo, descripcion, qaploins, photoUrl, puntosCompletados, totalPuntos, tiempoLimite, verified } = this.props;
        return (
            <View style={verified ? styles.container : styles.disabledContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.colASocialContainer}>
                        <Image style={styles.picture} source={{uri: photoUrl}} />
                    </View>
                    <View style={styles.colBSocialContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleSocial}>{titulo}</Text>
                        </View>
                        <Text style={styles.description}>{descripcion}</Text>
                    </View>
                    <View style={styles.colCSocialContainer}>
                        <View style={styles.qaploinsContainer}>
                            <QaploinIcon height={31} width={31} style={styles.qaploinIcon} />
                            <Text style={styles.qaploinsText}>{qaploins}</Text>  
                        </View>
                        <LogroLifeTimeBadge tiempoLimite={tiempoLimite} />
                        {puntosCompletados >= totalPuntos &&
                            <TouchableWithoutFeedback
                                onPress={this.redeemLogro}
                                /**Just a double check on disabled property of the button */
                                disabled={puntosCompletados < totalPuntos}>
                                <View style={styles.redimirButton}>
                                    <Text style={styles.redimirTextButton}>Redimir</Text>
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
                    <View style={styles.shareContainer}>
                        <TouchableWithoutFeedback>
                            <View>
                                <Text style={styles.likeText}>Dar Like</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View>
                                <Text style={styles.uploadText}>Subir</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                }
            </View>
        );
    }
}

export default LogroSocial;

