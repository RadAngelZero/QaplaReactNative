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
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>¡Verifica tu Whatsapp!</Text>
                        <View style={styles.divider}>
                            <Image source={Divider} />
                        </View>
                    </View>
                    <View style={styles.phoneContainer}>
                        <View style={{flexDirection: 'row'}}>
                            <PhonePrefixPicker onChangePrefix={this.props.setPhonePrefix}/>
                            <TextInput
                                keyboardType='numeric'
                                style={styles.qaplaTextInput}
                                placeholder='Telefono*'
                                placeholderTextColor='#898A97'
                                onChangeText={this.props.setPhoneNumber} />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default VerificationPhoneNumber;
