import React, { Component } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToPx, heightPercentageToPx, getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
import images from "../../../assets/images";

class ConfirmSelectionModal extends Component {

    renderContent = () => (
        <View style={{
            width: '100%',
            height: '100%',
        }}>
            <LinearGradient
                colors={['#A716EE', '#2C07FA']}
                style={{
                    flex: 1,
                    height: '100%',
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
                angle={100}
                useAngle
            >
                <View style={{
                    marginTop: 20 * getScreenSizeMultiplier(),
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text
                        style={{
                            flex: 0,
                            color: '#00FFDD',
                            fontSize: 40 * getScreenSizeMultiplier(),
                            fontWeight: '700',
                            letterSpacing: 1 * getScreenSizeMultiplier(),
                        }}
                    >
                        {this.props.cost}
                    </Text>
                    <images.svg.qoin style={{
                        minWidth: 30 * getScreenSizeMultiplier(),
                        minHeight: 30 * getScreenSizeMultiplier(),
                        maxWidth: 30 * getScreenSizeMultiplier(),
                        maxHeight: 30 * getScreenSizeMultiplier(),
                        marginTop: 4 * getScreenSizeMultiplier(),
                        marginLeft: 4 * getScreenSizeMultiplier(),
                    }} />
                </View>
                <View style={{
                    maxWidth: 260 * getScreenSizeMultiplier(),
                }}>

                    <TouchableOpacity
                        onPress={this.props.onConfirmSelection}
                        style={{
                            backgroundColor: '#00FFDD',
                            width: 260 * getScreenSizeMultiplier(),
                            height: 74 * getScreenSizeMultiplier(),
                            borderRadius: 37 * getScreenSizeMultiplier(),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{
                            color: '#0D1021',
                            fontSize: 17 * getScreenSizeMultiplier(),
                            fontWeight: '600',
                            lineHeight: 22 * getScreenSizeMultiplier(),
                            letterSpacing: 0.492000013589859 * getScreenSizeMultiplier(),

                        }}>
                            Usar GIF
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.props.onCancel}
                        style={{
                            backgroundColor: '#0000',
                            width: 260 * getScreenSizeMultiplier(),
                            height: 74 * getScreenSizeMultiplier(),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{
                            color: '#FFFFFF99',
                            fontSize: 17 * getScreenSizeMultiplier(),
                            fontWeight: '600',
                            lineHeight: 22 * getScreenSizeMultiplier(),
                            letterSpacing: 1 * getScreenSizeMultiplier(),
                        }}>
                            Elegir otro GIF
                        </Text>
                    </TouchableOpacity>
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
                snapPoints={[244 * getScreenSizeMultiplier()]}
                borderRadius={20}
                callbackNode={this.fall}
                renderContent={this.renderContent} />
        );
    }
}

export default ConfirmSelectionModal;