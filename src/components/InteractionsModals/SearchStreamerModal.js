import React, { Component } from "react";
import { View, Modal, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { SHEET_MAX_HEIGHT, SHEET_MIN_HEIGHT } from "../../utilities/Constants";
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim';

import images from "../../../assets/images";

class SearchStreamerModal extends Component {


    renderContent = () => (
        <TouchableWithoutFeedback
            onPress={this.props.onPress}
        >
            <View style={{
                height: '100%',
                width: '100%',
            }}>
                <LinearGradient
                    colors={['#A716EE', '#2C07FA']}
                    style={{
                        height: '100%',
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                    }}
                    angle={100}
                    useAngle
                >
                    <View style={{
                        display: 'flex',
                        marginTop: 24,
                        marginLeft: widthPercentageToPx(9)
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 22,
                            fontWeight: '700',
                            lineHeight: 28,
                            letterSpacing: 1,
                        }}>
                            {'Envia un' + " "}
                            <Text style={{ color: '#00FFDD' }}>
                                gif
                            </Text>
                        </Text>
                        <View style={{ height: 4 }} />
                        <Text style={{
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: '500',
                            lineHeight: 28,
                            letterSpacing: 1,
                        }}>
                            en vivo a tu streamer
                        </Text>
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#141539',
                        width: widthPercentageToPx(92),
                        height: heightPercentageToPx(6.2),
                        alignSelf: 'center',
                        borderRadius: 50,
                        marginTop: 14,
                        paddingHorizontal: 18,
                        alignItems: 'center',
                    }}>
                        <View style={{opacity: 0.4}}>
                            <images.svg.searchStreamerIcon />
                        </View>
                        <View style={{ width: 12 }} />
                        <Text
                            style={{
                                color: '#fff6',
                            }}
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