import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './style';
import images from '../../../assets/images';
import { widthPercentageToPx, heightPercentageToPx, getScreenSizeMultiplier } from '../../utilities/iosAndroidDim'

class PersonalizeInteractionHeader extends Component {

    state = {
        hideBackButton: false,
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        if (this.props.navigation.state.routes[this.props.navigation.state.routes.length - 1].params) {
            if (this.props.navigation.state.routes[this.props.navigation.state.routes.length - 1].params.hideBackButton && !this.state.hideBackButton) {
                this.setState({ hideBackButton: this.props.navigation.state.routes[this.props.navigation.state.routes.length - 1].params.hideBackButton });
            }
        } else if (this.state.hideBackButton) {
            this.setState({ hideBackButton: false });
        }
    }

    render() {
        return (
            <SafeAreaView style={[styles.container, { paddingHorizontal: 16 * getScreenSizeMultiplier() }]}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 32 * getScreenSizeMultiplier(),
                    alignItems: 'center',
                    height: 40,
                }}>
                    {!this.state.hideBackButton && <TouchableOpacity
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
                            source={{ uri: this.props.navigation.state.routes[0].params.photoUrl }}
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
                        }}>{this.props.navigation.state.routes[0].params.displayName}</Text>
                        {this.props.navigation.state.routes[0].params.isStreaming && <View style={{
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