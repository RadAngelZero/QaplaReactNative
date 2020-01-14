// diego           - 17-12-2019 - us174 - Age TextInput added to this screen
// diego           - 18-12-2019 - us173 - onSubmitEditing event added to execute goToNextStep
// diego           - 17-12-2019 - us172 - Refs added to pass from one text field to another
//                                        autamatically with keyboard
// diego           - 18-09-2019 - us119 - File creation

import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, TextInput } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import { translate } from '../../utilities/i18';

const Divider = images.png.divider.img;

export class VerificationPersonalData extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{translate('verificationScreen.verificationPersonalData.title')}</Text>
                <View style={styles.divider}>
                    <Image source={Divider} />
                </View>
                <KeyboardAvoidingView style={styles.userDataForm} behavior='padding'>
                    <TextInput
                        style={styles.qaplaTextInput}
                        placeholder={translate('verificationScreen.verificationPersonalData.namePlaceholder')}
                        placeholderTextColor='#898A97'
                        onChangeText={(text) => this.props.setUserPersonalData('name', text)}
                        onSubmitEditing={() => this.firstSurname.focus()}
                        returnKeyType='next' />
                    <TextInput
                        style={styles.qaplaTextInput}
                        placeholder={translate('verificationScreen.verificationPersonalData.firstSurnamePlaceholder')}
                        placeholderTextColor='#898A97'
                        ref={(firstSurname) => this.firstSurname = firstSurname}
                        onChangeText={(text) => this.props.setUserPersonalData('firstSurname', text)}
                        onSubmitEditing={() => this.secondSurname.focus()}
                        returnKeyType='next' />
                    <TextInput
                        style={styles.qaplaTextInput}
                        placeholder={translate('verificationScreen.verificationPersonalData.secondSurnamePlacholder')}
                        placeholderTextColor='#898A97'
                        ref={(secondSurname) => this.secondSurname = secondSurname}
                        onChangeText={(text) => this.props.setUserPersonalData('secondSurname', text)}
                        onSubmitEditing={() => this.age.focus()}
                        returnKeyType='next' />
                    <TextInput
                        style={styles.qaplaTextInput}
                        placeholder={translate('verificationScreen.verificationPersonalData.agePlaceholder')}
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
