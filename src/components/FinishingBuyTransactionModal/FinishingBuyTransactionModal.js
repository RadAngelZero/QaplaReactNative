import React, { Component } from 'react';
import { Image, Modal, SafeAreaView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import images from '../../../assets/images';
import ProgressBar from '../UserProfileRewards/Bar';

import styles from './style';

class FinishingBuyTransactionModal extends Component {
    render() {
        return (
            <Modal animationType='fade'
                transparent={true}
                visible={this.props.open}
                onRequestClose={() => {}}>
                <SafeAreaView style={styles.container}>
                    <LinearGradient useAngle
                        angle={136.25}
                        colors={['#A716EE', '#2C07FA']}
                        style={styles.gradientContainer}>
                        <View style={styles.gifStatusContainer}>
                            <Image source={this.props.transactionProgress < 0.75 ? images.gif.validatingPayment.img : images.gif.paymentSuccessful.img}
                                style={styles.gifStatus} />
                        </View>
                        <View style={styles.progressContainer}>
                            <ProgressBar height={8}
                                progress={this.props.transactionProgress}
                                unfilledColor='rgba(0, 254, 223, 0.2)'
                                color={'#00FEDF'}
                                borderWidth={0} />
                            <Text style={styles.statusText}>
                                {this.props.transactionText}
                            </Text>
                        </View>
                    </LinearGradient>
                </SafeAreaView>
            </Modal>
        );
    }
}

export default FinishingBuyTransactionModal;