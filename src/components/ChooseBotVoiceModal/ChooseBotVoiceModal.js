import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import images from './../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { getBotAvailableVoices } from '../../services/database';

const BotVoice = ({ label, selected, onPress }) => {
    return (
        <View style={styles.botVoiceRow}>
            <TouchableOpacity onPress={onPress}>
                <LinearGradient useAngle
                    angle={93.1}
                    colors={['#4301FF', '#9F01FA']}
                    style={styles.voiceBotContainer}>
                    <View style={[styles.voiceBot, { backgroundColor: selected ? 'transparent' : '#141539' }]}>
                        <Text style={styles.voiceBotLabel}>
                            {label}
                        </Text>
                        {selected &&
                            <images.svg.checkCircleWhite style={{
                                marginLeft: 32
                            }} />
                        }
                    </View>
                </LinearGradient>
            </TouchableOpacity>
            <View style={styles.sideIconsContainer}>
                <Text style={styles.voiceBotLabel}>
                    🤖
                </Text>
                <images.svg.volumeUp />
            </View>
        </View>
    );
}

class ChooseBotVoiceModal extends Component {
    state = {
        voices: [],
        selectedVoice: null
    };

    componentDidMount() {
        this.fetchVoices();
    }

    fetchVoices = async () => {
        const voices = await getBotAvailableVoices();
        const voicesArray = [];
        voices.forEach((voice) => {
            if (!voice.val().default) {
                voicesArray.push({
                    ...voice.val(),
                    key: voice.key
                });
            }
        });

        this.setState({ voices: voicesArray });
    }

    voiceSelected = (selectedVoice) => {
        this.setState({ selectedVoice: selectedVoice?.key });
        this.props.onVoiceSelected(selectedVoice);
    }

    render() {
        return (
            <Modal visible={this.props.open}
                onRequestClose={this.props.onClose}
                onShow={() => this.setState({ selectedVoice: this.props.currentVoice ? this.props.currentVoice.key : null })}
                animationType='slide'
                transparent>
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <View style={styles.titleRow}>
                            <TouchableOpacity onPress={this.props.onClose}>
                                <images.svg.closeIcon style={styles.closeIcon} />
                            </TouchableOpacity>
                            <Text style={styles.title}>
                                Choose a TTS Bot Voice
                            </Text>
                            {/* Trick to center text */}
                            <View style={[styles.closeIcon, { opacity: 0 }]}>
                                <images.svg.closeIcon />
                            </View>
                        </View>
                        <View style={styles.voicesContainer}>
                            <View style={styles.voicesList}>
                                <BotVoice label='Google (Default)'
                                    selected={!this.state.selectedVoice}
                                    onPress={() => this.voiceSelected(null)} />
                                {this.state.voices.map((voice) => (
                                    <BotVoice label={voice.key}
                                        selected={this.state.selectedVoice === voice.key}
                                        onPress={() => this.voiceSelected(voice)} />
                                ))}
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default ChooseBotVoiceModal;