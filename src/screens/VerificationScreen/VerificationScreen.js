// diego           - 18-09-2019 - us119 - File creation

import React, { Component } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import styles from './style';
import VerificationPersonalData from '../../components/VerificationPersonalData/VerificationPersonalData';

class VerificationScreen extends Component {
    state = {
        firstStep:{
            name: '',
            firstSurname: '',
            secondSurname: ''
        }
    };

    setUserPersonalData = (dataKey, data) => {
        const { firstStep } = this.state;
        firstStep[dataKey] = data;
        this.setState({ firstStep });
    }

    goToNextStep = () => {
        console.log(this.state.firstStep);
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}>
                    <VerificationPersonalData
                        setUserPersonalData={this.setUserPersonalData}
                        goToNextStep={this.goToNextStep} />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default VerificationScreen;
