// diego           - 22-11-2019 - us151 - Added TermsAndConditionsScreen
// josep.sanahuja  - 21-12-2019 - us152 - Add Privacy Modal
// josep.sanahuja  - 13-11-2019 - us147 - File creation

import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import Images from './../../../assets/images';
import { signOut } from '../../services/auth';

import AddDiscordTagModal from '../../components/AddDiscordTagModal/AddDiscordTagModal';
import AddBioModal from '../../components/AddBioModal/AddBioModal';
import PrivacyModal from '../../components/PrivacyModal/PrivacyModal';
import { translate } from '../../utilities/i18';
import TermsAndConditionsModal from './../../components/TermsAndConditionsModal/TermsAndConditionsModal';

const QaplaAppIcon = Images.png.qaplaAppIcon.img;

class AppSettingsMenuScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            discordModalOpen: false,
            bioModalOpen: false,
            privacyModalOpen: false,
            termsModalOpen: false
        };
    }

    goToSupport = () => {
        this.props.navigation.navigate('Support');
    }

    toggleDiscordModal = () => {
        this.setState({
            discordModalOpen: !this.state.discordModalOpen
        })
    }

    /* Toggle Privacy Modal, if opened then when pressing
     * it will be closed. And the way around.
     */
    togglePrivacyModal = () => {
        this.setState({
            privacyModalOpen: !this.state.privacyModalOpen
        })
    }

    closeSession = () => {
        signOut();
        this.props.navigation.navigate('Publicas');
    }

    toggleBioModal = () => this.setState({ bioModalOpen: !this.state.bioModalOpen });

    toggleTermsAndConditionsModal = () => this.setState({ termsModalOpen: !this.state.termsModalOpen });

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <Text style={styles.headerText}>{translate('settingsMenuScreen.header')}</Text>
                    <Image style={styles.mainImage}
                        source={QaplaAppIcon} />
                    <Text style={styles.littleText}>{this.props.userName}</Text>

                    <View style={styles.menuHeader}>
                        <Text style={styles.menuHeaderText}>{translate('settingsMenuScreen.menuHeader')}</Text>
                    </View>
                    <ScrollView>
                        <TouchableWithoutFeedback onPress={this.goToSupport}>
                            <View style={styles.menuItemRow}>
                                <Text style={styles.menuItemRowText}>{translate('settingsMenuScreen.support')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.toggleBioModal}>
                            <View style={styles.menuItemRow}>
                                <Text style={styles.menuItemRowText}>{translate('settingsMenuScreen.editBio')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.toggleDiscordModal}>
                            <View style={styles.menuItemRow}>
                                <Text style={styles.menuItemRowText}>{translate('settingsMenuScreen.editDiscord')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.toggleTermsAndConditionsModal}>
                            <View style={styles.menuItemRow}>
                                <Text style={styles.menuItemRowText}>{translate('settingsMenuScreen.termsAndConditions')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.togglePrivacyModal}>
                            <View style={styles.menuItemRow}>
                                <Text style={styles.menuItemRowText}>{translate('settingsMenuScreen.privacyNotice')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.closeSession}>
                            <View style={styles.menuItemRow}>
                                <Text style={styles.menuItemRowText}>{translate('settingsMenuScreen.closeSession')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
                <AddDiscordTagModal
                    open={this.state.discordModalOpen}
                    onClose={this.toggleDiscordModal} />
                <AddBioModal
                    open={this.state.bioModalOpen}
                    onClose={this.toggleBioModal} />
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
        userName: state.userReducer.user.userName
    }
}

export default connect(mapStateToProps)(AppSettingsMenuScreen);
