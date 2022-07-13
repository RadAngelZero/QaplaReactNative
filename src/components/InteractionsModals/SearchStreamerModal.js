import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import { styles, gradients } from './style';
import images from '../../../assets/images';
import { translate } from '../../utilities/i18';

class SearchStreamerModal extends Component {

    state = {
        textRotation: 'GIF',
        textRotationState: 0,
    }

    texts = ['GIF', 'Meme', 'Sticker', translate('interactions.feed.modal.message')]

    componentDidMount() {
        this.textRotator = setInterval(() => {
            if (this.state.textRotationState >= this.texts.length - 1) {
                this.setState({ textRotation: this.texts[0], textRotationState: 0 });

            } else {
                this.setState({ textRotation: this.texts[this.state.textRotationState + 1], textRotationState: this.state.textRotationState + 1 });
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.textRotator);
    }

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
                            {`${translate('interactions.feed.modal.sendA')} `}
                            <Text style={styles.bottomSheetAccentText}>
                                {this.state.textRotation}
                            </Text>
                        </Text>
                        <View style={{ height: 4 }} />
                        <Text style={[styles.bottomSheetWhiteText, styles.bottomSheetSearchStreamerSubtitle]}>
                            {`${translate('interactions.feed.modal.liveToStreamer')}`}
                        </Text>
                    </View>
                    <View style={styles.bottomSheetSearchBar}>
                        <View style={{ opacity: 0.4 }}>
                            <images.svg.searchStreamerIcon style={styles.bottomSheetSearchStreamerIcon} />
                        </View>
                        <Text
                            style={styles.bottomSheetSearchBarText}
                        >
                            {`${translate('interactions.feed.modal.searchByName')}`}
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