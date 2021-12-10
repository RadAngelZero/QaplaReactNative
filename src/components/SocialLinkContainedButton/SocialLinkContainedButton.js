import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';

import QaplaText from '../QaplaText/QaplaText';
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
                    <QaplaText style={styles.text}>
                        {this.props.children}
                    </QaplaText>
                </View>
            </TouchableOpacity>
        );
    }
}

export default SocialLinkContainedButton;