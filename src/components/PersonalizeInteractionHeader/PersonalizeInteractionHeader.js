import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import images from '../../../assets/images';

class PersonalizeInteractionHeader extends Component {

    componentDidMount() {
        console.log('mounted');
        console.log(this.props.navigation.state.routes[this.props.navigation.state.index].routeName);
    }

    render() {
        return (
            <>
                <View style={[styles.container, {
                    opacity: this.props.navigation.state.routes[this.props.navigation.state.index].routeName !== 'InteractionsSent' ? 1 : 0
                }]}>
                    <View style={styles.mainContainer}>
                        {this.props.navigation.state.routes[this.props.navigation.state.index].routeName !== 'InteractionsSent' && <>
                            {this.props.navigation.state.routes[this.props.navigation.state.index].routeName !== 'InteractionsCheckout' && <TouchableOpacity
                                style={styles.backButtonContainer}
                                onPress={() => this.props.navigation.pop()}
                            >
                                <images.svg.leftArrowThiccIcon />
                            </TouchableOpacity>}
                            <View style={styles.streamerContainer}>
                                <Image
                                    source={{ uri: this.props.navigation.state.routes[0].params.streamerImg }}
                                    style={styles.streamerImage}
                                />
                                <Text style={styles.streamerName}>
                                    {this.props.navigation.state.routes[0].params.streamerName}
                                </Text>
                                {this.props.navigation.state.routes[0].params.isLive && <View style={styles.streamerLive} />}
                            </View>
                        </>}
                    </View>
                </View>
            </>
        );
    }

}

export default PersonalizeInteractionHeader;