import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import { styles, gradients } from './style';
import images from '../../../assets/images';

class SentInteractionModal extends Component {

    renderContent = () => (
        <View style={styles.bottomSheetContainer}>
            <LinearGradient
                colors={gradients.gradient1}
                style={[styles.bottomSheetLinearGradient, styles.bottomSheetLinearGradientWithButtons]}
                angle={100}
                useAngle
            >
                <Image source={images.png.heartHands.img}
                    style={styles.heartHands}
                />
                <Text style={[styles.bottomSheetWhiteText, styles.sentText]}>
                    {'¡Hemos enviado tus\n'}
                    <Text style={styles.sentAccentText}>
                        {`${this.props.qoins} Qoins a ${this.props.streamerName}! ⚡️`}
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
                                    {`Ir a Twitch`}

                                </>
                                :
                                <>
                                    {`Volver al inicio`}
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