// josep.sanahuja  - 13-11-2019 - us147 - File creation

import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, SafeAreaView, Image } from 'react-native';
import { Svg } from 'react-native-svg';
import styles from './style';
import Images from './../../../assets/images';
import { recordScreenOnSegment } from '../../services/statistics';
import { getPercentWidth, getPercentHeight } from '../../utilities/iosAndroidDim';

const LightningIcon = Images.svg.lightningIcon;
const QaplaAppIcon = Images.png.qaplaAppIcon.img;
const SignUpControllersBackgroundImage = Images.png.qaplaAppIcon.img;

class AppSettingsMenuScreen extends Component {
    goToSupport = () => {
        this.props.navigation.navigate('Support');
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <Text style={styles.headerText}>Configuración</Text>
                    <Image style={styles.mainImage}
                    source={QaplaAppIcon} />  
                    <Text style={styles.littleText}>Miau</Text>  
                    
                    <View style={styles.menuHeader}>
                        <Text style={styles.menuHeaderText}> CONFIGURACIÓN </Text>
                    </View> 
                    <TouchableWithoutFeedback onPress={this.goToSupport}>
                        <View style={styles.menuItemRow}>
                            <Text style={styles.menuItemRowText}> Soporte </Text>
                        </View>
                    </TouchableWithoutFeedback>    
                    <View style={styles.menuItemRow}>
                        <Text style={styles.menuItemRowText}> Editar Discord </Text>
                    </View> 
                </View>
            </SafeAreaView>
        );
    }
}

export default AppSettingsMenuScreen;
