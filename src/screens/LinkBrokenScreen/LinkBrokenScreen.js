import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Linking, Platform } from 'react-native';
import styles from './style';

import Images from '../../../assets/images'

import {
 IOS_STORE_LINK,
 ANDROID_STORE_LINK
} from '../../utilities/Constants';

import { translate } from '../../utilities/i18';

import {
    recordScreenOnSegment,
    trackOnSegment
} from '../../services/statistics';


import QaplaIcon from '../../components/QaplaIcon/QaplaIcon';

const CloseIcon = Images.svg.closeIcon;

class LinkBrokenScreen extends Component {

 componentDidMount() {
	recordScreenOnSegment('Link Broken');
 }

 navigateToStore = () => {
    const url = Platform.OS === 'ios' ? IOS_STORE_LINK : ANDROID_STORE_LINK;
    
    trackOnSegment('Link broke update app', {
        Url: url
    });

    Linking.openURL(url);
 }

 navigateToEvents = () => {
 	trackOnSegment('Link broken public matches');
    this.props.navigation.navigate('Achievements');
 }

 render() {
     return (
        <SafeAreaView style={styles.sfvContainer}>
            <QaplaIcon onPress={this.navigateToEvents} touchableStyle={styles.closeIcon}>
                <CloseIcon />
            </QaplaIcon>
            <View style={styles.container}>
                <Text style={styles.title}>
                     {translate("deepLinks.linkBroken.title")}
                </Text>
                <Text style={styles.description}>
                    {translate("deepLinks.linkBroken.description")}
                </Text>
                <TouchableWithoutFeedback onPress={this.navigateToStore}>
                    <View style={styles.bttnContainer}>
                        <Text style={styles.bttnText}>
                            {translate("deepLinks.linkBroken.bttnText")}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
     );
 }
}

export default LinkBrokenScreen;
