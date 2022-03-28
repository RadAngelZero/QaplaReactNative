import React, { Component } from 'react';
import { View, Modal, Image, TouchableWithoutFeedback, Text, TextInput, TouchableHighlight } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { translate } from '../../utilities/i18';

import images from '../../../assets/images';

import styles from './style';
import { getQlanIdWithQreatorCode, subscribeUserToQlan } from '../../services/database';

class JoinQlanModal extends Component {
    state = {
        code: '',
        joinedQlan: false,
        streamerUsername: '',
        qlan: '',
        qlanImage: '',
    }

    joinQlanHandler = async () => {
        const qlanId = await getQlanIdWithQreatorCode(this.state.code);

        if (qlanId) {
            await subscribeUserToQlan(this.props.uid, qlanId, this.props.userName, this.props.twitchUsername);
            this.setState({ joinedQlan: true });
        }
    }

    render() {
        return (
            <Modal
                visible={this.props.open}
                animationType="slide"
                transparent={true}
                onRequestClose={this.props.onClose}>
                <TouchableWithoutFeedback onPress={this.props.onClose}>
                    <View style={styles.mainContainer}>
                        <BlurView
                            style={styles.blur}
                            blurType="dark"
                            blurAmount={32}
                        />
                        <TouchableWithoutFeedback touchSoundDisabled>
                            <View style={styles.container}>
                                {!this.state.joinedQlan &&
                                    <>
                                        <images.svg.closeIcon onPress={this.props.onClose} style={styles.closeIcon} />
                                        <Image source={images.png.qlanProfile.img} style={styles.image} />
                                        <Text style={styles.modalText}>
                                            {translate('qlan.typeQreatorCode')}
                                        </Text>
                                        <View style={styles.textInput}>
                                            <TextInput
                                                value={this.state.code}
                                                onChange={(e) => { this.setState({ code: e.nativeEvent.text }) }}
                                                style={styles.textInputText}
                                                placeholder="Q-APLITA"
                                                placeholderTextColor="#6C5DD3"
                                            />
                                        </View>
                                    </>
                                }
                                {this.state.joinedQlan &&
                                    <>
                                        <images.svg.closeIcon onPress={this.props.onClose} style={styles.closeIcon} />
                                        <View>
                                            <Image source={images.png.checkCircleGlow.img} style={styles.confirmIcon} />
                                        </View>

                                        <Text style={styles.modalText}>
                                            {translate('qlan.youJoinedP1')} <Text style={styles.qaplaColor}>{this.state.streamerUsername}</Text>{translate('qlan.youJoinedP2')}
                                        </Text>
                                        <Text style={styles.confirmModalSubtitle}>{translate('qlan.youWillReceive')}</Text>
                                    </>
                                }
                                <TouchableHighlight
                                    style={styles.button}
                                    onPress={this.state.joinedQlan ? this.props.onClose : this.joinQlanHandler}
                                    underlayColor="#2934ae">
                                    <Text style={styles.textButton}>{this.state.joinedQlan ? translate('qlan.backToProfile') : translate('qlan.joinQlanButton')}</Text>
                                </TouchableHighlight>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

export default JoinQlanModal;