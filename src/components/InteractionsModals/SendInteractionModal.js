import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import { styles, gradients } from './style';
import images from '../../../assets/images';
import { translate } from '../../utilities/i18';

class SendInteractionModal extends Component {

    renderContent = () => (
        <View style={styles.bottomSheetContainer}>
            <LinearGradient
                colors={gradients.gradient1}
                style={[styles.bottomSheetLinearGradient, styles.bottomSheetLinearGradientWithButtons]}
                angle={100}
                useAngle
            >
                <View style={styles.bottomSheetMainContainer}>
                    <TouchableOpacity
                        onPress={this.props.subTip}
                        disabled={this.props.extraTip <= this.props.minimum}
                        style={[styles.checkoutMinTouchable, {
                            opacity: this.props.extraTip <= this.props.minimum ? 0.4 : 1,
                        }]}
                    >
                        <images.svg.minusBubble style={styles.checkoutAddRemIcon} />
                    </TouchableOpacity>
                    <Text
                        style={styles.checkoutTotalQoinsText}
                    >
                        {this.props.baseCost + this.props.extraTip}
                    </Text>
                    <images.svg.qoin style={styles.bottomSheetBigQoin} />
                    <TouchableOpacity
                        onPress={this.props.addTip}
                        style={styles.checkoutPluTouchable}
                    >
                        <images.svg.plusBubble style={styles.checkoutAddRemIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomSheetButtonsContainer}>
                    <TouchableOpacity
                        onPress={this.props.yesButtonAction}
                        style={[styles.bottomSheetButton, styles.bottomSheetButtonBackground]}
                    >
                        <Text style={styles.bottomSheetButtonText}>
                            {this.props.onlyQoins ?
                                <>
                                    {`${translate('supportStreamerModal.sendCheers')}`}
                                </>
                                :
                                <>
                                    {`${translate('interactions.checkout.modal.sendInteraction')}`}
                                </>}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.bottomSheetButton}>
                        <TouchableOpacity
                            onPress={this.props.cancel}
                            style={styles.bottomSheetNoButton}
                        >
                            <Text style={[styles.bottomSheetButtonText, styles.bottomSheetNoButtonText]}>
                                {`${translate('TimelineStreams.cancel')}`}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </LinearGradient>
        </View>
    )

    render() {
        return (
            <BottomSheet
                onOpenEnd={this.toggleOpen}
                onCloseEnd={this.toggleOpen}
                ref={(ref) => this.sheetRef = ref}
                snapPoints={[heightPercentageToPx(33.37)]}
                borderRadius={20}
                callbackNode={this.fall}
                renderContent={this.renderContent} />
        );
    }
}

export default SendInteractionModal;