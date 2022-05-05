// josep.sanahuja  - 12-12-2019 - us160 - Add close() for closeAnalyticsEvent
// diego           - 03-09-2019 - us96 - File creation

import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import Images from './../../../assets/images';
import QaplaIcon from '../QaplaIcon/QaplaIcon';

const BackIcon = Images.svg.backIcon;
const CloseIcon = Images.svg.closeThiccIcon;

class TopNavOptions extends Component {
    /**
     * Closing action executed when pressing CloseIcon,
     * it performs a series of instruction previous to close the screen
     * where the component is placed.
     */
    close = () => {
        if (this.props.closeEvent) {
            this.props.closeEvent();
        }

        if (this.props.onCloseNavigateTo) {
            this.props.navigation.navigate(this.props.onCloseNavigateTo);
        }

        /**
         * As we want to avoid that the user can access to the profile screen if is not logged we need to define manually
         * the navigation flow on the SignIn/LogIn screens
         *
         * If we are on the SignIn/LogIn screen
         */
        if ((this.props.currentScreen === 'SignIn' && this.props.previousScreen === 'Profile')) {

            return this.props.navigation.navigate('Explore');
        }

        return this.props.navigation.dismiss();
    }

    render() {
        return (
            <SafeAreaView style={(this.props.currentScreen !== 'SignIn') ?
                styles.sfvContainer : styles.sfvContainerSignInWithEmail}>
                <View style={styles.optionsContainer}>
                    <View style={styles.backIconContainer}>
                        {this.props.back &&
                            <QaplaIcon onPress={() => this.props.navigation.pop()}>
                                <BackIcon />
                            </QaplaIcon>
                        }
                    </View>
                    <View style={styles.closeIconContainer}>
                        {this.props.close &&
                            <QaplaIcon onPress={this.close}>
                                <CloseIcon />
                            </QaplaIcon>
                        }
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentScreen: state.screensReducer.currentScreenId,
        previousScreen: state.screensReducer.previousScreenId,
    }
}

export default connect(mapStateToProps)(TopNavOptions);
