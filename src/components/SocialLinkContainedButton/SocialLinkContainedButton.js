import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './style';

class SocialLinkContainedButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[styles.container, this.props.style]}>
                    {this.props.Icon &&
                        <View style={styles.socialIcon}>
                            <this.props.Icon />
                        </View>
                    }
                    <Text style={styles.text}>
                        {this.props.children}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default SocialLinkContainedButton;