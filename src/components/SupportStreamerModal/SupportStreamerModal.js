import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';
import ZeroQoinsEventsModal from '../ZeroQoinsEventsModal/ZeroQoinsEventsModal';
import { translate } from '../../utilities/i18';

class SupportStreamerModal extends Component {
    state = {
        openNoQoinsEnoughModal: false
    };

    closeModal = () => {
        this.props.onClose();
    }

    sendCheers = () => {
        if (this.props.userQoins >= 200) {
            this.props.sendCheers();
            this.props.onClose();
        } else {
            this.setState({ openNoQoinsEnoughModal: true });
        }
    }

    render() {
        return (
            <Modal
                animationType='fade'
                transparent
                visible={this.props.open}
                onRequestClose={this.closeModal}>
                <View style={styles.mainContainer}>
                    <View style={[styles.absolute, styles.blurContainer]}>
                        <BlurView style={styles.absolute}
                            blurType='dark'
                            blurAmount={30} />
                        <TouchableOpacity style={{ flex: 1 }} onPress={this.closeModal} />
                    </View>
                    <View style={styles.cardContainer}>
                        <View style={styles.card}>
                            <View style={styles.cardBody}>
                                <LinearGradient useAngle={true}
                                    angle={118.67}
                                    angleCenter={{ x: .5, y: .5}}
                                    colors={['#2D07FA', '#A716EE']}
                                    style={styles.supportAmountContainer}>
                                    <Text style={styles.supportAmount}>
                                        200
                                    </Text>
                                    <images.svg.activityQoin height={30} width={30} />
                                </LinearGradient>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>
                                        {translate('supportStreamerModal.supportToFirstPart')}
                                        <Text style={styles.greenText}>
                                            {this.props.streamerData.displayName}
                                        </Text>
                                        {translate('supportStreamerModal.supportToSecondPart')}
                                    </Text>
                                </View>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.description}>
                                        {translate('supportStreamerModal.description')}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={this.sendCheers} style={styles.sendCheersButton}>
                                <Text style={styles.sendCheersText}>
                                    {translate('supportStreamerModal.sendCheers')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ZeroQoinsEventsModal open={this.state.openNoQoinsEnoughModal}
                    onClose={() => this.setState({ openNoQoinsEnoughModal: false })} />
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        userQoins: state.userReducer.user.credits
    };
}

export default connect(mapStateToProps)(SupportStreamerModal);