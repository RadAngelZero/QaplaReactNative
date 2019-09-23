// diego           - 19-09-2019 - us126 - File creation

import React, { Component } from 'react';
import { View, Text, Image, TextInput } from 'react-native';

import styles from './style';
import images from '../../../assets/images';

const Divider = images.png.divider.img;

export class VerificationPhoneNumber extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>¡Verifica tu Whatsapp!</Text>
                    <View style={styles.divider}>
                        <Image source={Divider} />
                    </View>
                </View>
                <View style={styles.phoneContainer}>
                    <TextInput
                        keyboardType='numeric'
                        style={styles.qaplaTextInput}
                        placeholder='Telefono*'
                        placeholderTextColor='#898A97'
                        onChangeText={this.props.setPhoneNumber} />
                    <Text style={styles.smallText}>10 digitos</Text>
                </View>
            </View>
        );
    }
}

export default VerificationPhoneNumber;
