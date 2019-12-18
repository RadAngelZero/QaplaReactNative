// josep.sanahuja  - 18-12-2019 - us176 - Added VerificationCode UI and logic
// josep.sanahuja  - 17-10-2019 - us134 - Added PhonePrefixPicker
// diego           - 19-09-2019 - us126 - File creation

import React, { Component } from 'react';
import { View, Text, Image, TextInput, SafeAreaView } from 'react-native';

import styles from './style';
import images from '../../../assets/images';

import PhonePrefixPicker from './PhonePrefixPicker/PhonePrefixPicker';

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
                    <View style={styles.phoneMainContainer}>
                        {!this.props.codeSent &&
                            <View style={styles.phoneContainer}>
                                <PhonePrefixPicker onChangePrefix={this.props.setPhonePrefix}/>
                                <TextInput
                                    keyboardType='numeric'
                                    style={styles.qaplaTextInput}
                                    placeholder='Telefono*'
                                    placeholderTextColor='#898A97'
                                    onChangeText={this.props.setPhoneNumber} />
                            </View>
                        }
                        {this.props.codeSent &&
                            <View style={styles.codeContainer}>
                                <TextInput
                                    keyboardType='numeric'
                                    style={styles.qaplaTextInput}
                                    placeholder='Ingresar Código'
                                    placeholderTextColor='#898A97'
                                    onChangeText={this.props.setVerificationCode} />
                                <Text style={styles.smallText}>Te enviamos un código de verificación</Text>
                            </View>

                        }
                    </View>
                </View>
        );
    }
}

export default VerificationPhoneNumber;
