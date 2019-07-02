import React, { Component } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import { createUserName } from '../../services/database';

class ChooseUserNameScreen extends Component {
    state = {
        userName: '',
        showErrorMessage: false
    };

    assignUserName() {
        this.setState({ showErrorMessage: false });
        createUserName(this.props.uid, this.state.userName)
        .then((algo) => {
            //Redirect to a better place
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Crea tu nombre de usuario</Text>
                    <TextInput style={styles.inputText} placeholder='Usuario' onChangeText={(text) => this.setState({ userName: text })} />
                </View>
                {this.state.showErrorMessage &&
                <View>
                    <Text style={styles.buttonText}>Ese nombre de usuario ya esta en uso, prueba con otro</Text>
                </View>
                }
                <View>
                    <TouchableWithoutFeedback onPress={() => createUserName(this.props.uid, this.state.userName)}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>CONTINUAR</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}

export default ChooseUserNameScreen = connect(mapStateToProps)(ChooseUserNameScreen);
