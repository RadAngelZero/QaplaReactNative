import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import styles from './style';
import Images from './../../../assets/images';

class SignInScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image source={Images.png.instagramIcon.img} />
                </View>
                <View>
                    <TouchableWithoutFeedback>
                        <View style={{ borderRadius: 100, backgroundColor: 'rgba(54,79,226,1)', paddingVertical: 16, paddingHorizontal: 16, marginTop: 44 }}>
                            <Text style={{ color: '#FFF', alignSelf: 'center' }}>Continuar con Facebook</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={{ borderRadius: 100, backgroundColor: '#FFFFFF', paddingVertical: 16, paddingHorizontal: 16, marginTop: 24 }}>
                            <Text style={{ color: 'rgba(0, 0, 0, .541)', alignSelf: 'center' }}>Continuar con Google</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{ flexDirection: 'row', marginTop: 25 }}>
                        <Text style={{ color: '#FFF', alignSelf: 'center' }}>¿Ya tienes cuenta?</Text>
                        <Text style={{ color: 'rgba(61,249,223,1)', alignSelf: 'center', marginLeft: 5 }}>Ingresa con correo</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default SignInScreen;
