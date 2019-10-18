// josep.sanahuja  - 17-10-2019 - us141 - File creation

import React, { Component } from 'react';
import { View, Text, Image, TextInput } from 'react-native';

import styles from './style';
import Images from '../../../assets/images';

const Divider = Images.png.divider.img;

class VerificationAskAge extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>¿Quantos años tienes?</Text>
                    <View style={styles.divider}>
                        <Image source={Divider} />
                    </View>
                </View>
                <View style={styles.ageContainer}>
                    <TextInput
                        keyboardType='numeric'
                        style={styles.qaplaTextInput}
                        placeholder='Ingresar edad'
                        placeholderTextColor='#898A97'
                        onChangeText={this.props.setAge} />
                </View>
            </View>
        );
    }
}

export default VerificationAskAge;
