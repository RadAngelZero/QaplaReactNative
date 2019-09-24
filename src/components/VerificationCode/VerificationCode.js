// diego           - 23-09-2019 - us127 - File creation

import React, { Component } from 'react';
import { View, Text, Image, TextInput } from 'react-native';

import styles from './style';
import images from '../../../assets/images';

const Divider = images.png.divider.img;

class VerificationCode extends Component {
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
                        placeholder='Ingresar Código'
                        placeholderTextColor='#898A97'
                        onChangeText={this.props.setVerificationCode} />
                    <Text style={styles.smallText}>Te enviamos un código de verificación</Text>
                </View>
            </View>
        );
    }
}

export default VerificationCode;
