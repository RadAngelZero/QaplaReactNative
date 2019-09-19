// josep.sanahuja - 19-09-2019 - us114 - File creation

import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';

import styles from './style';
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
                </View>
            </View>
        );
    }
}

export default LogroQapla;

