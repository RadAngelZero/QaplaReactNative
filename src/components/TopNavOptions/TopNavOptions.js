// josep.sanahuja  - 12-12-2019 - us160 - Add close() for closeAnalyticsEvent
// diego           - 03-09-2019 - us96 - File creation

import React, { Component } from 'react';
import { SafeAreaView, View, TouchableWithoutFeedback } from 'react-native';

import styles from './style';
import Images from './../../../assets/images';

const BackIcon = Images.svg.backIcon;
const CloseIcon = Images.svg.closeIcon;

export class TopNavOptions extends Component {
    
    /**
     * Check if some game is selected
     */
    close = () => {
        if (this.props.closeEvent) {
            this.props.closeEvent();
        }

        this.props.navigation.navigate(this.props.onCloseGoTo);
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.optionsContainer}>
                    <View style={styles.backIconContainer}>
                        {this.props.back &&
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.pop()}>
                                <View style={styles.buttonDimensions}>
                                    <BackIcon />
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                    <View style={styles.closeIconContainer}>
                        {this.props.close &&
                            <TouchableWithoutFeedback onPress={this.close}>
                                <View style={styles.buttonDimensions}>
                                    <CloseIcon />
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default TopNavOptions;
