// diego          - 17-12-2019 - us172 - Refs added to end the process from text field with the keyboard
// diego          - 15-11-2019 - us149 - Check if user data is loaded on mapStateToProps
// josep.sanahuja - 05-08-2019 - us84 - + SafeAreaView
// josep.sanahuja - 08-07-2019 - us83 - Added 'goToScreen' logic & 'constructor'

import React, { Component } from 'react';
import { View, TextInput, TouchableWithoutFeedback, Image, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import Images from './../../../assets/images';
import styles from './style';

import { validateUserName, createUserProfile } from '../../services/database';
import { translate } from '../../utilities/i18';

import CheckBox from '../../components/CheckBox/CheckBox';
import PrivacyModal from '../../components/PrivacyModal/PrivacyModal';
import TermsAndConditionsModal from '../../components/TermsAndConditionsModal/TermsAndConditionsModal';
import QaplaText from '../../components/QaplaText/QaplaText';

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
    checkTermsConditionsAndUsername = async () => {
        try {
            if (this.state.userName !== '' && !this.state.checkingUserName && this.state.agreementPrivacyState && this.state.agreementTermsState) {
                this.setState({
                    checkingUserName: true,
                    showErrorMessage: false }, async () => {
                    if(this.state.userName !== '' && await validateUserName(this.state.userName)) {
                        const email = this.props.navigation.getParam('email', '');

                        await createUserProfile(this.props.uid, email, this.state.userName);

                        const originScreen = this.props.navigation.getParam('originScreen', 'Explore');

                        this.props.navigation.navigate(originScreen);
                    } else {
                    this.setState({
                        showErrorMessage: true,
                        checkingUserName: false
                    });
                    }
                });
            }
        }
        catch(error) {
            console.error(`[checkTermsConditionsAndUsername]`, error);
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
                        <QaplaText style={styles.title}>{translate('chooseUserNameScreen.title')}</QaplaText>
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
                        <QaplaText style={styles.buttonText}>{translate('chooseUserNameScreen.userNameAlreadyTaken')}</QaplaText>
                    </View>
                    }
                    <QaplaText style={styles.modalText}>
                        {`${translate('chooseUserNameScreen.bodyFirstPart')} `}
                        <TouchableWithoutFeedback onPress={this.openTermsModal}>
                            <QaplaText style={styles.hyperlinkText}>
                                {translate('chooseUserNameScreen.termsAndConditions')}
                            </QaplaText>
                        </TouchableWithoutFeedback>
                        {` ${translate('chooseUserNameScreen.bodySecondPart')} `}
                        <TouchableWithoutFeedback onPress={this.openPrivacyModal}>
                            <QaplaText style={styles.hyperlinkText}>
                                {translate('chooseUserNameScreen.privacyPolicy')}
                            </QaplaText>
                        </TouchableWithoutFeedback>
                    </QaplaText>
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
                            <QaplaText style={styles.confirmButtonText}>
                                {translate('chooseUserNameScreen.acceptButton')}
                            </QaplaText>
                        </View>
                    </TouchableWithoutFeedback>
                    {this.state.checkingUserName &&
                        <View>
                            <QaplaText style={styles.validatingText}>
                                {translate('chooseUserNameScreen.validatingUserName')}
                            </QaplaText>
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
