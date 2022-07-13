import React, { Component } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import { styles, gradients } from './style';
import images from '../../../assets/images';
import { translate } from "../../utilities/i18";

class ConfirmSelectionModal extends Component {

    state = {
        typeOfVisual: 'GIF',
    }

    renderContent = () => (
        <View style={styles.bottomSheetContainer}>
            <LinearGradient
                colors={gradients.gradient1}
                style={[styles.bottomSheetLinearGradient, styles.bottomSheetLinearGradientWithButtons]}
                angle={100}
                useAngle
            >
                <View style={styles.bottomSheetMainContainer}>
                    <Text
                        style={styles.bottomSheetSelectionQoinsText}
                    >
                        {this.props.qoinsCost}
                    </Text>
                    <images.svg.qoin style={styles.bottomSheetQoin} />
                </View>
                <View style={styles.bottomSheetButtonsContainer}>
                    <TouchableOpacity
                        onPress={this.props.yesButton}
                        style={[styles.bottomSheetButton, styles.bottomSheetButtonBackground]}
                    >
                        <Text style={styles.bottomSheetButtonText}>
                            {`${translate('interactions.visualConfirmation.use')} ${this.state.typeOfVisual}`}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.bottomSheetButton}>
                        <TouchableOpacity
                            onPress={this.props.noButton}
                            style={styles.bottomSheetNoButton}
                        >
                            <Text style={[styles.bottomSheetButtonText, styles.bottomSheetNoButtonText]}>
                                {`${translate('interactions.visualConfirmation.chooseAnother')} ${this.state.typeOfVisual}`}
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
                snapPoints={[heightPercentageToPx(30.04)]}
                callbackNode={this.fall}
                renderContent={this.renderContent} />
        );
    }
}

export default ConfirmSelectionModal;