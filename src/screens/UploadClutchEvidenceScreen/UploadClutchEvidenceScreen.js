// diego          - 13-08-2019 - us77 - File creation

import React, { Component } from 'react';
import { View, Image, ScrollView, TextInput, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './style';
import Images from './../../../assets/images';
import { getDimensions } from '../../utilities/iosAndroidDim';

const images = [Images.png.uploadVideoClutch.img, Images.png.shareClutchLink.img];

export class UploadClutchEvidenceScreen extends Component {
    state = {
        selectedIndex: 0,
        url: '',
        showUrlError: false
    };

    setSelectedIndex = (scrollEvent) => {
        const scrollPosition = scrollEvent.nativeEvent.contentOffset.x;
        this.setState({ selectedIndex: scrollPosition < getDimensions().width/2 ? 0 : 1 });
    }

    setUrlText = (url) => {
        this.setState({ showUrlError: false, url });
    }

    urlIsValid = () => {
        console.log(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(this.state.url));
        return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(this.state.url);
    }

    submitData = () => {
        if (this.urlIsValid()) {
            //Send the data to the database
        } else {
            console.log('Show error');
            this.setState({ showUrlError: true });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.scrollContainer}>
                    <ScrollView horizontal
                        pagingEnabled
                        disableIntervalMomentum
                        onScroll={this.setSelectedIndex}>
                        <View style={styles.carrouselContainer}>
                            {images.map((image, index) => (
                                <View key={`ClutchTutorialCarouselIndex${index}`}>
                                    <Image style={styles.image} source={image}/>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressCircleIndicator, { backgroundColor: this.state.selectedIndex === 0 ? '#6D7DDE' : '#B1B1B1' }]} />
                        <View style={[styles.progressCircleIndicator, { backgroundColor: this.state.selectedIndex === 1 ? '#6D7DDE' : '#B1B1B1' }]} />
                    </View>
                </View>
                <TextInput placeholder='Inserta aqui el URL del clip'
                    placeholderTextColor='#898A97'
                    onChangeText={this.setUrlText}
                    style={[styles.urlTextInput, { borderBottomColor: this.state.showUrlError ? '#FF0000' : 'transparent' }]} />
                <Text style={styles.instructions}>
                    Sube tu clip a tu perfil de CLUTCH usando el <Text style={styles.highlightedText}>#qaplagaming</Text> con el <Text style={styles.highlightedText}>ID de la partida</Text> en la descripción y compártenos el link, como se muestra en la imagen de arriba ;)
                </Text>
                <TouchableWithoutFeedback onPress={this.submitData}>
                    <View style={styles.readyButton}>
                        <Text style={styles.readyButtonText}>Listo</Text>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.goToClutchButtonText}>IR A CLUTCH</Text>
            </View>
        );
    }
}

export default UploadClutchEvidenceScreen;
