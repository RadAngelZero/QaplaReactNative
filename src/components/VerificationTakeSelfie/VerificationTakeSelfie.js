// diego           - 18-09-2019 - us119 - File creation

import React, { Component } from 'react';
import { View, Text, Image, TextInput } from 'react-native';

import styles from './style';
import Images from '../../../assets/images';

const Divider = Images.png.divider.img;
const QaplaSmileIcon = Images.png.qaplaSmile.img;

export class VerificationTakeSelfie extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Tómate una selfie</Text>
                    <View style={styles.divider}>
                        <Image source={Divider} />
                    </View>
                </View>
                <View style={styles.selfieContainer}>
                    <View>
                        <Image source={QaplaSmileIcon} />
                    </View>
                    <Text style={styles.smallText}>Subir Selfie</Text>            
                </View>
            </View>
        );
    }
}

export default VerificationTakeSelfie;
