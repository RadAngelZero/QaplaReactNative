// josep.sanahuja - 08-07-2019 - us83 - Added 'goToScreen' logic & 'constructor'

import React, { Component } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { connect } from 'react-redux';
import Images from './../../../assets/images';
import styles from './style';

import { createUserName } from '../../services/database';

import {
    retrieveData,
    removeDataItem
} from '../../utilities/persistance'

const SignUpControllersBackgroundImage = Images.png.signUpControllers.img;

class ChooseUserNameScreen extends Component {
    constructor(props) {
        super (props);
        
        this.state = {
            userName: '',
            userNameTaken: false
        };
    }
    
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Crea tu nombre de usuario</Text>
                    <TextInput 
                        style = {this.state.userNameTaken ?styles.inputTextTaken : styles.inputText}
                        placeholder = 'Introduce tu Usuario'
                        onChangeText = {
                            (text) => this.setState({ userName: text, userNameTaken: false })
                        }
                        value = {this.state.userName}
                    />
                </View>
                {this.state.showErrorMessage &&
                <View>
                    <Text style={styles.buttonText}>Ese nombre de usuario ya esta en uso, prueba con otro</Text>
                </View>
                }
                <View>
                    <TouchableWithoutFeedback onPress={
                        async () => {
                            const res = await createUserName(this.props.uid, this.state.userName, this.props.navigation);
                            if (res) {
                                const scenario = await retrieveData('userName-creation-scenario');

                                // Since key was obtained then we can free memory on AsyncStorage
                                removeDataItem('userName-creation-scenario');
                                
                                this.goToScreen(scenario);
                            }
                            else {
                                this.setState({
                                    userNameTaken: true,
                                    userName: "Username ya usado"
                                }); 
                            }
                        }
                    }>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>CONTINUAR</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <Image style={styles.backgroundImage}
                    source={SignUpControllersBackgroundImage} />
            </View>
        );
    }

    goToScreen(scenario) {
        // Extract navigate method from this.props.navigation
        const {navigate} = this.props.navigation;

        // TODO: Modify 'screen' variable default value
        let screen = 'Retas';

        // The user wanted to create a match for the first time, so,
        // it comes from the 'Retas' screen
        if (scenario === "CreateFirstMatchFromRetas") {
            screen = 'ChooseMatchType';
        }
        // The user wanted to join a public match for the first time, 
        // so it comes from the Match Card
        else if (scenario === "JoinMatchFirstTime") {
            // TODO: modify screen to go, this is not the correct one.
            screen = 'ChooseMatchType';
        }

        console.log("[ChooseUserNameScreen] : goToScreen - result: " + JSON.stringify(screen) + " scenario: " + scenario);

        navigate (screen);
    }
}

function mapStateToProps(state) {
    if (state.userReducer.user.hasOwnProperty('id')) {
        return {
            uid: state.userReducer.user.id
        };
    }
    return { user: {} };
}

export default ChooseUserNameScreen = connect(mapStateToProps)(ChooseUserNameScreen);
