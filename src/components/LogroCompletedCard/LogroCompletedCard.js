import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './style';
import Images from '../../../assets/images';
import QaplaText from '../QaplaText/QaplaText';

const QaploinIcon = Images.svg.qaploinsIcon;

class LogroCompletedCard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.prizeContainer}>
                        <View>
                            <QaploinIcon height={48} width={48} />
                        </View>
                        <View>
                            <QaplaText style={styles.prizeNumber}>{this.props.qaploins}</QaplaText>
                        </View>
                    </View>
                    <QaplaText style={styles.description}>{this.props.descripcion}</QaplaText>
                </View>
            </View>
        );
    }
}

export default LogroCompletedCard;
