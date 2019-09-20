// diego           - 18-09-2019 - us119 - File creation

import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback, Text } from 'react-native';

import styles from './style';
import VerificationPersonalData from '../../components/VerificationPersonalData/VerificationPersonalData';
import VerificationPhoneNumber from '../../components/VerificationPhoneNumber/VerificationPhoneNumber';

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

    setScrollViewRef = (element) => {
        this.scrollViewRef = element;
    };

    setUserPersonalData = (dataKey, data) => {
        const { firstStep } = this.state;
        firstStep[dataKey] = data;
        this.setState({ firstStep });
    }

    setPhoneNumber = (phoneNumber) => {
        const { secondStep } = this.state;
        secondStep.phoneNumber = phoneNumber;
        this.setState({ secondStep });
    }

    setIndexPosition = (position) => {
        const { indexPositions } = this.state;

        /**
         * Save the X position of the slide to know where to scroll to show the right element of
         * the "carousel"
         */
        indexPositions.push(position);
        this.setState({ indexPositions });
    }

    goToNextStep = () => {

        /**
         * Scroll to the position of the nextIndex, so we can make things like validate data
         * before that we show to the user the next "slide"
         */
        this.scrollViewRef.scrollTo({x: this.state.indexPositions[this.state.nextIndex], y: 0, animated: true});
        this.setState({ nextIndex: this.state.nextIndex + 1 });
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
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
                    </ScrollView>
                </View>
                {this.state.nextIndex < this.state.indexPositions.length &&
                    <TouchableWithoutFeedback onPress={this.goToNextStep}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Continuar</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
            </SafeAreaView>
        );
    }
}

export default VerificationScreen;
