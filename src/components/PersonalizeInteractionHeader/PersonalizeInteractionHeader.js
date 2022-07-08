import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import images from '../../../assets/images';
import { widthPercentageToPx, heightPercentageToPx, getScreenSizeMultiplier } from '../../utilities/iosAndroidDim'

class PersonalizeInteractionHeader extends Component {

    componentDidMount() {
        console.log('mounted');
        console.log(this.props.navigation.state.routes[this.props.navigation.state.index].routeName);
    }

    render() {
        return (
            <>
                <View style={[styles.container, { paddingHorizontal: 16 * getScreenSizeMultiplier(), opacity: this.props.navigation.state.routes[this.props.navigation.state.index].routeName !== 'InteractionsSent' ? 1 : 0}]}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 32 * getScreenSizeMultiplier(),
                        alignItems: 'center',
                        height: 40,
                    }}>
                        {this.props.navigation.state.routes[this.props.navigation.state.index].routeName !== 'InteractionsSent' && <>
                            {this.props.navigation.state.routes[this.props.navigation.state.index].routeName !== 'InteractionsCheckout' && <TouchableOpacity
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
                                    source={{ uri: this.props.navigation.state.routes[0].params.streamerImg }}
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
                                }}>{this.props.navigation.state.routes[0].params.streamerName}</Text>
                                {this.props.navigation.state.routes[0].params.isLive && <View style={{
                                    backgroundColor: '#FF006B',
                                    width: 12,
                                    height: 12,
                                    borderRadius: 6,
                                    marginLeft: 6,
                                }} />}
                            </View>
                        </>}
                    </View>
                </View>
            </>
        );
    }

}

export default PersonalizeInteractionHeader;