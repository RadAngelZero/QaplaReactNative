import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';
import ZeroQoinsEventsModal from '../ZeroQoinsEventsModal/ZeroQoinsEventsModal';
import { translate } from '../../utilities/i18';

const DonationValueOption = ({ value, currentSelection, onPress }) => (
    <TouchableOpacity onPress={() => onPress(value)}>
        <LinearGradient useAngle={true}
            angle={118.67}
            angleCenter={{ x: .5, y: .5}}
            colors={value === currentSelection ? ['#2D07FA', '#A716EE'] : ['#141637', '#141637']}
            style={styles.supportAmountContainer}>
            <Text style={[styles.supportAmount, { textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20, textShadowColor: value === currentSelection ? 'rgba(0, 255, 220, 0.85)' : 'rgba(194, 255, 255, 0.55)', color: value === currentSelection ? '#00FFDC' : '#FFF' }]}>
                {value}
            </Text>
            <images.svg.activityQoin height={30} width={30} />
        </LinearGradient>
    </TouchableOpacity>
);

class SupportStreamerModal extends Component {
    state = {
        openNoQoinsEnoughModal: false,
        qoinsToDonate: null
    };

    closeModal = () => {
        this.props.onClose();
    }

    sendCheers = () => {
        if (this.props.userQoins >= this.state.qoinsToDonate) {
            this.props.sendCheers(this.state.qoinsToDonate);
            this.props.onClose();
        } else {
            this.setState({ openNoQoinsEnoughModal: true });
        }
    }

    updateQoinsToDonate = (qoinsToDonate) => {
        this.setState({ qoinsToDonate });
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
                                <View>
                                    <Text style={styles.title}>
                                        {translate('supportStreamerModal.supportTo')}
                                        <Text style={styles.greenText}>
                                            {this.props.streamerData.displayName}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <DonationValueOption value={50}
                                        currentSelection={this.state.qoinsToDonate}
                                        onPress={this.updateQoinsToDonate} />
                                    <DonationValueOption value={100}
                                        currentSelection={this.state.qoinsToDonate}
                                        onPress={this.updateQoinsToDonate} />
                                    <DonationValueOption value={200}
                                        currentSelection={this.state.qoinsToDonate}
                                        onPress={this.updateQoinsToDonate} />
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