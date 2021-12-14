import React, { Component } from 'react';
import { Modal, SafeAreaView, TouchableOpacity, View } from 'react-native';

import images from '../../../assets/images';
import styles from './style';
import QaplaText from '../QaplaText/QaplaText';
import LinearGradient from 'react-native-linear-gradient';
import { translate } from '../../utilities/i18';

class GalleryPermissionsModaliOS extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Modal
                    animationType='fade'
                    transparent={false}
                    visible={this.props.visible}
                    onRequestClose={this.props.onClose}>
                    <View style={styles.container}>
                        <View style={styles.topNav}>
                            <TouchableOpacity onPress={this.props.onClose}>
                                <images.svg.backIcon />
                            </TouchableOpacity>
                        </View>
                        <QaplaText style={styles.title}>
                            {translate('GalleryPermissionsModaliOS.allowAccess')}
                        </QaplaText>
                        <LinearGradient useAngle={true}
                            angle={136}
                            style={styles.body}
                            colors={['#A716EE', '#2C07FA']}>
                            <images.svg.cameraPermissions />
                            <TouchableOpacity onPress={this.props.onPress}>
                                <View style={styles.allowButton}>
                                    <QaplaText style={styles.allowButtonText}>
                                    {translate('GalleryPermissionsModaliOS.allow')}
                                    </QaplaText>
                                </View>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

export default GalleryPermissionsModaliOS;