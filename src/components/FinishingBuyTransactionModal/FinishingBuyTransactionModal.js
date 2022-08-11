import React, { Component } from 'react';
import { Image, Modal, SafeAreaView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view'

import images from '../../../assets/images';
import { heightPercentageToPx, widthPercentageToPx } from '../../utilities/iosAndroidDim';
import ProgressBar from '../UserProfileRewards/Bar';

import styles from './style';

class FinishingBuyTransactionModal extends Component {
    render() {
        const isValidating = this.props.transactionProgress <= 0.75;
        return (
            <Modal animationType='fade'
                transparent={true}
                visible={this.props.open}
                onRequestClose={() => {}}>
                <SafeAreaView style={styles.container}>
                    <View style={[styles.gifStatusContainer, {
                        bottom: isValidating ? heightPercentageToPx(12) : heightPercentageToPx(7),
                        left: isValidating ? undefined : 0,
                    }]}>
                        <Image style={[styles.gifStatus, {
                            maxWidth: isValidating ? '100%' : widthPercentageToPx(62)
                        }]}
                            source={isValidating ? images.gif.validatingPayment.img : images.gif.paymentSuccessful.img} />
                    </View>
                    <LinearGradient useAngle
                        angle={136.25}
                        colors={['#A716EE', '#2C07FA']}
                        style={styles.gradientContainer}>
                        <View style={styles.progressContainer}>
                            <ProgressBar height={8}
                                progress={this.props.transactionProgress}
                                unfilledColor='rgba(0, 254, 223, 0.2)'
                                color={'#00FEDF'}
                                borderWidth={0} />
                            {this.props.transactionText !== '' ?
                                <MaskedView maskElement={<Text style={styles.statusText}>{this.props.transactionText}</Text>} style={{ alignContent: 'center' }}>
                                    <LinearGradient
                                        colors={['#FFD3FB', '#F5FFCB', '#9FFFDD']}
                                        useAngle
                                        angle={248.41}>
                                        <Text style={[styles.statusText, { opacity: 0 }]}>
                                            {this.props.transactionText}
                                        </Text>
                                    </LinearGradient>
                                </MaskedView>
                                :
                                <Text style={[styles.statusText, { opacity: 0 }]}>
                                    {this.props.transactionText}
                                </Text>
                            }
                        </View>
                    </LinearGradient>
                </SafeAreaView>
            </Modal>
        );
    }
}

export default FinishingBuyTransactionModal;