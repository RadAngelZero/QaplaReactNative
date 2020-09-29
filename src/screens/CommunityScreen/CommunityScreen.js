import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import { SHEET_MAX_HEIGHT } from '../../utilities/Constants';
import Colors from '../../utilities/Colors';
import QaplaText from '../../components/QaplaText/QaplaText';
import Images from '../../../assets/images';
import { translate } from '../../utilities/i18';

class CommunityScreen extends Component {
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
                            <TouchableOpacity style={styles.buttonContainer}>
                                <QaplaText style={styles.buttonText}>
                                    {translate('CommunityScreen.answerSurvery')}
                                </QaplaText>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        );
    }
}

export default CommunityScreen;