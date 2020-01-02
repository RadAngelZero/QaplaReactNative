// josep.sanahuja - 12-12-2019 - us160 - Events 'Add gamertag Screen' & 'Gamertag Added' &
//                                       'Add Gamer Tag Cancelled With Info' & 'Add Gamer Tag Cancelled Empty'
// diego          - 12-12-2019 - us169 - Redirect prop added
// diego          - 12-09-2019 - us99 - Added close icon to allow user cancelation
// diego          - 02-09-2019 - us91 - Add track segment statistic
// diego          - 21-08-2019 - us89 - File creation

import React, { Component } from 'react';
import { Modal, View, TextInput, Text, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './style';
import { addGameToUser } from '../../services/database';
import Images from './../../../assets/images';
import { recordScreenOnSegment, trackOnSegment } from '../../services/statistics';
import { subscribeUserToTopic } from '../../services/messaging';

const CloseIcon = Images.svg.closeIcon;

export class AddGamerTagModal extends Component {
    state = {
        gamerTagText: ''
    };

    /**
     * Check if the gamerTag is valid
     */
    isValidGamerTag = () => {
        return this.state.gamerTagText.length > 0;
    }

    /**
     * Check if some game is selected
     */
    isThereSelectedGame = () => {
        return this.props.selectedGame;
    }

    saveGameOnUser = async () => {

        /**
         * This code is working, and is a necesary part of the app, if must be updated please make the update instead of just comment the code
         * and leave a TODO, if something is not working we can report a bug here: https://github.com/QaplaGaming/QaplaReactNative/issues,
         * also remember send pull request instead of just push on the production (current release) branch, we can do that process from the following link:
         * https://github.com/QaplaGaming/QaplaReactNative/compare
         * Github can show things that the header lines can not show, thats why the header lines are useless, we have not a real control on them, is not a real history
         * of changes, just have the changes that we want to write, as we can see on this commit (maded over release-1, not part of a pull request and without a header line)
         * (https://github.com/QaplaGaming/QaplaReactNative/commit/0ed9031116bf8778b493ab2c9ef63dd0788669a6#diff-8156c12eaeec868ddf8c2afc59b8390a)
         */
        try
        {
            await addGameToUser(this.props.uid, this.props.userName, this.props.selectedGame.platform,
                this.props.selectedGame.gameKey, this.state.gamerTagText);

            subscribeUserToTopic(this.props.selectedGame.gameKey);

            trackOnSegment('Add Gamer Tag Process Completed',
                { game: this.props.selectedGame.gameKey, platform: this.props.selectedGame.platform });

            /**
             * redirect: prop to know if the modal should redirect to other screen
             * or just call a function and then hide
             */
            if (this.props.redirect) {
                if (this.props.loadGamesUserDontHave) {
                    this.props.navigation.navigate('Perfil');
                } else {
                    this.props.navigation.navigate('SetBet',
                        { game: { gameKey: this.props.selectedGame.gameKey, platform: this.props.selectedGame.platform } });
                }
            } else {
                this.props.onSuccess();
                this.props.onClose();
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Sends an event tracking cancelling action and closes the modal.
     */
    closeModal = () => {
        if (this.state.gamerTagText.length === 0) {
            trackOnSegment('Add Gamer Tag Cancelled Empty', {
                Game: this.props.selectedGame.gameKey,
                Platform: this.props.selectedGame.platform,
                Gamertag: this.state.gamerTagText
            });
        }
        else {
            trackOnSegment('Add Gamer Tag Cancelled With Info', {
                Game: this.props.selectedGame.gameKey,
                Platform: this.props.selectedGame.platform,
                Gamertag: this.state.gamerTagText
            });
        }

        this.props.onClose();
    }

    render() {
        return (
            <Modal
                animationType='fade'
                transparent
                visible={this.props.open}
                onRequestClose={this.props.onClose}
                onShow={() => recordScreenOnSegment('Add gamertag Screen')}>
                    <View style={styles.mainContainer}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalControls}>
                                <TouchableWithoutFeedback onPress={this.closeModal}>
                                    <View style={styles.closeIcon}>
                                        <CloseIcon />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.modalBody}>
                                <TextInput
                                    style={styles.gamerTagTextInput}
                                    placeholder='Escribe tu Gamer Tag'
                                    placeholderTextColor = '#FFF'
                                    autoCapitalize='none'
                                    onChangeText={(text) => this.setState({ gamerTagText: text })}
                                    value={this.state.gamerTagText} />
                                <Text style={styles.modalText}>Se va a añadir el Juego {this.isThereSelectedGame() && this.props.selectedGame.name } a tu perfil con Gamertag {this.state.gamerTagText}. Estás seguro?</Text>
                                <TouchableWithoutFeedback
                                    disabled={!this.isValidGamerTag}
                                    onPress={this.saveGameOnUser}>
                                        <View style={styles.confirmButton}>
                                            <Text style={styles.confirmButtonText}>Aceptar</Text>
                                        </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
            </Modal>
        );
    }
}

export default withNavigation(AddGamerTagModal);
