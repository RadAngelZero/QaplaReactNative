import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import { styles, gradients } from './style';
import images from '../../../assets/images';
import { translate } from '../../utilities/i18';

class SentInteractionModal extends Component {
    renderContent = () => (
        <View style={styles.bottomSheetContainer}>
            <Image source={images.png.heartHands.img}
                style={styles.heartHands}
            />
            <LinearGradient
                colors={gradients.gradient1}
                style={[styles.bottomSheetLinearGradient, styles.bottomSheetLinearGradientWithButtons]}
                angle={100}
                useAngle
            >
                <Text style={[styles.bottomSheetWhiteText, styles.sentText]}>
                    {`${translate('interactions.final.modal.weveSentYourQoinsP1')}`}
                    <Text style={styles.sentAccentText}>
                        {`${translate('interactions.final.modal.weveSentYourQoinsP2', { qoins: this.props.qoins, streamerName: this.props.streamerName })}`}
                    </Text>
                </Text>
                <View style={[styles.bottomSheetButtonsContainer, styles.sentMarginButtonBottom]}>

                    <TouchableOpacity
                        onPress={this.props.onPress}
                        style={[styles.bottomSheetButton, styles.bottomSheetButtonBackground]}
                    >
                        <Text style={styles.bottomSheetButtonText}>
                            {this.props.isLive ?
                                <>
                                    {`${translate('TimelineStreams.goToTwitch')}`}

                                </>
                                :
                                <>
                                    {`${translate('interactions.final.modal.backToStart')}`}
                                </>
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    )

    render() {
        return (
            <BottomSheet
                overflow="visible"
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

export default SentInteractionModal;