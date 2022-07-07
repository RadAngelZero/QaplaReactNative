import React, { Component } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToPx, heightPercentageToPx, getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
import MaskedView from '@react-native-community/masked-view';
import images from "../../../assets/images";

class SendInteractionModal extends Component {

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
                    <TouchableOpacity
                        onPress={this.props.subTip}
                        disabled={this.props.extraTip <= 0}
                        style={{
                            opacity: this.props.extraTip <= 0 ? 0.4 : 1,
                            marginRight: 10,
                        }}
                    >
                        <images.svg.minusBubble style={{
                            minWidth: 24,
                            minHeight: 24,
                            maxWidth: 24,
                            maxHeight: 24,
                        }} />
                    </TouchableOpacity>
                        <Text
                            children={this.props.baseCost + this.props.extraTip}
                            style={{
                                color: '#00FFDD',
                                fontSize: 48,
                                fontWeight: '700',
                                lineHeight: 57,
                                letterSpacing: 1,
                            }}
                        />
                    <images.svg.qoin style={{
                        minWidth: 30 * getScreenSizeMultiplier(),
                        minHeight: 30 * getScreenSizeMultiplier(),
                        maxWidth: 30 * getScreenSizeMultiplier(),
                        maxHeight: 30 * getScreenSizeMultiplier(),
                        marginTop: 4 * getScreenSizeMultiplier(),
                        marginLeft: 4 * getScreenSizeMultiplier(),
                    }} />
                    <TouchableOpacity
                        onPress={this.props.addTip}
                        style={{
                            marginLeft: 10,
                        }}
                    >
                        <images.svg.plusBubble style={{
                            minWidth: 24,
                            minHeight: 24,
                            maxWidth: 24,
                            maxHeight: 24,
                        }} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    maxWidth: 260 * getScreenSizeMultiplier(),
                }}>

                    <TouchableOpacity
                        onPress={this.props.sendInteraction}
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
                            fontSize: 17,
                            fontWeight: '600',
                            lineHeight: 22 * getScreenSizeMultiplier(),
                            letterSpacing: 0.492000013589859,

                        }}>
                            Enviar Interacción
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.cancel}
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
                            Cancelar
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
                snapPoints={[271 * getScreenSizeMultiplier()]}
                borderRadius={20}
                callbackNode={this.fall}
                renderContent={this.renderContent} />
        );
    }
}

export default SendInteractionModal;