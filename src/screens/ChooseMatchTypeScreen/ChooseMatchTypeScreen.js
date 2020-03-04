// josep.sanahuja    - 12-12-2019 - us160 - Added trackOnSegment import
// josep.sanahuja    - 05-08-2019 - us84  - + SafeAreaView

import React, { Component } from 'react';
import { BackHandler, SafeAreaView, ScrollView, View, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './style';
import Images from '../../../assets/images';
import { recordScreenOnSegment, trackOnSegment } from '../../services/statistics';
import { translate } from '../../utilities/i18';
import { widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim';

const LightningIcon = Images.svg.lightningIcon;
const SearchIcon = Images.svg.searchIcon;

class ChooseMatchTypeScreen extends Component {
    componentWillMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBackButton);
        this.list = [

            /**
             * This event is triggered when the user goes to other screen
             */
            this.props.navigation.addListener(
                'willFocus',
                (payload) => {
                    recordScreenOnSegment('Choose Match Type');
                }
            )
        ]
    }

    componentWillUnmount() {
        this.backHandler.remove();

        //Remove willBlur and willFocus listeners on navigation
        this.list.forEach((item) => item.remove());
    }

    handleAndroidBackButton = () => {
        this.props.navigation.navigate('Public');

        return true;
    }

    /**
     * @description
     * Sends an event tracking public match button pressed and navigate to LoadGames screen.
     */
    goToLoadGames = () => {
        trackOnSegment('Public Match Button');
        this.props.navigation.navigate('SelectGame');
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.titleText}>{translate('chooseMatchTypeScreen.title')}</Text>
                        <View style={styles.lightningImage}>
                            <LightningIcon
                                width={widthPercentageToPx(30)}
                                height={heightPercentageToPx(30)} />
                        </View>
                        <TouchableWithoutFeedback onPress={this.goToLoadGames}>
                            <View style={styles.publicMatchButton}>
                                <Text style={styles.publicMatchButtonText}>
                                    {translate('chooseMatchTypeScreen.publicMatch')}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={styles.directMatchButton}>
                                <View style={styles.directMatchButtonSearchIcon}>
                                    <SearchIcon width={18} height={18} />
                                </View>
                                <Text style={styles.directMatchButtonText}>
                                    {translate('chooseMatchTypeScreen.directMatch')}
                                </Text>
                                <View style={styles.directMatchButtonSearchIcon}></View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default ChooseMatchTypeScreen;
