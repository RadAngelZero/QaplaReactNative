// diego           - 18-12-2019 - us173 - onSubmitEditing event added to execute goToNextStep
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
                        onChangeText={(text) => this.props.setUserPersonalData('name', text)}
                        onSubmitEditing={() => this.firstSurname.focus()}
                        returnKeyType='next' />
                    <TextInput
                        style={styles.qaplaTextInput}
                        placeholder='Apellido Paterno*'
                        placeholderTextColor='#898A97'
                        ref={(firstSurname) => this.firstSurname = firstSurname}
                        onChangeText={(text) => this.props.setUserPersonalData('firstSurname', text)}
                        onSubmitEditing={() => this.secondSurname.focus()}
                        returnKeyType='next' />
                    <TextInput
                        style={styles.qaplaTextInput}
                        placeholder='Apellido Materno*'
                        placeholderTextColor='#898A97'
                        ref={(secondSurname) => this.secondSurname = secondSurname}
                        onChangeText={(text) => this.props.setUserPersonalData('secondSurname', text)}
                        onSubmitEditing={() => this.age.focus()}
                        returnKeyType='next' />
                    <TextInput
                        style={styles.qaplaTextInput}
                        placeholder='Edad*'
                        placeholderTextColor='#898A97'
                        keyboardType='numeric'
                        ref={(age) => this.age = age}
                        onSubmitEditing={this.props.goToNextStep}
                        onChangeText={(text) => this.props.setUserPersonalData('age', text)} />
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default VerificationPersonalData;
