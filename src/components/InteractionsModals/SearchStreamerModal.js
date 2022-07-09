import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import { styles, gradients } from './style';
import images from '../../../assets/images';

class SearchStreamerModal extends Component {


    renderContent = () => (
        <TouchableWithoutFeedback
            onPress={this.props.onPress}
        >
            <View style={styles.bottomSheetContainer}>
                <LinearGradient
                    colors={gradients.gradient1}
                    style={styles.bottomSheetLinearGradient}
                    angle={100}
                    useAngle
                >
                    <View style={styles.bottomSheetSearchStreamerMainContainer}>
                        <Text style={[styles.bottomSheetWhiteText, styles.bottomSheetSearchStreamerHeader]}>
                            {'Envía un' + " "}
                            <Text style={styles.bottomSheetAccentText}>
                                GIF
                            </Text>
                        </Text>
                        <View style={{ height: 4 }} />
                        <Text style={[styles.bottomSheetWhiteText, styles.bottomSheetSearchStreamerSubtitle]}>
                            en vivo a tu streamer
                        </Text>
                    </View>
                    <View style={styles.bottomSheetSearchBar}>
                        <View style={{ opacity: 0.4 }}>
                            <images.svg.searchStreamerIcon style={styles.bottomSheetSearchStreamerIcon} />
                        </View>
                        <Text
                            style={styles.bottomSheetSearchBarText}
                        >
                            Busca un streamer por su nombre
                        </Text>
                    </View>
                </LinearGradient>
            </View>
        </TouchableWithoutFeedback>
    )

    render() {
        return (
            <BottomSheet
                onOpenEnd={this.toggleOpen}
                onCloseEnd={this.toggleOpen}
                ref={(ref) => this.sheetRef = ref}
                snapPoints={[heightPercentageToPx(22), heightPercentageToPx(86)]}
                borderRadius={20}
                callbackNode={this.fall}
                renderContent={this.renderContent} />
        )
    }
}

export default SearchStreamerModal;