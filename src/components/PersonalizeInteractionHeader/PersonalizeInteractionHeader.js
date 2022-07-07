import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import { getScreenSizeMultiplier, widthPercentageToPx } from '../../utilities/iosAndroidDim'

class PersonalizeInteractionHeader extends Component {
    render() {
        return (
            <SafeAreaView style={[styles.container, { paddingHorizontal: 16 * getScreenSizeMultiplier() }]}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 32,
                    alignItems: 'center',
                    height: 40,
                }}>
                    {!this.props.navigation.getParam('hideBackButton', false) && <TouchableOpacity
                        style={{
                            backgroundColor: '#141539',
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 4,
                            marginRight: 16,
                        }}
                        onPress={() => this.props.navigation.pop()}
                    >
                        <images.svg.leftArrowThiccIcon />
                    </TouchableOpacity>}
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image
                            source={{ uri: this.props.navigation.getParam('photoUrl') }}
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                            }}
                        />
                        <Text style={{
                                color: '#fff',
                                fontSize: 18,
                                fontWeight: '500',
                                letterSpacing: 0.5,
                                lineHeight: 20,
                                marginLeft: 8,
                                maxWidth: widthPercentageToPx(30),
                            }}
                            numberOfLines={1} >
                            {this.props.navigation.getParam('displayName', '')}
                        </Text>
                        {this.props.navigation.getParam('isStreaming', false) && <View style={{
                            backgroundColor: '#FF006B',
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            marginLeft: 6,
                        }} />}
                    </View>
                </View>
            </SafeAreaView>
        )
    }

}

export default PersonalizeInteractionHeader;