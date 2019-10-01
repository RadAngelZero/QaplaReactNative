// josep.sanahuja  - 22-09-2019 - us122 - Add VerificationTakeSelfie
// diego           - 18-09-2019 - us119 - File creation

import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback, Text } from 'react-native';

import styles from './style';
import Images from './../../../assets/images';
import VerificationPersonalData from '../../components/VerificationPersonalData/VerificationPersonalData';
import VerificationTakeSelfie from '../../components/VerificationTakeSelfie/VerificationTakeSelfie';
import VerificationPhoneNumber from '../../components/VerificationPhoneNumber/VerificationPhoneNumber';
import ProgressStepsIndicator from '../../components/ProgressStepsIndicator/ProgressStepsIndicator';


const BackIcon = Images.svg.backIcon;
const CloseIcon = Images.svg.closeIcon;

class VerificationScreen extends Component {
    state = {
        personData:{
            name: '',
            firstSurname: '',
            secondSurname: ''
        },
        selfie: {
            cameraVisible: false,
            picture: {uri: "", base64: ""}
        },
        phoneData: {
            phoneNumber: ''
        },
        nextIndex: 1,
        indexPositions: []
    };

    /**
     * Define a ref for the ScrollView UI element
     * @param {element} element ScrollView
     */
    setScrollViewRef = (element) => {
        this.scrollViewRef = element;
    };

    /**
     * Set the fields of the first slide
     * @param {string} dataKey Name of the state variable to update
     * @param {string} data Data to store on the state
     */
    setUserPersonalData = (dataKey, data) => {
        const { personData } = this.state;
        personData[dataKey] = data;
        this.setState({ personData });
    }

    /**
     * Set the telephonic number of the user
     * @param {string} phoneNumber Phone number of the user
     */
    setPhoneNumber = (phoneNumber) => {
        const { phoneData } = this.state;
        phoneData.phoneNumber = phoneNumber;
        this.setState({ phoneData });
    }

    /**
     * Set the camera to either visible or invisible
     * @param {boolean} mode Camera visible mode
     */
    setCameraVisible = (mode) => {
        const { selfie } = this.state;
        selfie.cameraVisible = mode;
        this.setState({ selfie });
    }

    /**
    * Saves the picture to the state so it can be used.
    * 
    * @param {object} pict Object representing a picture, with uri and base64 props
    */
    savePicture = (pict) => {
        const { selfie } = this.state;
        selfie.picture.uri = pict.uri;
        selfie.picture.base64 = pict.base64;
        this.setState({ selfie });
    }
        
    /**
     * Add the position of the different slides (one per call)
     * @param {number} position X value of the given component (slide)
     */
    setIndexPosition = (position) => {
        const { indexPositions } = this.state;

        /**
         * Save the X position of the slide to know where to scroll to show the right element of
         * the "carousel"
         */
        indexPositions.push(position);
        this.setState({ indexPositions });
    }

    /**
     * Scroll the ScrollView to the next step of the form
     */
    goToNextStep = () => {

        /**
         * Scroll to the position of the nextIndex, so we can make things like validate data
         * before that we show to the user the next "slide"
         */
        this.scrollViewRef.scrollTo({x: this.state.indexPositions[this.state.nextIndex], y: 0, animated: true});
        this.setState({ nextIndex: this.state.nextIndex + 1 });
    }

    /**
     * Scroll the ScrollView to the previous step of the form
     */
    goToPreviousStep = () => {

        /**
         * Example to understand: this.state.nextIndex - 2
         * this.stat.nextIndex = 2 so currentIndex = 1 so previousIndex = 0
         * So to get 0 you need to remove 2 fromthis.stat.nextIndex (2 - 2 = 0)
         */
        this.scrollViewRef.scrollTo({x: this.state.indexPositions[this.state.nextIndex - 2], y: 0, animated: true});
        this.setState({ nextIndex: this.state.nextIndex - 1 });
    }

    render() {
        console.log(this.state);
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.backAndCloseOptions}>
                    <View style={styles.backIconContainer}>
                        {/** Just show BackIcon if the user has already passed at least the first slide */}
                        {this.state.nextIndex > 1 &&
                            <TouchableWithoutFeedback onPress={this.goToPreviousStep}>
                                <View style={styles.buttonDimensions}>
                                    <BackIcon />
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                    <View style={styles.closeIconContainer}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Logros')}>
                            <View style={styles.buttonDimensions}>
                                <CloseIcon />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={styles.scrollViewContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        ref={this.setScrollViewRef}>
                        <View onLayout={(event) => this.setIndexPosition(event.nativeEvent.layout.x)}>
                            <VerificationPersonalData
                                setUserPersonalData={this.setUserPersonalData}
                                goToNextStep={this.goToNextStep} />
                        </View>
                        <View onLayout={(event) => this.setIndexPosition(event.nativeEvent.layout.x)}>
                            <VerificationTakeSelfie
                                setCameraVisible={this.setCameraVisible}
                                savePicture={this.savePicture}
                                picture={this.state.selfie.picture}
                                cameraVisible={this.state.selfie.cameraVisible}
                                />
                        </View>
                        <View onLayout={(event) => this.setIndexPosition(event.nativeEvent.layout.x)}>
                            <VerificationPhoneNumber
                                setPhoneNumber={this.setPhoneNumber}
                                goToNextStep={this.goToNextStep} />
                        </View>
                        <View onLayout={(event) => this.setIndexPosition(event.nativeEvent.layout.x)}>
                            <VerificationPhoneNumber
                                setPhoneNumber={this.setPhoneNumber}
                                goToNextStep={this.goToNextStep} />
                        </View>
                    </ScrollView>
                </View>
                {this.state.nextIndex < this.state.indexPositions.length &&
                    <TouchableWithoutFeedback onPress={this.goToNextStep}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Continuar</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                
                {/**
                    * The selected (or current) index is the nextIndex - 1, we use nextIndex instead of
                   * currentIndex for the goToNextStep and goToPrevStep functions, can be changed to current
                   * in the future, actually don't have a major implication, is just a way to do the work
                */}
                <ProgressStepsIndicator
                    steps={this.state.indexPositions.length}
                    selected={this.state.nextIndex - 1} />
            </SafeAreaView>
        );
    }
}

export default VerificationScreen;
