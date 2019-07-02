import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback, TextInput } from 'react-native';
import Images from './../../../assets/images';
import styles from './style';
import { signInWithEmailAndPassword } from '../../services/auth';

class LoginWithEmailScreen extends Component {
    state = {
        email: '',
        password: ''
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image source={Images.png.instagramIcon.img} />
                </View>
                <View style={{ width: '100%' }}>
                    <TextInput style={styles.inputText}
                        placeholder='Email o Usuario'
                        onChangeText={(text) => this.setState({ email: text })} />
                    <TextInput style={styles.inputText}
                        placeholder='Contraseña'
                        onChangeText={(text) => this.setState({ password: text })}
                        secureTextEntry />
                    <Text style={styles.forgotPasswordText} >¿Olvidaste tu contraseña?</Text>
                </View>
                <View>
                    <TouchableWithoutFeedback onPress={() => signInWithEmailAndPassword(this.state.email, this.state.password)}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText} >INICIAR SESION</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

export default LoginWithEmailScreen;
