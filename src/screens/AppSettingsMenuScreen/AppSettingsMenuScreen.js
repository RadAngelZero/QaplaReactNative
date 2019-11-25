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

const QaplaAppIcon = Images.png.qaplaAppIcon.img;

class AppSettingsMenuScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            discordModalOpen: false,
            bioModalOpen: false,
            privacyModalOpen: false
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

    goToTermsAndConditions = () => this.props.navigation.navigate('TermsAndConditions');

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <Text style={styles.headerText}>Configuración</Text>
                    <Image style={styles.mainImage}
                        source={QaplaAppIcon} />
                    <Text style={styles.littleText}>{this.props.userName}</Text>

                    <View style={styles.menuHeader}>
                        <Text style={styles.menuHeaderText}> CONFIGURACIÓN </Text>
                    </View>
                    <ScrollView>
                        <TouchableWithoutFeedback onPress={this.goToSupport}>
                            <View style={styles.menuItemRow}>
                                <Text style={styles.menuItemRowText}> Soporte </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.toggleBioModal}>
                            <View style={styles.menuItemRow}>
                                <Text style={styles.menuItemRowText}>Editar Biografía</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.toggleDiscordModal}>
                            <View style={styles.menuItemRow}>
                                <Text style={styles.menuItemRowText}> Editar Discord </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.goToTermsAndConditions}>
                            <View style={styles.menuItemRow}>
                                <Text style={styles.menuItemRowText}>Términos y Condiciones</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.closeSession}>
                            <View style={styles.menuItemRow}>
                                <Text style={styles.menuItemRowText}>Cerrar sesión</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.togglePrivacyModal}>
	                        <View style={styles.menuItemRow}>
	                            <Text style={styles.menuItemRowText}>Aviso Privacidad</Text>
	                        </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
                <AddDiscordTagModal
                    open={this.state.discordModalOpen}
                    onClose={this.toggleDiscordModal} />
                <PrivacyModal
                    open={this.state.privacyModalOpen}
                    onClose={this.togglePrivacyModal} />
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
