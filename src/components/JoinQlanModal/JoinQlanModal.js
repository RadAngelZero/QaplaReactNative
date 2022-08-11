import React, { Component } from 'react';
import { View, Modal, Image, TouchableWithoutFeedback, Text, TextInput, TouchableHighlight } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { translate } from '../../utilities/i18';

import images from '../../../assets/images';

import styles from './style';
import { getQlanData, getQlanIdWithQreatorCode, subscribeUserToQlan, unsubscribeUserFromQlan } from '../../services/database';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';

class JoinQlanModal extends Component {
    state = {
        code: '',
        joinedQlan: false,
        streamerUsername: '',
        qlan: '',
        isFirstTimeJoininAQlan: true
    }

    joinQlanHandler = async () => {
        this.setState({ isFirstTimeJoininAQlan: !Boolean(this.props.qlanId) }, async () => {
            if (this.props.qlanId) {
                await unsubscribeUserFromQlan(this.props.uid, this.props.qlanId);
            }

            const qlanId = await getQlanIdWithQreatorCode(this.state.code);

            if (qlanId) {
                await subscribeUserToQlan(this.props.uid, qlanId, this.props.userName, this.props.twitchUsername);
                const qlanData = await getQlanData(qlanId);

                this.setState({ joinedQlan: true, streamerUsername: qlanData.val().name });
                this.props.onSuccess();
            }
        });
    }

    closeModal = () => {
        if (this.state.joinedQlan) {
            this.setState({ code: '', joinedQlan: false, streamerUsername: '', isFirstTimeJoininAQlan: false });
        }

        this.props.onClose();
    }

    render() {
        return (
            <Modal
                visible={this.props.open}
                animationType="slide"
                transparent={true}
                onRequestClose={this.closeModal}>
                <TouchableWithoutFeedback onPress={this.closeModal}>
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
                                        <images.svg.closeIcon onPress={this.closeModal} style={styles.closeIcon} />
                                        <Image source={images.png.qlanProfile.img} style={styles.image} />
                                        <Text style={[styles.modalText, { marginBottom: this.props.qlanId ? 8 : 30}]}>
                                            {this.props.qlanId ?
                                            translate('qlan.changingQlan')
                                            :
                                            translate('qlan.typeQreatorCode')
                                            }
                                        </Text>
                                        {this.props.qlanId &&
                                            <Text style={styles.newCodeText}>
                                                {translate('qlan.enterNewCode')}
                                            </Text>
                                        }
                                        <View style={styles.textInput}>
                                            <TextInput
                                                autoFocus
                                                value={this.state.code}
                                                onChange={(e) => { this.setState({ code: e.nativeEvent.text }) }}
                                                style={styles.textInputText}
                                                placeholder="Q-APLITA"
                                                placeholderTextColor="#6C5DD3"
                                                onSubmitEditing={this.joinQlanHandler} />
                                        </View>
                                    </>
                                }
                                {this.state.joinedQlan &&
                                    <>
                                        <images.svg.closeIcon onPress={this.closeModal} style={styles.closeIcon} />
                                        <View>
                                            <Image source={images.png.checkCircleGlow.img} style={styles.confirmIcon} />
                                        </View>

                                        <Text style={[styles.modalText, { marginBottom: this.state.isFirstTimeJoininAQlan ? heightPercentageToPx(5.5) : heightPercentageToPx(16) }]}>
                                            {translate('qlan.youJoinedP1')} <Text style={styles.qaplaColor}>{this.state.streamerUsername}</Text>{translate('qlan.youJoinedP2')}
                                        </Text>
                                        {this.state.isFirstTimeJoininAQlan &&
                                            <Text style={styles.confirmModalSubtitle}>{translate('qlan.youWillReceive')}</Text>
                                        }
                                    </>
                                }
                                <TouchableHighlight
                                    style={styles.button}
                                    onPress={this.state.joinedQlan ? this.closeModal : this.joinQlanHandler}
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