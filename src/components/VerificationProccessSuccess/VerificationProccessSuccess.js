// diego           - 24-09-2019 - us128 - File creation

import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import styles from './style';
import images from '../../../assets/images';

class VerificationProccessSuccess extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={images.png.verificationProccesSuccess.img} />
                <View style={styles.greetingContainer}>
                    <Text style={styles.title}>¡Gracias!</Text>
                    <Text style={styles.body}>
                        Hemos recibido tu solicitud, este proceso puede tardar hasta 48 hrs. Apreciamos tu paciencia, estamos trabajando para ti :D  
                    </Text>
                </View>
            </View>
        );
    }
}

export default VerificationProccessSuccess;