// diego           - 22-11-2019 - us151 - Added TermsAndConditionsScreen
// josep.sanahuja  - 21-12-2019 - us152 - Add Privacy Modal
// josep.sanahuja  - 13-11-2019 - us147 - File creation

import React, { Component } from 'react';
import { Alert, SafeAreaView, View, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import Images from './../../../assets/images';
import { signOut } from '../../services/auth';
import PrivacyModal from '../../components/PrivacyModal/PrivacyModal';
import { translate } from '../../utilities/i18';
import TermsAndConditionsModal from './../../components/TermsAndConditionsModal/TermsAndConditionsModal';
import QaplaText from '../../components/QaplaText/QaplaText';
import { deleteUserAccount } from '../../services/functions';
import { trackOnSegment } from '../../services/statistics';

const QaplaAppIcon = Images.png.qaplaSignupLogo.img;

class AppSettingsMenuScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bioModalOpen: false,
            privacyModalOpen: false,
            termsModalOpen: false
        };
    }

    goToSupport = () => {
        this.props.navigation.navigate('Support');
    }

    /**
     * Redirect the user to the notifications settings screen
     */
    goToNotificationsSettings = () => this.props.navigation.navigate('NotificationsSettings');

    /* Toggle Privacy Modal, if opened then when pressing
     * it will be closed. And the way around.
     */
    togglePrivacyModal = () => {
        this.setState({
            privacyModalOpen: !this.state.privacyModalOpen
        });
    }

    closeSession = () => {
        signOut();
        this.props.navigation.navigate('Explore');
    }

    /**
     * Toggle the Terms and conditions modal
     */
    toggleTermsAndConditionsModal = () => this.setState({ termsModalOpen: !this.state.termsModalOpen });

    deleteAccountConfirmation = () => {
        Alert.alert(
            'Eliminar cuenta',
            '¿Estas seguro que deseas eliminar tu cuenta y toda la información de la misma de forma permanente?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Eliminar cuenta',
                    onPress: () => this.tryToDeleteAccount(),
                    style: 'destructive'
                }
            ],
            {
                cancelable: true
            }
        );
    }

    tryToDeleteAccount = async () => {
        try {
            trackOnSegment('User deleted their account', {
                uid: this.props.uid
            });

            await deleteUserAccount(this.props.uid);

            Alert.alert(
                'Cuenta eliminada',
                'Tu cuenta y la información relacionada a la misma han sido eliminadas',
                [
                    {
                        text: 'Ok',
                        onPress: async () => {
                            await signOut();
                            this.props.navigation.navigate('Explore')
                        }
                    }
                ]
            );
        } catch (error) {
            console.log(error);
            Alert.alert(
                'Error al eliminar cuenta',
                'No se pudo eliminar la cuenta, por favor intentelo mas tarde o contacta con soporte tecnico',
                [
                    {
                        text: 'Ok'
                    }
                ],
                {
                    cancelable: true
                }
            );
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <QaplaText style={styles.headerText}>{translate('settingsMenuScreen.header')}</QaplaText>
                    <Image style={styles.mainImage}
                        source={QaplaAppIcon} />
                    <QaplaText style={styles.littleText}>{this.props.userName}</QaplaText>

                    <View style={styles.menuHeader}>
                        <QaplaText style={styles.menuHeaderText}>{translate('settingsMenuScreen.menuHeader')}</QaplaText>
                    </View>
                    <ScrollView>
                        <TouchableWithoutFeedback onPress={this.goToSupport}>
                            <View style={styles.menuItemRow}>
                                <QaplaText style={styles.menuItemRowText}>{translate('settingsMenuScreen.support')}</QaplaText>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.goToNotificationsSettings}>
                            <View style={styles.menuItemRow}>
                                <QaplaText style={styles.menuItemRowText}>{translate('settingsMenuScreen.notifications')}</QaplaText>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.toggleTermsAndConditionsModal}>
                            <View style={styles.menuItemRow}>
                                <QaplaText style={styles.menuItemRowText}>{translate('settingsMenuScreen.termsAndConditions')}</QaplaText>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.togglePrivacyModal}>
                            <View style={styles.menuItemRow}>
                                <QaplaText style={styles.menuItemRowText}>{translate('settingsMenuScreen.privacyNotice')}</QaplaText>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.closeSession}>
                            <View style={styles.menuItemRow}>
                                <QaplaText style={styles.menuItemRowText}>{translate('settingsMenuScreen.closeSession')}</QaplaText>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.deleteAccountConfirmation}>
                            <View style={styles.menuItemRow}>
                                <QaplaText style={styles.menuItemRowTextDanger}>
                                    Eliminar cuenta
                                </QaplaText>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
                <PrivacyModal
                    open={this.state.privacyModalOpen}
                    onClose={this.togglePrivacyModal} />
                <TermsAndConditionsModal
                    open={this.state.termsModalOpen}
                    onClose={this.toggleTermsAndConditionsModal} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        userName: state.userReducer.user.userName,
        uid: state.userReducer.user.id
    }
}

export default connect(mapStateToProps)(AppSettingsMenuScreen);
