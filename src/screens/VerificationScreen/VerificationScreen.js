// diego           - 18-09-2019 - us119 - File creation

import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback, Text } from 'react-native';

import styles from './style';
import Images from './../../../assets/images';
import VerificationPersonalData from '../../components/VerificationPersonalData/VerificationPersonalData';
import VerificationPhoneNumber from '../../components/VerificationPhoneNumber/VerificationPhoneNumber';
import ProgressStepsIndicator from '../../components/ProgressStepsIndicator/ProgressStepsIndicator';

const BackIcon = Images.svg.backIcon;
const CloseIcon = Images.svg.closeIcon;

class VerificationScreen extends Component {
    state = {
        firstStep:{
            name: '',
            firstSurname: '',
            secondSurname: ''
        },
        secondStep: {
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
        const { firstStep } = this.state;
        firstStep[dataKey] = data;
        this.setState({ firstStep });
    }

    /**
     * Set the telephonic number of the user
     * @param {string} phoneNumber Phone number of the user
     */
    setPhoneNumber = (phoneNumber) => {
        const { secondStep } = this.state;
        secondStep.phoneNumber = phoneNumber;
        this.setState({ secondStep });
    }

    /**
     * Add the position of the different slides (one per call)
     * @param {number} position X value of the given component (slide)
     */
    setIndexPosition = (position) => {
        const { indexPositions } = this.state;
        indexPositions.push(position);
        this.setState({ indexPositions });
    }

    /**
     * Scroll the ScrollView to the next step of the form
     */
    goToNextStep = () => {
        this.scrollViewRef.scrollTo({x: this.state.indexPositions[this.state.nextIndex], y: 0, animated: true});
        this.setState({ nextIndex: this.state.nextIndex + 1 });
    }

    /**
     * Scroll the ScrollView to the previous step of the form
     */
    goToPreviousStep = () => {
        this.scrollViewRef.scrollTo({x: this.state.indexPositions[this.state.nextIndex - 2], y: 0, animated: true});
        this.setState({ nextIndex: this.state.nextIndex - 1 });
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.backAndCloseOptions}>
                    <View style={styles.backIconContainer}>
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
                <ProgressStepsIndicator
                    steps={this.state.indexPositions.length}
                    selected={this.state.nextIndex - 1} />
            </SafeAreaView>
        );
    }
}

export default VerificationScreen;
