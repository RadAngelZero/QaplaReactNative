import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';
import ZeroQoinsEventsModal from '../ZeroQoinsEventsModal/ZeroQoinsEventsModal';
import { translate } from '../../utilities/i18';

const DonationValueOption = ({ value, currentSelection, onPress, style }) => (
    <TouchableOpacity onPress={() => onPress(value)}>
        <LinearGradient useAngle={true}
            angle={118.67}
            angleCenter={{ x: .5, y: .5}}
            colors={value === currentSelection ? ['#2D07FA', '#A716EE'] : ['#141637', '#141637']}
            style={[styles.supportAmountContainer, style]}>
            <Text style={[styles.supportAmount, { color: value === currentSelection ? '#00FFDC' : '#FFF' }]}>
                {value}
            </Text>
            <images.svg.activityQoin height={21} width={21} />
        </LinearGradient>
    </TouchableOpacity>
);

class SupportStreamerModal extends Component {
    state = {
        openNoQoinsEnoughModal: false,
        qoinsToDonate: 50
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
                                        onPress={this.updateQoinsToDonate}
                                        style={{ marginRight: 0 }} />
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