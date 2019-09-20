// diego           - 18-09-2019 - us119 - File creation

import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, TextInput } from 'react-native';

import styles from './style';
import images from '../../../assets/images';

const Divider = images.png.divider.img;

export class VerificationPersonalData extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>¿Cómo te llamas?</Text>
                <View style={styles.divider}>
                    <Image source={Divider} />
                </View>
                <KeyboardAvoidingView style={styles.userDataForm} behavior='padding'>
                    <TextInput
                        style={styles.qaplaTextInput}
                        placeholder='Nombre(s)*'
                        placeholderTextColor='#898A97'
                        onChangeText={(text) => this.props.setUserPersonalData('name', text)} />
                    <TextInput
                        style={styles.qaplaTextInput}
                        placeholder='Apellido Paterno*'
                        placeholderTextColor='#898A97'
                        onChangeText={(text) => this.props.setUserPersonalData('firstSurname', text)} />
                    <TextInput
                        style={styles.qaplaTextInput}
                        placeholder='Apellido Materno*'
                        placeholderTextColor='#898A97'
                        onChangeText={(text) => this.props.setUserPersonalData('secondSurname', text)} />
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default VerificationPersonalData;
