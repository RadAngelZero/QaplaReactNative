// diego          - 17-12-2019 - us172 - Refs added to end the process from text field with the keyboard
// diego          - 15-11-2019 - us149 - Check if user data is loaded on mapStateToProps
// josep.sanahuja - 05-08-2019 - us84 - + SafeAreaView
// josep.sanahuja - 08-07-2019 - us83 - Added 'goToScreen' logic & 'constructor'

import React, { Component } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback, Image, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import Images from './../../../assets/images';
import styles from './style';

import { createUserName } from '../../services/database';
import { translate } from '../../utilities/i18';

const SignUpControllersBackgroundImage = Images.png.signUpControllers.img;

class ChooseUserNameScreen extends Component {
    constructor(props) {
        super (props);

        this.state = {
            userName: '',
            showErrorMessage: false
        };
    }

    validateAndSaveUserName = () => createUserName(this.props.uid, this.state.userName, () => this.props.navigation.popToTop(), () => this.setState({ showErrorMessage: true }));

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
                            onChangeText= {(text) => this.setState({ userName: text, userNameTaken: false })}
                            onSubmitEditing={this.validateAndSaveUserName} />
                    </View>
                    {this.state.showErrorMessage &&
                    <View>
                        <Text style={styles.buttonText}>{translate('chooseUserNameScreen.userNameAlreadyTaken')}</Text>
                    </View>
                    }
                    <View>
                        <TouchableWithoutFeedback onPress={this.validateAndSaveUserName}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>{translate('chooseUserNameScreen.continue')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Image style={styles.backgroundImage}
                        source={SignUpControllersBackgroundImage} />
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
