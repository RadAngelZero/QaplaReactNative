import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';

class PersonalizeInteractionHeader extends Component {
    render() {
        const isStreaming = this.props.navigation.getParam('isStreaming', false);

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.mainContainer}>
                    {(this.props.currentScreen !== 'InteractionsSent' && this.props.currentScreen !== 'PrepaidInteractionsSent') &&
                        <>
                            <TouchableOpacity
                                style={styles.backButtonContainer}
                                onPress={() => this.props.navigation.pop()}>
                                <images.svg.backIcon style={styles.backButtonShadow} />
                            </TouchableOpacity>
                            <View style={styles.streamerContainer}>
                                <Image
                                    source={{ uri: this.props.navigation.getParam('photoUrl') }}
                                    style={styles.streamerImage}
                                />
                                <Text style={styles.streamerName}>
                                    {this.props.navigation.getParam('displayName', '')}
                                </Text>
                                {isStreaming === 'true' &&
                                    <View style={styles.streamerLive} />
                                }
                            </View>
                        </>
                    }
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentScreen: state.screensReducer.currentScreenId
    };
}

export default connect(mapStateToProps)(PersonalizeInteractionHeader);