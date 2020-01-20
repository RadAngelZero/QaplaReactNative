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

    checkTermsConditionsAndUsername = () => {
        if (this.state.agreementTermsState && this.state.agreementPrivacyState) {
            this.setState({ checkingUserName: true, showErrorMessage: false }, async () => {
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

    toggleAgreementTermsState = () => this.setState({ agreementTermsState: !this.state.agreementTermsState });

    toggleAgreementPrivacyState = () => this.setState({ agreementPrivacyState: !this.state.agreementPrivacyState });

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
                            onChangeText= {(userName) => this.setState({ userName })}
                            onSubmitEditing={this.checkTermsConditionsAndUsername} />
                    </View>
                    {this.state.showErrorMessage &&
                    <View>
                        <Text style={styles.buttonText}>{translate('chooseUserNameScreen.userNameAlreadyTaken')}</Text>
                    </View>
                    }
                    <Text style={styles.modalText}>
                        {`${translate('chooseUserNameScreen.bodyFirstPart')} `}
                        <TouchableWithoutFeedback onPress={() => this.setState({ openTermsModal: true })}>
                            <Text style={styles.hyperlinkText}>
                                {translate('chooseUserNameScreen.termsAndConditions')}
                            </Text>
                        </TouchableWithoutFeedback>
                        {` ${translate('chooseUserNameScreen.bodySecondPart')} `}
                        <TouchableWithoutFeedback onPress={() => this.setState({ openPrivacyModal: true })}>
                            <Text style={styles.hyperlinkText}>
                                {translate('chooseUserNameScreen.privacyPolicy')}
                            </Text>
                        </TouchableWithoutFeedback>
                    </Text>
                    <CheckBox
                        label={translate('chooseUserNameScreen.agreeWithTerms')}
                        onPress={this.toggleAgreementTermsState} />
                    <CheckBox
                        label={translate('chooseUserNameScreen.agreeWithPrivacy')}
                        onPress={this.toggleAgreementPrivacyState}
                        style={styles.bottomCheckBox} />
                    <TouchableWithoutFeedback
                        disabled={this.state.userName === '' || this.state.checkingUserName}
                        onPress={this.checkTermsConditionsAndUsername}>
                        <View style={styles.confirmButton}>
                            <Text style={styles.confirmButtonText}>
                                {translate('chooseUserNameScreen.acceptButton')}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {this.state.checkingUserName &&
                        <View>
                            <Text style={styles.buttonText}>{translate('chooseUserNameScreen.validatingUserName')}</Text>
                        </View>
                    }
                    <Image style={styles.backgroundImage}
                        source={SignUpControllersBackgroundImage} />
                    <PrivacyModal
                        open={this.state.openPrivacyModal}
                        onClose={() => this.setState({ openPrivacyModal: false })} />
                    <TermsAndConditionsModal
                        open={this.state.openTermsModal}
                        onClose={() => this.setState({ openTermsModal: false })} />
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
