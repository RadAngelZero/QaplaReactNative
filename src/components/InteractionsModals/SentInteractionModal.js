import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToPx, heightPercentageToPx, getScreenSizeMultiplier } from '../../utilities/iosAndroidDim';
import images from "../../../assets/images";

class SentInteractionModal extends Component {

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
                <Image source={images.png.heartHands.img}
                    style={{
                        position: 'absolute',
                        width: 187 * getScreenSizeMultiplier(),
                        height: 187 * getScreenSizeMultiplier(),
                        bottom: 177 * getScreenSizeMultiplier(),
                        alignSelf: 'center',
                        zIndex: 10,
                    }}
                />
                <Text style={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: '500',
                    lineHeight: 28,
                    letterSpacing: 1,
                    textAlign: 'center',
                    // maxWidth: 179 * getScreenSizeMultiplier(),
                    marginTop: 74 * getScreenSizeMultiplier(),
                }}>
                    {'¡Hemos enviado tus\n'}
                    <Text style={{
                        fontWeight: '600',
                    }}>
                        {`${this.props.qoins} Qoins a ${this.props.streamerName}! ⚡️`}
                    </Text>
                </Text>
                <View style={{
                    maxWidth: 260 * getScreenSizeMultiplier(),
                    marginBottom: 43 * getScreenSizeMultiplier(),
                }}>

                    <TouchableOpacity
                        onPress={this.props.onPress}
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
                snapPoints={[271 * getScreenSizeMultiplier()]}
                borderRadius={20}
                callbackNode={this.fall}
                renderContent={this.renderContent} />
        );
    }
}

export default SentInteractionModal;