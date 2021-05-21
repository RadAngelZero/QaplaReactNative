import React, { Component } from 'react';
import { Linking, ScrollView, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import QaplaText from '../../components/QaplaText/QaplaText';
import Images from '../../../assets/images';
import { translate } from '../../utilities/i18';
import { getCommunitySurvey } from '../../services/database';

class CommunityScreen extends Component {
    answerSurvey = async () => {
        const url = await getCommunitySurvey();
        if (url) {
            Linking.openURL(url.val());
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.communityIcon}>
                    <Images.svg.community3DIcon />
                </View>
                <View style={styles.bottomSheetContainer}>
                    <LinearGradient
                        useAngle
                        angle={136}
                        style={styles.bottomSheet}
                        colors={['#A716EE', '#2C07FA']}>
                        <ScrollView>
                            <View style={styles.bottomSheetBody}>
                                <QaplaText style={styles.comingSoon}>
                                    {translate('CommunityScreen.comingSoon')}
                                </QaplaText>
                                <QaplaText style={styles.description}>
                                    {translate('CommunityScreen.description')}
                                </QaplaText>
                                <QaplaText style={styles.feedbackRequest}>
                                    {translate('CommunityScreen.feedbackRequest')}
                                </QaplaText>
                                <TouchableOpacity
                                    onPress={this.answerSurvey}
                                    style={styles.buttonContainer}>
                                    <QaplaText style={styles.buttonText}>
                                        {translate('CommunityScreen.answerSurvery')}
                                    </QaplaText>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </LinearGradient>
                </View>
            </View>
        );
    }
}

export default CommunityScreen;