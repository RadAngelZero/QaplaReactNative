// josep.sanahuja - 20-09-2019 - us111 - Added disabledContainer logic
// josep.sanahuja - 19-09-2019 - us114 - File creation

import React, { Component } from 'react';
import { Animated, View, TouchableWithoutFeedback, Text } from 'react-native';

import styles from './style';
import Images from '../../../assets/images';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';
import LogroLifeTimeBadge from './LogroLifeTimeBadge/LogroLifeTimeBadge';

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
                    toValue: widthPercentageToPx((70 / this.props.totalPuntos * nextProps.puntosCompletados) || 0),
                    duration: 375
                }
            ).start();
            this.setState({ puntosCompletados: nextProps.puntosCompletados });
        }
        return true;
    }

    render() {
        const { titulo, descripcion, qaploins, puntosCompletados, totalPuntos, tiempoLimite, verified } = this.props;
        return (
            <View style={verified ? styles.container : styles.disabledContainer}>
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
                        <LogroLifeTimeBadge tiempoLimite={tiempoLimite} />
                        {puntosCompletados >= totalPuntos &&
                            <TouchableWithoutFeedback>
                                <View style={styles.redimirButton}>
                                    <Text style={styles.redimirTextButton}>Redimir</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                </View>
                {puntosCompletados < totalPuntos &&
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <Animated.View
                                style={{ width: this.state.progressBarWidth }}>
                                <View style={styles.progressBarContent} />
                            </Animated.View>
                        </View>
                        <Text style={styles.progressBarCounter}>{puntosCompletados ? `${puntosCompletados}/${totalPuntos}` : `0/${totalPuntos}`}</Text>
                    </View>
                }
            </View>
        );
    }
}

export default LogroQapla;

