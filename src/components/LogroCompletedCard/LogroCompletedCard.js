import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './style';
import images from '../../../assets/images';

const QaploinIcon = images.svg.qaploinsIcon;

export class LogroCompletedCard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.prizeContainer}>
                        <View>
                            <QaploinIcon height={48} width={48} />
                        </View>
                        <View>
                            <Text style={styles.prizeNumber}>{this.props.qaploins}</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>{this.props.descripcion}</Text>
                </View>
            </View>
        );
    }
}

export default LogroCompletedCard;
