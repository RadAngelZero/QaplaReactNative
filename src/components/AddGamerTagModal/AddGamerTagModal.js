// josep.sanahuja - 12-12-2019 - us160 - Events 'Add gamertag Screen' & 'Gamertag Added' &
//                                       'Add Gamer Tag Cancelled With Info' & 'Add Gamer Tag Cancelled Empty'
// diego          - 12-12-2019 - us169 - Redirect prop added
// diego          - 12-09-2019 - us99 - Added close icon to allow user cancelation
// diego          - 02-09-2019 - us91 - Add track segment statistic
// diego          - 21-08-2019 - us89 - File creation

import React, { Component } from 'react';
import { Modal, View, TextInput, Text, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import styles from './style';
import { addGameToUser, updateUserGamerTag } from '../../services/database';
import Images from './../../../assets/images';
import { recordScreenOnSegment, trackOnSegment } from '../../services/statistics';
import { subscribeUserToTopic } from '../../services/messaging';
import { translate } from '../../utilities/i18';
import AddDiscordTagModal from '../AddDiscordTagModal/AddDiscordTagModal';

const CloseIcon = Images.svg.closeIcon;

class AddGamerTagModal extends Component {
    state = {
        gamerTagText: '',
        gamerTagError: false,
        openDiscordTagModal: false
    };

    /**
     * Check if the gamerTag is valid
     */
    isValidGamerTag = () => this.state.gamerTagText !== '';

    /**
     * Check if some game is selected
     */
    isThereSelectedGame = () => {
        return this.props.selectedGame;
    }

    saveGameOnUser = async () => {
        if (this.isValidGamerTag()) {
            this.validateOrRequestDiscordTag();
        } else if (this.props.previousGamerTag) {
            this.setState({ gamerTagText: this.props.previousGamerTag }, () => {
                this.validateOrRequestDiscordTag();
            });
        } else {
            this.setState({ gamerTagError: true });
        }
    }

    /**
     * Check if the user has a valid discorTag and save the game else open the discordTag modal
     */
    validateOrRequestDiscordTag = async () => {
        if (this.props.discordTag) {
            await this.addGameAndRedirectUser();
        } else {
            this.setState({ openDiscordTagModal: true });
        }
    }

    /**
     * Add the game to the user, subscribe him/her to the topic of the game
     * and finally redirect him/her or execute the onSuccess callback
     */
    addGameAndRedirectUser = async () => {
        try {
            if (this.props.newGame) {
                await addGameToUser(this.props.uid, this.props.userName, this.props.selectedGame.platform,
                    this.props.selectedGame.gameKey, this.state.gamerTagText);
            } else {
                updateUserGamerTag(this.props.uid, this.props.selectedGame.platform, this.props.selectedGame.gameKey, this.state.gamerTagText);
            }

            subscribeUserToTopic(this.props.selectedGame.gameKey, this.props.uid);

            trackOnSegment('Add Gamer Tag Process Completed',
                { game: this.props.selectedGame.gameKey, platform: this.props.selectedGame.platform });

            /**
             * redirect: prop to know if the modal should redirect to other screen
             * or just call a function and then hide
             */
            if (this.props.redirect) {
                if (this.props.loadGamesUserDontHave) {
                    this.props.navigation.navigate('Profile');
                } else {
                    this.props.navigation.navigate('SetBet',
                        { game: {
                            gameKey: this.props.selectedGame.gameKey,
                            platform: this.props.selectedGame.platform
                        }
                    });
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
        if (this.props.onCancel) {
            this.props.onCancel();
        }

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

    /**
     * Close the discordTag modal
     */
    closeDiscordTagModal = () => this.setState({ openDiscordTagModal: false });

    render() {
        return (
            <Modal
                animationType='fade'
                transparent
                visible={this.props.open}
                onRequestClose={this.closeModal}
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
                                    placeholder={translate('addGamerTagModal.gamerTagPlaceholder')}
                                    placeholderTextColor='#FFF'
                                    autoCapitalize='none'
                                    onChangeText={(text) => this.setState({ gamerTagText: text })}
                                    onSubmitEditing={this.saveGameOnUser}
                                    defaultValue={this.props.previousGamerTag} />
                                {this.state.gamerTagError &&
                                    <Text style={styles.smallText}>{translate('addGamerTagModal.invalidGamerTag')}</Text>
                                }
                                <Text style={styles.modalText}>{translate('addGamerTagModal.body', { selectedGame: this.isThereSelectedGame() && this.props.selectedGame.name, gamerTag: this.state.gamerTagText || this.props.previousGamerTag })}</Text>
                                <TouchableWithoutFeedback onPress={this.saveGameOnUser}>
                                        <View style={styles.confirmButton}>
                                            <Text style={styles.confirmButtonText}>Aceptar</Text>
                                        </View>
                                </TouchableWithoutFeedback>
                                <AddDiscordTagModal
                                    open={this.state.openDiscordTagModal}
                                    onClose={this.closeDiscordTagModal}
                                    onSuccess={this.addGameAndRedirectUser} />
                            </View>
                        </View>
                    </View>
            </Modal>
        );
    }
}

AddGamerTagModal.defaultProps = {
    newGame: true,
    previousGamerTag: ''
};

function mapStateToProps(state) {
    return {
        discordTag: state.userReducer.user.discordTag
    };
}

export default connect(mapStateToProps)(withNavigation(AddGamerTagModal));
