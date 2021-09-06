import React, { Component } from 'react';
import { Modal, View, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import { translate } from '../../utilities/i18';
import AnimatedCircleIndicator from '../AnimatedCircleIndicator/AnimatedCircleIndicator';
import { defaultUserImages } from '../../utilities/Constants';
import QaplaText from '../QaplaText/QaplaText';
import images from '../../../assets/images';

class LevelInformationModal extends Component {
    render() {
        return (
            <Modal animationType='fade'
                transparent={true}
                visible={this.props.open}
                onRequestClose={this.props.onClose}>
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        <LinearGradient
                            useAngle
                            angleCenter={{ x: 0.5, y: 0.5 }}
                            angle={90}
                            colors={['#8216EE', '#FA07B6']}
                            style={styles.gradientContainer}>
                            <View style={styles.levelBenefitsContainer}>
                                <View style={styles.levelContainer}>
                                    <AnimatedCircleIndicator
                                        size={120}
                                        fill={Math.random() * 100}
                                        width={7}
                                        duration={750}
                                        fillComponent={() => (
                                            <Image
                                                style={styles.userImage}
                                                source={defaultUserImages[0].img} />
                                        )}
                                        backgroundColor='#1F2750'
                                        tintColor={Colors.greenQapla}
                                        descriptionComponent={() => (
                                            <View style={styles.expTextContainer}>
                                                <QaplaText style={styles.expText}>
                                                    {translate('newUserProfileScreen.level')}
                                                </QaplaText>
                                            </View>
                                        )} />
                                </View>
                                <View style={{flex: 1, marginLeft: 36 }}>
                                    <QaplaText style={styles.title}>
                                        {translate('LevelInformationModal.getMoreQoins')}
                                    </QaplaText>
                                    <View style={styles.benefitsDetailsContainer}>
                                        <View style={styles.benefitsDetails}>
                                            <QaplaText style={styles.qoinValue}>
                                                5 <images.svg.activityQoin height={16} width={16} />
                                            </QaplaText>
                                            <View style={[ styles.levelValueContainer, { borderTopLeftRadius: 50, borderBottomLeftRadius: 50 }]}>
                                                <QaplaText style={styles.levelValue}>
                                                    1
                                                </QaplaText>
                                            </View>
                                        </View>
                                        <View style={styles.benefitsDetails}>
                                            <QaplaText style={styles.qoinValue}>
                                                10 <images.svg.activityQoin height={16} width={16} />
                                            </QaplaText>
                                            <View style={styles.levelValueContainer}>
                                                <QaplaText style={styles.levelValue}>
                                                    2
                                                </QaplaText>
                                            </View>
                                        </View>
                                        <View style={styles.benefitsDetails}>
                                            <QaplaText style={styles.qoinValue}>
                                                15 <images.svg.activityQoin height={16} width={16} />
                                            </QaplaText>
                                            <View style={[ styles.levelValueContainer, { borderTopRightRadius: 50, borderBottomRightRadius: 50 }]}>
                                                <QaplaText style={styles.levelValue}>
                                                    3+
                                                </QaplaText>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                        <View style={styles.bodyContainer}>
                            <View style={styles.bodyTextContainer}>
                                <QaplaText style={styles.bodyText}>
                                    ⬆️ {translate('LevelInformationModal.bodyTextOne')}
                                </QaplaText>
                                <QaplaText style={[styles.bodyText, { marginTop: 16 }]}>
                                    ⛏ {translate('LevelInformationModal.bodyTextTwo')}
                                </QaplaText>
                            </View>
                            <TouchableOpacity
                                onPress={this.props.onClose}
                                style={styles.buttonContainer}>
                                <QaplaText style={styles.buttonText}>
                                    {translate('LevelInformationModal.gotIt')}
                                </QaplaText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default LevelInformationModal;