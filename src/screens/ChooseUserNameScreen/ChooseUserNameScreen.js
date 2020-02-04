// diego          - 17-12-2019 - us172 - Refs added to end the process from text field with the keyboard
// diego          - 15-11-2019 - us149 - Check if user data is loaded on mapStateToProps
// josep.sanahuja - 05-08-2019 - us84 - + SafeAreaView
// josep.sanahuja - 08-07-2019 - us83 - Added 'goToScreen' logic & 'constructor'

import React, { Component } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback, Image, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import Images from './../../../assets/images';
import styles from './style';

import { validateUserName, createUserName } from '../../services/database';
import { translate } from '../../utilities/i18';
import CheckBox from '../../components/CheckBox/CheckBox';
import PrivacyModal from '../../components/PrivacyModal/PrivacyModal';
import TermsAndConditionsModal from '../../components/TermsAndConditionsModal/TermsAndConditionsModal';

const SignUpControllersBackgroundImage = Images.png.signUpControllers.img;

class ChooseUserNameScreen extends Component {
    constructor(props) {
        super (props);

        this.state = {
            userName: '',
            showErrorMessage: false,
            checkingUserName: false,
            agreementTermsState: false,
            agreementPrivacyState: false,
            openTermsModal: false,
            openPrivacyModal: false
        };
    }

    /**
     * Validate the agreements (terms and privacy), also validate the userName
     * if everything is right add the userName and returns the user to the previous flow
     */
    checkTermsConditionsAndUsername = () => {
        if (this.state.userName !== '' && !this.state.checkingUserName && this.state.agreementPrivacyState && this.state.agreementTermsState) {
            this.setState({
            	checkingUserName: true,
            	showErrorMessage: false }, async () => {
                if(this.state.userName !== '' && await validateUserName(this.state.userName)) {
                    createUserName(this.props.uid, this.state.userName);
                    this.props.navigation.popToTop();
                } else {
                this.setState({
                    showErrorMessage: true,
                    checkingUserName: false
                });
                }
            });
        }
    }

    /**
     * Toggle the agreementTermsState (checkbox)
     */
    toggleAgreementTermsState = () => this.setState({ agreementTermsState: !this.state.agreementTermsState });

    /**
     * Toggle the agreementPrivacyState (checkbox)
     */
    toggleAgreementPrivacyState = () => this.setState({ agreementPrivacyState: !this.state.agreementPrivacyState });

    /**
     * Set the userName
     * @param {string} userName Value of the userName given by the user
     */
    setUserName = (userName) => this.setState({ userName });

    /**
     * Open the terms and conditions modal
     */
    openTermsModal = () => this.setState({ openTermsModal: true });

    /**
     * Open the privacy modal
     */
    openPrivacyModal = () => this.setState({ openPrivacyModal: true });

    /**
     * Close the terms and conditions modal
     */
    closeTermsAndConditionsModal = () => this.setState({ openTermsModal: false });

    /**
     * Close the privacy modal
     */
    closePrivacyModal = () => this.setState({ openPrivacyModal: false });

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>{translate('chooseUserNameScreen.title')}</Text>
                        <TextInput
                            style = {styles.inputText}
                            placeholder={translate('chooseUserNameScreen.userNamePlaceholder')}
                            autoCapitalize='none'
                            editable={!this.state.checkingUserName}
                            onChangeText= {this.setUserName}
                            onSubmitEditing={this.checkTermsConditionsAndUsername} />
                    </View>
                    {this.state.showErrorMessage &&
                    <View>
                        <Text style={styles.buttonText}>{translate('chooseUserNameScreen.userNameAlreadyTaken')}</Text>
                    </View>
                    }
                    <Text style={styles.modalText}>
                        {`${translate('chooseUserNameScreen.bodyFirstPart')} `}
                        <TouchableWithoutFeedback onPress={this.openTermsModal}>
                            <Text style={styles.hyperlinkText}>
                                {translate('chooseUserNameScreen.termsAndConditions')}
                            </Text>
                        </TouchableWithoutFeedback>
                        {` ${translate('chooseUserNameScreen.bodySecondPart')} `}
                        <TouchableWithoutFeedback onPress={this.openPrivacyModal}>
                            <Text style={styles.hyperlinkText}>
                                {translate('chooseUserNameScreen.privacyPolicy')}
                            </Text>
                        </TouchableWithoutFeedback>
                    </Text>
                    <CheckBox
                        label={translate('chooseUserNameScreen.agreeWithTerms')}
                        onPress={this.toggleAgreementTermsState}
                        selected={this.state.agreementTermsState}
                        disabled={this.state.checkingUserName} />
                    <CheckBox
                        label={translate('chooseUserNameScreen.agreeWithPrivacy')}
                        onPress={this.toggleAgreementPrivacyState}
                        selected={this.state.agreementPrivacyState}
                        disabled={this.state.checkingUserName}
                        style={styles.bottomCheckBox} />
                    <TouchableWithoutFeedback
                        disabled={this.state.userName === '' || this.state.checkingUserName || !(this.state.agreementPrivacyState && this.state.agreementTermsState)}
                        onPress={this.checkTermsConditionsAndUsername}>
                        <View style={styles.confirmButton}>
                            <Text style={styles.confirmButtonText}>
                                {translate('chooseUserNameScreen.acceptButton')}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {this.state.checkingUserName &&
                        <View>
                            <Text style={styles.validatingText}>
                                {translate('chooseUserNameScreen.validatingUserName')}
                            </Text>
                        </View>
                    }
                    <Image style={styles.backgroundImage}
                        source={SignUpControllersBackgroundImage} />
                    <PrivacyModal
                        open={this.state.openPrivacyModal}
                        onClose={this.closePrivacyModal} />
                    <TermsAndConditionsModal
                        open={this.state.openTermsModal}
                        onClose={this.closeTermsAndConditionsModal} />
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    /**
     * Check if user object (in redux) contains data (when a user is not logged
     * or a user make signout their redux object is empty)
     */
    if (Object.keys(state.userReducer.user).length > 0 && state.userReducer.user.hasOwnProperty('id')) {
        return {
            uid: state.userReducer.user.id
        };
    }
    return { user: {} };
}

export default ChooseUserNameScreen = connect(mapStateToProps)(ChooseUserNameScreen);
