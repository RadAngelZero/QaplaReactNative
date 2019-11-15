// diego           - 14-11-2019 - us146 - File creation

import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import { joinEvent } from '../../services/database';
import LogroLifeTimeBadge from '../LogroCard/LogroLifeTimeBadge/LogroLifeTimeBadge';

class EventCard extends Component {
    /**
     * Allow the user to join the tournament
     */
    joinEvent = () => {
        joinEvent(this.props.uid, this.props.id);
    }

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
                                <View style={styles.redimirButton}>
                                    <Text style={styles.redimirTextButton}>Participar</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                </View>
                {(priceQaploins !== null && priceQaploins !== undefined) &&
                    <View style={styles.progressContainer}>
                        <Text style={styles.progressBarCounter}>Estas inscrito a este evento.</Text>
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

export default connect(mapDispatchToProps)(EventCard);